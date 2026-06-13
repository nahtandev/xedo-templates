// Centralised, typed access to environment variables for this template.
// Every process.env lookup lives here. No silent "magic" fallbacks: a missing
// required variable is logged loudly (see requireEnv) instead of being papered
// over with a guessed default. Declare every variable below in .env.local —
// the full list is mirrored in .env.local.example.
//
// ⚠️ Server-only: this module reads XEDO_API_KEY. Do not import it from a Client
// Component — keep it behind lib/xedo.ts and the Server Actions in lib/actions.ts.

// — Runtime flags —

export const isDevEnv = process.env.NODE_ENV === 'development';
export const isProdEnv = process.env.NODE_ENV === 'production';

/**
 * Read an environment variable once, with presence checking.
 *
 * When `required` is set and the variable is absent (or blank), a clear error
 * is logged so the misconfiguration surfaces immediately in dev/CI logs —
 * rather than silently falling back to a guessed value and failing later with a
 * confusing symptom. Returns the trimmed value, or undefined when unset.
 */
export function requireEnv(
  key: string,
  { required = false }: { required?: boolean } = {},
): string | undefined {
  const value = process.env[key]?.trim();
  if (value) return value;
  if (required) {
    console.error(
      `[env] Variable d'environnement requise manquante : ${key}. ` +
        'Renseigne-la dans .env.local (voir .env.local.example).',
    );
  }
  return undefined;
}

// — Xèdo Developer API (server-side only) —

/**
 * Bearer API key (`xdk_live_…` / `xdk_test_…`). Never log it, never expose it to
 * the browser. lib/xedo.ts throws if it is missing.
 */
export const XEDO_API_KEY = requireEnv('XEDO_API_KEY', { required: true });

/**
 * Override the Xèdo API base URL (testnet vs prod). Optional — when unset the
 * SDK uses its built-in production marketplace URL.
 */
export const XEDO_API_BASE_URL = requireEnv('XEDO_API_BASE_URL');

// — Storefront —

/**
 * Public site origin, used to build the payment `returnUrl` (…/confirmation).
 * Must be HTTPS in production for the Xèdo API to accept it. Required — no
 * localhost fallback: set it explicitly in .env.local. Trailing slash stripped
 * to keep URL joins clean.
 */
export const SITE_URL = (
  requireEnv('NEXT_PUBLIC_SITE_URL', { required: true }) ?? ''
).replace(/\/+$/, '');
