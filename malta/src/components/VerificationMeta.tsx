'use client';

import { useEffect } from 'react';
import { getVerification } from '@/lib/api';

export default function VerificationMeta() {
  useEffect(() => {
    const applyVerification = async () => {
      try {
        const verificationData = await getVerification();

        if (!verificationData || !verificationData.isActive) {
          return;
        }

        // Google Site Verification
        if (verificationData.google_site_verification) {
          updateOrCreateMeta('google-site-verification', verificationData.google_site_verification, 'name');
        }

        // Bing Site Verification
        if (verificationData.bing_site_verification) {
          updateOrCreateMeta('msvalidate.01', verificationData.bing_site_verification, 'name');
        }

        // Yandex Verification
        if (verificationData.yandex_verification) {
          updateOrCreateMeta('yandex-verification', verificationData.yandex_verification, 'name');
        }

        // Facebook Domain Verification
        if (verificationData.facebook_domain_verification) {
          updateOrCreateMeta('facebook-domain-verification', verificationData.facebook_domain_verification, 'name');
        }

        // Pinterest Verification
        if (verificationData.pinterest_verification) {
          updateOrCreateMeta('pinterest-site-verification', verificationData.pinterest_verification, 'name');
        }
      } catch (error) {
        console.warn('Verification meta tags yüklenirken hata:', error);
      }
    };

    applyVerification();
  }, []);

  return null;
}

function updateOrCreateMeta(name: string, content: string, attribute: 'name' | 'property') {
  if (!content || typeof content !== 'string') {
    return;
  }

  // XSS koruması - sadece güvenli karakterlere izin ver
  const sanitizedContent = content.trim().replace(/[^a-zA-Z0-9\-_.]/g, '');
  
  if (!sanitizedContent) {
    return;
  }

  // Mevcut meta etiketini bul veya oluştur
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', sanitizedContent);
}
