import type { ReactNode } from 'react';

type InnerPageShellProps = {
  badge?: string;
  title: string;
  lead: ReactNode;
  children: ReactNode;
  className?: string;
};

export function InnerPageShell({
  badge,
  title,
  lead,
  children,
  className = '',
}: InnerPageShellProps) {
  return (
    <div className={`ip-page ${className}`.trim()}>
      <header className="ip-hero">
        {badge ? <span className="ip-badge">{badge}</span> : null}
        <h1 className="ip-title">{title}</h1>
        <p className="ip-lead">{lead}</p>
      </header>
      {children}
    </div>
  );
}

type InfoCardProps = {
  icon: string;
  title: string;
  children: ReactNode;
  variant?: 'default' | 'accent' | 'warn' | 'trust';
};

export function InfoCard({ icon, title, children, variant = 'default' }: InfoCardProps) {
  return (
    <article className={`ip-card ip-card--${variant}`}>
      <span className="ip-card__icon" aria-hidden>
        {icon}
      </span>
      <div className="ip-card__body">
        <h2 className="ip-card__title">{title}</h2>
        <div className="ip-card__content">{children}</div>
      </div>
    </article>
  );
}

type IpCtaProps = {
  href: string;
  label: string;
  sublabel?: string;
  iconSrc?: string;
  external?: boolean;
};

export function IpCta({ href, label, sublabel, iconSrc, external = true }: IpCtaProps) {
  return (
    <a
      className="ip-cta"
      href={href}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {iconSrc ? (
        <img src={iconSrc} alt="" className="ip-cta__icon" width={22} height={22} decoding="async" />
      ) : null}
      <span className="ip-cta__text">
        <strong>{label}</strong>
        {sublabel ? <span className="ip-cta__sub">{sublabel}</span> : null}
      </span>
    </a>
  );
}
