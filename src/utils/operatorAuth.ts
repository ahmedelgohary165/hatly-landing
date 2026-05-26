export const OPERATOR_SESSION_KEY = 'hatly-operator-auth';

export function getOperatorEntryCodes(): string[] {
  const codes = [
    import.meta.env.VITE_OPERATOR_PASSWORD?.trim(),
    import.meta.env.VITE_OPERATOR_ENTRY_CODE?.trim(),
  ].filter(Boolean) as string[];
  return [...new Set(codes)];
}

export function isOperatorConfigured(): boolean {
  return getOperatorEntryCodes().length > 0;
}

export function isValidOperatorCode(code: string): boolean {
  const trimmed = code.trim();
  if (!trimmed) return false;
  return getOperatorEntryCodes().includes(trimmed);
}

export function getOperatorSession(): string | null {
  if (!isOperatorConfigured()) return null;
  return sessionStorage.getItem(OPERATOR_SESSION_KEY);
}

export function setOperatorSession(code: string): void {
  sessionStorage.setItem(OPERATOR_SESSION_KEY, code.trim());
}

export function clearOperatorSession(): void {
  sessionStorage.removeItem(OPERATOR_SESSION_KEY);
}

export function getOperatorSecretHeader(): Record<string, string> {
  const secret = getOperatorSession();
  if (!secret) return {};
  return { 'X-Operator-Secret': secret };
}
