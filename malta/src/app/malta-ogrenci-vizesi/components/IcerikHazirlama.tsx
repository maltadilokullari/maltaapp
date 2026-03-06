'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IcerikHazirlama() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');

  useEffect(() => {
    // Son güncelleme tarihi - İstanbul saatine göre
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ];
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);
    
    // ISO format için
    const isoDate = istanbulDate.toISOString().split('T')[0];
    setDateModified(isoDate);
  }, []);

  return (
    <section className="bg-slate-50/50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Bu İçerik Nasıl Hazırlandı?
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          <p>
            Bu sayfadaki <strong>Malta öğrenci vizesi</strong> bilgileri, <strong>2026 yılı güncel vize uygulamaları</strong> ve <strong>resmî başvuru süreçleri</strong> baz alınarak hazırlanmıştır.
          </p>
          <p>
            İçerik, <Link href="https://visa.vfsglobal.com/tur/tr/mlt" target="_blank" rel="nofollow noopener noreferrer" className="font-semibold text-slate-900 hover:text-slate-700 hover:underline">VFS Global</Link> ve <Link href="https://identita.gov.mt/" target="_blank" rel="nofollow noopener noreferrer" className="font-semibold text-slate-900 hover:text-slate-700 hover:underline">Identity Malta</Link> resmî kaynakları, <strong>Malta'daki dil okullarının</strong> güncel vize süreçleri ve <strong>öğrenci vize başvurularındaki</strong> yaygın uygulamalar dikkate alınarak derlenmiştir.
          </p>
          <p>
            Sayfada yer alan <strong>vize ücretleri</strong>, <strong>başvuru süreleri</strong> ve <strong>gerekli belgeler</strong> bilgileri, <strong>2026 yılı başvuru dönemi</strong> için geçerlidir. Vize kuralları ve ücretler değişebileceği için, başvuru öncesinde <strong>resmî kaynaklardan</strong> güncel bilgilerin kontrol edilmesi önerilir.
          </p>
          <p>
            Bu sayfa, <strong>Malta dil okullarına kayıtlı öğrenciler</strong> için <strong>C Tipi (90 güne kadar)</strong> ve <strong>D Tipi (105 günden uzun)</strong> öğrenci vizesi başvurularına yönelik genel bir rehber niteliğindedir.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Son güncelleme:{' '}
            <time dateTime={dateModified || new Date().toISOString().split('T')[0]} className="font-medium text-slate-900">
              {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      </div>
    </section>
  );
}
