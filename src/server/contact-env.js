const TURNSTILE_SECRET_KEY_NAMES = [
  'TURNSTILE_SECRET_KEY',
  'CF_TURNSTILE_SECRET_KEY',
  'CLOUDFLARE_TURNSTILE_SECRET_KEY',
  'TURNSTILE_SECRET',
];

export function getTurnstileSecretKey(environment = {}) {
  return firstEnvValue(environment, TURNSTILE_SECRET_KEY_NAMES);
}

export function checkedTurnstileSecretKeyNames() {
  return TURNSTILE_SECRET_KEY_NAMES;
}

const DEFAULT_FROM_ADDRESS = 'hello@centrix.ie';
const DEFAULT_TO_ADDRESS = 'hello@centrix.ie';

const FROM_EMAIL_NAMES = [
  'FROM_EMAIL_ADDRESS',
  'CONTACT_FROM_EMAIL',
  'EMAIL_FROM_ADDRESS',
  'SES_FROM_EMAIL',
];

const TO_EMAIL_NAMES = [
  'TO_EMAIL_ADDRESS',
  'CONTACT_TO_EMAIL',
  'EMAIL_TO_ADDRESS',
  'SES_TO_EMAIL',
];

const AWS_REGION_NAMES = [
  'AWS_REGION',
  'AWS_SES_REGION',
  'SES_REGION',
];

const AWS_ACCESS_KEY_ID_NAMES = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SES_ACCESS_KEY_ID',
  'SES_ACCESS_KEY_ID',
];

const AWS_SECRET_ACCESS_KEY_NAMES = [
  'AWS_SECRET_ACCESS_KEY',
  'AWS_SES_SECRET_ACCESS_KEY',
  'SES_SECRET_ACCESS_KEY',
];

export function getEmailAddresses(environment = {}) {
  return {
    fromAddress: firstEnvValue(environment, FROM_EMAIL_NAMES) || DEFAULT_FROM_ADDRESS,
    toAddress: firstEnvValue(environment, TO_EMAIL_NAMES) || DEFAULT_TO_ADDRESS,
  };
}

export function getAwsSesConfig(environment = {}) {
  const config = {
    region: firstEnvValue(environment, AWS_REGION_NAMES),
    accessKeyId: firstEnvValue(environment, AWS_ACCESS_KEY_ID_NAMES),
    secretAccessKey: firstEnvValue(environment, AWS_SECRET_ACCESS_KEY_NAMES),
  };

  return {
    ...config,
    missing: [
      !config.region && AWS_REGION_NAMES[0],
      !config.accessKeyId && AWS_ACCESS_KEY_ID_NAMES[0],
      !config.secretAccessKey && AWS_SECRET_ACCESS_KEY_NAMES[0],
    ].filter(Boolean),
  };
}

export function checkedAwsSesConfigNames() {
  return {
    region: AWS_REGION_NAMES,
    accessKeyId: AWS_ACCESS_KEY_ID_NAMES,
    secretAccessKey: AWS_SECRET_ACCESS_KEY_NAMES,
    fromAddress: FROM_EMAIL_NAMES,
    toAddress: TO_EMAIL_NAMES,
  };
}

export function firstEnvValue(environment, names) {
  for (const name of names) {
    const value = environment[name] || import.meta.env?.[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}
