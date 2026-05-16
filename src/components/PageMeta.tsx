import { useEffect } from 'react';

type PageMetaProps = {
  title: string;
  description: string;
  path?: string;
};

function upsertMeta(attr: 'property' | 'name', key: string, content: string) {
  let el =
    attr === 'property'
      ? document.querySelector(`meta[property="${key}"]`)
      : document.querySelector(`meta[name="${key}"]`);

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

export function PageMeta({ title, description, path = '/' }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'ar_EG');
    upsertMeta('property', 'og:site_name', 'هاتلي | Hatly');
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const origin = window.location.origin;
    upsertMeta('property', 'og:url', `${origin}${path.startsWith('/') ? path : `/${path}`}`);
  }, [title, description, path]);

  return null;
}
