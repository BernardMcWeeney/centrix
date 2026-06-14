import { env } from 'cloudflare:workers';

export const prerender = false;

export async function POST({ request }) {
  try {
    const formData = await request.formData();

    const firstName = (formData.get('firstName') || '').toString().trim();
    const lastName = (formData.get('lastName') || '').toString().trim();
    const name = [firstName, lastName].filter(Boolean).join(' ');
    const email = (formData.get('email') || '').toString().trim();
    const company = (formData.get('company') || '').toString().trim() || 'Not provided';
    const service = (formData.get('service') || '').toString().trim() || 'Not specified';
    const message = (formData.get('message') || '').toString().trim();
    const turnstileToken = formData.get('cf-turnstile-response');

    if (!name || !email || !message) {
      return jsonResponse({ success: false, message: 'Please fill in your name, email, and message.' }, 400);
    }

    if (!turnstileToken) {
      return jsonResponse({ success: false, message: 'Please complete the security check.' }, 400);
    }

    const turnstileVerification = await verifyTurnstileToken(
      turnstileToken,
      request.headers.get('CF-Connecting-IP'),
      env.TURNSTILE_SECRET_KEY
    );

    if (!turnstileVerification.success) {
      return jsonResponse({ success: false, message: 'Security check failed. Please refresh and try again.' }, 400);
    }

    const region = env.AWS_REGION;
    const accessKeyId = env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
    const fromAddress = env.FROM_EMAIL_ADDRESS;
    const toAddress = env.TO_EMAIL_ADDRESS;

    if (!region || !accessKeyId || !secretAccessKey || !fromAddress || !toAddress) {
      console.error('Missing env vars:', {
        AWS_REGION: !!region,
        AWS_ACCESS_KEY_ID: !!accessKeyId,
        AWS_SECRET_ACCESS_KEY: !!secretAccessKey,
        FROM_EMAIL_ADDRESS: !!fromAddress,
        TO_EMAIL_ADDRESS: !!toAddress,
      });
      return jsonResponse({ success: false, message: 'Server configuration error. Please email hello@centrix.ie directly.' }, 500);
    }

    const textBody = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage: ${message}`;
    const htmlBody = `<h2>New Centrix Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company}</p>
<p><strong>Service:</strong> ${service}</p>
<p><strong>Message:</strong> ${message}</p>`;

    const params = new URLSearchParams();
    params.append('Action', 'SendEmail');
    params.append('Source', fromAddress);
    params.append('Destination.ToAddresses.member.1', toAddress);
    params.append('Message.Subject.Data', `Centrix Contact: ${service} — ${name}`);
    params.append('Message.Subject.Charset', 'UTF-8');
    params.append('Message.Body.Text.Data', textBody);
    params.append('Message.Body.Text.Charset', 'UTF-8');
    params.append('Message.Body.Html.Data', htmlBody);
    params.append('Message.Body.Html.Charset', 'UTF-8');
    params.append('ReplyToAddresses.member.1', email);
    params.append('Version', '2010-12-01');

    const endpoint = `https://email.${region}.amazonaws.com/`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const dateStamp = amzDate.slice(0, 8);

    const body = params.toString();
    const bodyHash = await sha256Hex(body);

    const canonicalHeaders = `content-type:application/x-www-form-urlencoded\nhost:email.${region}.amazonaws.com\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-date';
    const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${bodyHash}`;

    const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${await sha256Hex(canonicalRequest)}`;

    const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, 'ses');
    const signature = await hmacHex(signingKey, stringToSign);

    const authHeader = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const sesResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Amz-Date': amzDate,
        'Authorization': authHeader,
      },
      body,
    });

    if (!sesResponse.ok) {
      const errorText = await sesResponse.text();
      console.error('SES error:', sesResponse.status, errorText);
      return jsonResponse({ success: false, message: 'Something went wrong sending your message. Please email hello@centrix.ie directly.' }, 500);
    }

    return jsonResponse({ success: true, message: 'Thanks. Your message has been sent.' });
  } catch (error) {
    console.error('Contact form error:', error?.name, error?.message, error?.stack);
    return jsonResponse({ success: false, message: 'Something went wrong. Please try again or email hello@centrix.ie.' }, 500);
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function verifyTurnstileToken(token, ip, secret) {
  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    return await result.json();
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return { success: false, error: 'Verification failed' };
  }
}

// AWS Signature V4 helpers using Web Crypto API (Workers-compatible)
async function sha256Hex(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hash);
}

async function hmac(key, message) {
  const encoder = new TextEncoder();
  const keyData = typeof key === 'string' ? encoder.encode(key) : key;
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
}

async function hmacHex(key, message) {
  const result = await hmac(key, message);
  return arrayBufferToHex(result);
}

async function getSignatureKey(secretKey, dateStamp, region, service) {
  const kDate = await hmac('AWS4' + secretKey, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return await hmac(kService, 'aws4_request');
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
