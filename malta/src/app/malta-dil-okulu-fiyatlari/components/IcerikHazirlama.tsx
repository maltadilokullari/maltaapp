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
            Bu sayfadaki <strong>Malta dil okulu fiyatları</strong> bilgileri, <strong>2026 yılı güncel eğitim ücretleri</strong> ve <strong>konaklama fiyatları</strong> baz alınarak hazırlanmıştır.
          </p>
          <p>
            İçerik, <strong>Malta'daki dil okullarından</strong> alınan <strong>güncel fiyat teklifleri</strong>, <strong>okul görüşmeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak derlenmiştir. Fiyat bilgileri, <strong>haftalık</strong>, <strong>aylık</strong> ve <strong>dönemlik</strong> eğitim paketleri ile <strong>konaklama seçenekleri</strong> için güncel tutarları yansıtır.
          </p>
          <p>
            Sayfada yer alan <strong>fiyat aralıkları</strong>, <strong>yaşam maliyetleri</strong> ve <strong>bütçe hesaplama</strong> bilgileri, <strong>2026 yılı</strong> için geçerlidir. Fiyatlar sezona, konaklama türüne ve program süresine göre değişebileceği için, başvuru öncesinde <strong>okullardan güncel fiyat tekliflerinin</strong> alınması önerilir.
          </p>
          <p>
            Bu sayfa, <strong>Malta dil okulu</strong> eğitimi planlayan öğrenciler için <strong>fiyat karşılaştırması</strong> ve <strong>bütçe planlaması</strong> sunan genel bir rehber niteliğindedir.
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
