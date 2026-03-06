'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSEOByPage, SEOData } from '@/lib/api';

interface SEOHeadProps {
  defaultTitle?: string;
  defaultDescription?: string;
}

export default function SEOHead({ defaultTitle, defaultDescription }: SEOHeadProps) {
  const pathname = usePathname();

  useEffect(() => {
    const applySEO = async () => {
      try {
        const page = pathname === '/' ? '/' : pathname;
        const seoData = await getSEOByPage(page);

        if (seoData && seoData.isActive) {
          // Update title
          if (seoData.title) {
            document.title = seoData.title;
          }

          // Update meta description
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', seoData.description);

          // Update keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (seoData.keywords && seoData.keywords.length > 0) {
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.setAttribute('name', 'keywords');
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', seoData.keywords.join(', '));
          }

          // Update canonical
          let canonical = document.querySelector('link[rel="canonical"]');
          if (seoData.canonical) {
            if (!canonical) {
              canonical = document.createElement('link');
              canonical.setAttribute('rel', 'canonical');
              document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', seoData.canonical);
          }

          // Update Open Graph
          if (seoData.ogTitle) {
            updateMetaProperty('og:title', seoData.ogTitle);
          }
          if (seoData.ogDescription) {
            updateMetaProperty('og:description', seoData.ogDescription);
          }
          if (seoData.ogImage) {
            updateMetaProperty('og:image', seoData.ogImage);
          }
          if (seoData.ogUrl) {
            updateMetaProperty('og:url', seoData.ogUrl);
          }

          // Update Twitter Card
          if (seoData.twitterTitle) {
            updateMetaName('twitter:title', seoData.twitterTitle);
          }
          if (seoData.twitterDescription) {
            updateMetaName('twitter:description', seoData.twitterDescription);
          }
          if (seoData.twitterImage) {
            updateMetaName('twitter:image', seoData.twitterImage);
          }

          // Update robots
          if (seoData.robots) {
            const robotsContent = [
              seoData.robots.index ? 'index' : 'noindex',
              seoData.robots.follow ? 'follow' : 'nofollow',
            ].join(', ');
            updateMetaName('robots', robotsContent);
          }
        } else {
          // Use defaults if no SEO data
          if (defaultTitle) {
            document.title = defaultTitle;
          }
          if (defaultDescription) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
              metaDescription = document.createElement('meta');
              metaDescription.setAttribute('name', 'description');
              document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', defaultDescription);
          }
        }
      } catch (error) {
        // SEO yükleme hatası durumunda varsayılan değerleri kullan
        console.warn('SEO yükleme hatası, varsayılan değerler kullanılıyor:', error);
        if (defaultTitle) {
          document.title = defaultTitle;
        }
        if (defaultDescription) {
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', defaultDescription);
        }
      }
    };

    applySEO();
  }, [pathname, defaultTitle, defaultDescription]);

  return null;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
