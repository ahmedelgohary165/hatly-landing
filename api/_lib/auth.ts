import type { VercelRequest } from '@vercel/node';

function readHeader(req: VercelRequest, name: string): string | null {
  const value = req.headers[name.toLowerCase()];
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0]?.trim()) return value[0].trim();
  return null;
}

export function getConfiguredOperatorSecret(): string {
  return (
    process.env.OPERATOR_API_SECRET?.trim() ||
    process.env.OPERATOR_PASSWORD?.trim() ||
    ''
  );
}

/** Accepts X-Operator-Secret or X-Operator-Password (legacy orders API). */
export function getOperatorSecret(req: VercelRequest): string | null {
  return readHeader(req, 'x-operator-secret') ?? readHeader(req, 'x-operator-password');
}

export function isOperatorAuthorized(req: VercelRequest): boolean {
  const configured = getConfiguredOperatorSecret();
  if (!configured) return false;
  return getOperatorSecret(req) === configured;
}

export function operatorNotConfiguredResponse() {
  return {
    status: 503,
    body: { error: 'لوحة التشغيل غير مفعّلة بعد.', code: 'OPERATOR_NOT_CONFIGURED' },
  };
}

export function operatorUnauthorizedResponse() {
  return {
    status: 401,
    body: { error: 'كود غير صحيح.', code: 'UNAUTHORIZED' },
  };
}
