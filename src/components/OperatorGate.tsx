import { useState, type FormEvent, type ReactNode } from 'react';

import { InnerPageShell } from '@/components/InnerPageShell';
import {
  getOperatorSession,
  isOperatorConfigured,
  isValidOperatorCode,
  setOperatorSession,
} from '@/utils/operatorAuth';

type OperatorGateProps = {
  badge?: string;
  title: string;
  lead: string;
  children: (sessionSecret: string) => ReactNode;
  unconfiguredMessage?: string;
};

export function OperatorGate({
  badge = 'داخلي',
  title,
  lead,
  children,
  unconfiguredMessage = 'لوحة التشغيل غير مفعّلة بعد.',
}: OperatorGateProps) {
  const configured = isOperatorConfigured();
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sessionSecret, setSessionSecret] = useState<string | null>(() => getOperatorSession());

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = codeInput.trim();
    if (!isValidOperatorCode(trimmed)) {
      setError('كود غير صحيح');
      return;
    }
    setError(null);
    setOperatorSession(trimmed);
    setSessionSecret(trimmed);
    setCodeInput('');
  };

  if (!configured) {
    return (
      <InnerPageShell badge={badge} title={title} lead={unconfiguredMessage}>
        <p className="operator-message">
          اضبط <code dir="ltr">VITE_OPERATOR_PASSWORD</code> أو{' '}
          <code dir="ltr">VITE_OPERATOR_ENTRY_CODE</code> في إعدادات Vercel.
        </p>
      </InnerPageShell>
    );
  }

  if (!sessionSecret) {
    return (
      <InnerPageShell badge={badge} title={title} lead={lead} className="ip-page--operator">
        <form className="operator-login" onSubmit={handleSubmit}>
          <label className="product-order-flow__field">
            <span>كود التشغيل</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="كود التشغيل"
              value={codeInput}
              onChange={(event) => {
                setCodeInput(event.target.value);
                if (error) setError(null);
              }}
            />
          </label>
          {error ? <p className="footer-operator-entry__error">{error}</p> : null}
          <button type="submit" className="manual-payment-flow__confirm">
            دخول
          </button>
        </form>
      </InnerPageShell>
    );
  }

  return <>{children(sessionSecret)}</>;
}
