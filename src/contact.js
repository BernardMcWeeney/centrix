import { EmailMessage } from 'cloudflare:email';
import {
  checkedAwsSesConfigNames,
  checkedTurnstileSecretKeyNames,
  getAwsSesConfig,
  getEmailAddresses,
  getTurnstileSecretKey,
} from './server/contact-env.js';

export async function onRequestPost(context) {
  try {
    const env = context.env || {};
    const formData = await context.request.formData();

    const firstName = stringValue(formData.get('firstName'));
    const lastName = stringValue(formData.get('lastName'));
    const fallbackName = stringValue(formData.get('name'));
    const name = [firstName, lastName].filter(Boolean).join(' ') || fallbackName;
    const email = stringValue(formData.get('email'));
    const company = stringValue(formData.get('company')) || 'Not provided';
    const service = stringValue(formData.get('service')) || 'Not specified';
    const message = stringValue(formData.get('message'));
    const turnstileToken = stringValue(formData.get('cf-turnstile-response'));

    if (!name || !email || !message) {
      return jsonResponse({ success: false, message: 'Missing required fields.' }, 400);
    }

    if (!isEmailAddress(email)) {
      return jsonResponse({ success: false, message: 'Please enter a valid email address.' }, 400);
    }

    const turnstileSecretKey = getTurnstileSecretKey(env);

    if (!turnstileSecretKey) {
      console.error('Turnstile secret key is not configured. Checked env vars:', checkedTurnstileSecretKeyNames().join(', '));
      return jsonResponse({ success: false, message: 'Contact form security is not configured. Please email hello@centrix.ie.' }, 500);
    }

    if (!turnstileToken) {
      return jsonResponse({ success: false, message: 'Please complete the security check before sending.' }, 400);
    }

    const turnstileVerification = await verifyTurnstileToken(
      turnstileToken,
      context.request.headers.get('CF-Connecting-IP'),
      turnstileSecretKey
    );

    if (!turnstileVerification.success) {
      console.error('Turnstile verification failed:', {
        errorCodes: turnstileVerification['error-codes'] || [],
        hostname: turnstileVerification.hostname,
        action: turnstileVerification.action,
      });
      return jsonResponse({ success: false, message: 'Security check failed. Please refresh the page and try again.' }, 400);
    }

    const { fromAddress, toAddress } = getEmailAddresses(env);

    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Service: ${service}`,
      '',
      message,
    ].join('\n');

    const htmlBody = `<h2>New Centrix Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Company:</strong> ${escapeHtml(company)}</p>
<p><strong>Service:</strong> ${escapeHtml(service)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

    const subject = `Centrix Contact: ${service} - ${name}`;

    if (env.CONTACT_EMAIL?.send || env.EMAIL?.send) {
      const emailBinding = env.CONTACT_EMAIL?.send ? env.CONTACT_EMAIL : env.EMAIL;
      await sendWithCloudflareEmail(emailBinding, {
        fromAddress,
        toAddress,
        replyToAddress: email,
        replyToName: name,
        subject,
        textBody,
        htmlBody,
      });

      return jsonResponse({ success: true, message: 'Thanks. Your message has been sent.' });
    }

    const sesConfig = getAwsSesConfig(env);

    if (sesConfig.missing.length > 0) {
      console.error('Contact form email is not configured:', {
        missing: sesConfig.missing,
        checked: checkedAwsSesConfigNames(),
        cloudflareEmailBinding: false,
      });
      return jsonResponse({
        success: false,
        message: `Contact form email is not configured. Missing ${sesConfig.missing.join(', ')}.`,
      }, 500);
    }

    const params = new URLSearchParams();
    params.append('Action', 'SendEmail');
    params.append('Source', fromAddress);
    params.append('Destination.ToAddresses.member.1', toAddress);
    params.append('Message.Subject.Data', subject);
    params.append('Message.Subject.Charset', 'UTF-8');
    params.append('Message.Body.Text.Data', textBody);
    params.append('Message.Body.Text.Charset', 'UTF-8');
    params.append('Message.Body.Html.Data', htmlBody);
    params.append('Message.Body.Html.Charset', 'UTF-8');
    params.append('ReplyToAddresses.member.1', email);
    params.append('Version', '2010-12-01');

    const endpoint = `https://email.${sesConfig.region}.amazonaws.com/`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const dateStamp = amzDate.slice(0, 8);

    const body = params.toString();
    const bodyHash = await sha256Hex(body);

    const canonicalHeaders = `content-type:application/x-www-form-urlencoded\nhost:email.${sesConfig.region}.amazonaws.com\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-date';
    const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${bodyHash}`;

    const credentialScope = `${dateStamp}/${sesConfig.region}/ses/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${await sha256Hex(canonicalRequest)}`;

    const signingKey = await getSignatureKey(sesConfig.secretAccessKey, dateStamp, sesConfig.region, 'ses');
    const signature = await hmacHex(signingKey, stringToSign);

    const authHeader = `AWS4-HMAC-SHA256 Credential=${sesConfig.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const sesResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Amz-Date': amzDate,
        Authorization: authHeader,
      },
      body,
    });

    if (!sesResponse.ok) {
      const errorText = await sesResponse.text();
      const sesError = parseSesError(errorText);
      console.error('SES error:', {
        status: sesResponse.status,
        code: sesError.code,
        message: sesError.message,
      });
      return jsonResponse({ success: false, message: sesError.userMessage }, 500);
    }

    return jsonResponse({ success: true, message: 'Thanks. Your message has been sent.' });
  } catch (error) {
    console.error('Contact form error:', error?.name, error?.message, error?.stack);
    return jsonResponse({ success: false, message: 'Something went wrong. Please try again or email hello@centrix.ie.' }, 500);
  }
}

async function sendWithCloudflareEmail(emailBinding, options) {
  const rawMessage = buildRawEmail(options);
  const emailMessage = new EmailMessage(options.fromAddress, options.toAddress, rawMessage);

  try {
    await emailBinding.send(emailMessage);
  } catch (error) {
    console.error('Cloudflare email send error:', error?.message || error);
    throw new Error('Email delivery failed.');
  }
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isEmailAddress(value) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
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

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildRawEmail({ fromAddress, toAddress, replyToAddress, replyToName, subject, textBody, htmlBody }) {
  const boundary = `centrix-contact-${crypto.randomUUID()}`;
  const headers = [
    `From: ${formatMailbox('Centrix Contact', fromAddress)}`,
    `To: ${formatMailbox('Centrix', toAddress)}`,
    `Reply-To: ${formatMailbox(replyToName, replyToAddress)}`,
    `Subject: ${encodeMimeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  return [
    ...headers,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    textBody,
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    htmlBody,
    `--${boundary}--`,
    '',
  ].join('\r\n');
}

function formatMailbox(name, address) {
  const cleanAddress = sanitizeHeader(address);
  const cleanName = sanitizeHeader(name)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  return cleanName ? `"${cleanName}" <${cleanAddress}>` : cleanAddress;
}

function sanitizeHeader(value) {
  return stringValue(value).replace(/[\r\n]+/g, ' ').trim();
}

function encodeMimeHeader(value) {
  const clean = sanitizeHeader(value);

  if (/^[\x20-\x7E]*$/.test(clean)) {
    return clean;
  }

  return `=?UTF-8?B?${base64EncodeUtf8(clean)}?=`;
}

function base64EncodeUtf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function parseSesError(errorText) {
  const code = matchXmlTag(errorText, 'Code');
  const message = matchXmlTag(errorText, 'Message');
  const combined = `${code} ${message}`.toLowerCase();

  if (combined.includes('messagerejected') || combined.includes('not verified')) {
    return {
      code,
      message,
      userMessage: 'Email delivery is not fully verified yet. Please email hello@centrix.ie directly.',
    };
  }

  if (combined.includes('signature') || combined.includes('accessdenied') || combined.includes('invalidclienttokenid')) {
    return {
      code,
      message,
      userMessage: 'Email delivery credentials are not configured correctly. Please email hello@centrix.ie directly.',
    };
  }

  return {
    code,
    message,
    userMessage: 'Email delivery failed. Please email hello@centrix.ie directly.',
  };
}

function matchXmlTag(xml, tag) {
  const match = String(xml).match(new RegExp(`<${tag}>([^<]*)</${tag}>`, 'i'));
  return match ? match[1] : '';
}

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
  const kDate = await hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return await hmac(kService, 'aws4_request');
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
