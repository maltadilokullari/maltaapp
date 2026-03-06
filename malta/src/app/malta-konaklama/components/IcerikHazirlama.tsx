'use client';

import { useState, useEffect } from 'react';

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
    <section id="icerik-hakkinda" className="bg-slate-50/50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Bu İçerik Nasıl Hazırlandı?
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          <p>
            Bu sayfadaki <strong>Malta konaklama</strong> bilgileri, <strong>2026 yılı güncel konaklama fiyatları</strong> ve <strong>öğrenci konaklama seçenekleri</strong> baz alınarak hazırlanmıştır.
          </p>
          <p>
            İçerik, <strong>Malta'da yaşamış</strong> ve <strong>farklı konaklama türlerini</strong> deneyimlemiş ekibin <strong>saha deneyimine</strong> dayanır. <strong>Konaklama türleri</strong>, <strong>fiyat aralıkları</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak derlenmiştir.
          </p>
          <p>
            Sayfada yer alan <strong>konaklama türleri</strong>, <strong>fiyat bilgileri</strong> ve <strong>seçim rehberi</strong>, <strong>2026 yılı</strong> için geçerlidir. Konaklama fiyatları sezona, konuma ve konaklama türüne göre değişebileceği için, başvuru öncesinde <strong>okullardan güncel fiyat tekliflerinin</strong> alınması önerilir.
          </p>
          <p>
            Bu sayfa, <strong>Malta dil okulu</strong> eğitimi planlayan öğrenciler için <strong>konaklama seçenekleri</strong> ve <strong>fiyat karşılaştırması</strong> sunan genel bir rehber niteliğindedir.
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
