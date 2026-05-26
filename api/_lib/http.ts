import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  isOperatorAuthorized,
  operatorNotConfiguredResponse,
  operatorUnauthorizedResponse,
} from './auth';

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function dbNotConfiguredResponse(res: VercelResponse) {
  return res.status(503).json({
    error: 'قاعدة البيانات غير مفعّلة بعد.',
    code: 'DB_NOT_CONFIGURED',
  });
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  res.setHeader('Allow', allowed.join(', '));
  return res.status(405).json({ error: 'Method not allowed' });
}

export function readJsonBody<T>(req: VercelRequest): T | null {
  if (!req.body) return null;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as T;
    } catch {
      return null;
    }
  }
  return req.body as T;
}

export function requireOperatorAuth(req: VercelRequest, res: VercelResponse): boolean {
  if (!process.env.OPERATOR_API_SECRET?.trim() && !process.env.OPERATOR_PASSWORD?.trim()) {
    const { status, body } = operatorNotConfiguredResponse();
    res.status(status).json(body);
    return false;
  }
  if (!isOperatorAuthorized(req)) {
    const { status, body } = operatorUnauthorizedResponse();
    res.status(status).json(body);
    return false;
  }
  return true;
}

export function databaseErrorResponse(res: VercelResponse, context: string, error: unknown) {
  console.error(`${context}`, error);
  return res.status(500).json({ ok: false, error: 'DATABASE_ERROR' });
}

export { isOperatorAuthorized, operatorNotConfiguredResponse, operatorUnauthorizedResponse };
