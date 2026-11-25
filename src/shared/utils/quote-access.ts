const encoder = new TextEncoder();
export const quoteCookieName = 'asianode_quote_access';
const lifetimeSeconds = 60 * 60 * 12;

async function signature(expires: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = await crypto.subtle.sign('HMAC', key, encoder.encode(expires));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function createQuoteSession(secret: string) {
  const expires = String(Math.floor(Date.now() / 1000) + lifetimeSeconds);
  return `${expires}.${await signature(expires, secret)}`;
}

export async function validQuoteSession(value: string | undefined, secret: string | undefined) {
  if (!value || !secret) return false;
  const parts = value.split('.');
  if (parts.length !== 2 || !/^\d{10}$/.test(parts[0]) || !/^[a-f0-9]{64}$/.test(parts[1]) || Number(parts[0]) <= Date.now() / 1000) return false;
  const expected = await signature(parts[0], secret);
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= expected.charCodeAt(i) ^ parts[1].charCodeAt(i);
  return difference === 0;
}

export function safeQuotePath(value: FormDataEntryValue | string | null) {
  return typeof value === 'string' && /^\/(?:zh\/|tr\/)?quote\/?$/.test(value) ? value : '/quote';
}
