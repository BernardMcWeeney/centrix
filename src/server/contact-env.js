const TURNSTILE_SITE_KEY_NAMES = [
  'PUBLIC_TURNSTILE_SITE_KEY',
  'TURNSTILE_SITE_KEY',
  'CF_TURNSTILE_SITE_KEY',
  'CLOUDFLARE_TURNSTILE_SITE_KEY',
  'TURNSTILE_PUBLIC_KEY',
];

const TURNSTILE_SECRET_KEY_NAMES = [
  'TURNSTILE_SECRET_KEY',
  'CF_TURNSTILE_SECRET_KEY',
  'CLOUDFLARE_TURNSTILE_SECRET_KEY',
  'TURNSTILE_SECRET',
];

export function getTurnstileSiteKey(environment = {}) {
  return firstEnvValue(environment, TURNSTILE_SITE_KEY_NAMES);
}

export function getTurnstileSecretKey(environment = {}) {
  return firstEnvValue(environment, TURNSTILE_SECRET_KEY_NAMES);
}

export function checkedTurnstileSiteKeyNames() {
  return TURNSTILE_SITE_KEY_NAMES;
}

export function checkedTurnstileSecretKeyNames() {
  return TURNSTILE_SECRET_KEY_NAMES;
}

function firstEnvValue(environment, names) {
  for (const name of names) {
    const value = environment[name] || import.meta.env?.[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}
