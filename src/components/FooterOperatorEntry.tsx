import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  isOperatorConfigured,
  isValidOperatorCode,
  setOperatorSession,
} from '@/utils/operatorAuth';

export function FooterOperatorEntry() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  if (!isOperatorConfigured()) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!isValidOperatorCode(trimmed)) {
      setError(true);
      return;
    }
    setError(false);
    setOperatorSession(trimmed);
    setCode('');
    navigate('/operator');
  };

  return (
    <form className="footer-operator-entry" onSubmit={handleSubmit} aria-label="كود التشغيل">
      <input
        type="password"
        className="footer-operator-entry__input"
        placeholder="كود التشغيل"
        value={code}
        onChange={(event) => {
          setCode(event.target.value);
          if (error) setError(false);
        }}
        autoComplete="off"
      />
      {error ? <span className="footer-operator-entry__error">كود غير صحيح</span> : null}
    </form>
  );
}
