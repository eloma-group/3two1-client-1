import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_IMAGE, SITE_NAME, absoluteUrl, organizationLd } from '../data/seo';

export interface Seo {
  title: string;
  description: string;
  /** Share image; defaults to the logo. */
  image?: string;
  /** Canonical path; defaults to the current path. */
  path?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  /** Extra JSON-LD nodes for this page, added to the @graph after the Organization. */
  jsonLd?: object[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(nodes: object[]) {
  let el = document.head.querySelector<HTMLScriptElement>('script#page-jsonld');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'page-jsonld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

/** Writes the page's title, description, canonical, Open Graph, Twitter and JSON-LD tags. */
export function useSeo({ title, description, image, path, type = 'website', noindex = false, jsonLd }: Seo) {
  const { pathname } = useLocation();
  const url = absoluteUrl(path ?? pathname);
  const img = absoluteUrl(image ?? DEFAULT_IMAGE);
  const ld = JSON.stringify(jsonLd ?? []);

  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setCanonical(url);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', type === 'product' ? 'product' : type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setJsonLd([
      organizationLd,
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${absoluteUrl('/')}#website` } },
      ...(JSON.parse(ld) as object[]),
    ]);
  }, [title, description, url, img, type, noindex, ld]);
}
