'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VizeFAQ() {
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  const faqListesi = [
    {
      soru: 'Malta öğrenci vizesi C tipi mi D tipi mi?',
      cevap:
        'Eğitim süresine göre vize türü değişir. 90 güne kadar eğitimler genelde C tipi (kısa süreli), 105 günden uzun eğitimler D tipi (uzun süreli) başvuru kapsamındadır.',
    },
    {
      soru: 'Malta öğrenci vizesi için bankada ne kadar para olmalı?',
      cevap:
        'Gösterilmesi gereken tutar eğitim süresi ve konaklama durumuna göre hesaplanır. Bu sayfadaki "Bankada Ne Kadar Para Olmalı?" bölümünde hesaplama mantığı ve örnek tablo yer alır.',
    },
    {
      soru: 'Konaklama ödemesi yaptıysam hesaplama değişir mi?',
      cevap:
        'Evet. Konaklama ödenmiş/ödenmemiş durumuna göre günlük hesaplama yaklaşımı değişebilir. Başvuru dosyasında konaklama ödemesi belgesi varsa hesaplamada dikkate alınmalıdır.',
    },
    {
      soru: 'Sponsorla Malta öğrenci vizesine başvurabilir miyim?',
      cevap:
        'Evet, sponsorla başvuru yapılabilir. Sponsorun masrafları karşıladığını gösteren resmi taahhüt belgesi ve sponsorun mali belgeleri dosyaya eklenmelidir.',
    },
    {
      soru: 'Banka dökümü kaç aylık olmalı?',
      cevap:
        'Başvurularda genellikle son 3 aya ait banka dökümü istenir. Dökümün banka tarafından kaşeli/imzalı olması ve bilgilerin dosyayla tutarlı olması önemlidir.',
    },
    {
      soru: 'Malta öğrenci vizesi kaç günde çıkar?',
      cevap:
        'Sonuçlanma süresi vize türüne ve başvuru yoğunluğuna göre değişir. Bu sayfadaki "Kaç Günde Çıkar?" bölümünde C tipi ve D tipi için ortalama süreler ve planlama tablosu yer alır.',
    },
    {
      soru: 'Malta öğrenci vizesine ne zaman başvurmalıyım?',
      cevap:
        'En sağlıklı yaklaşım, eğitim başlangıcından önce yeterli zaman bırakarak başvuruyu erkenden başlatmaktır. Yoğun dönemlerde randevu ve değerlendirme süreleri uzayabileceği için erken planlama önemlidir.',
    },
    {
      soru: 'Malta öğrenci vizesi için gerekli evraklar nelerdir?',
      cevap:
        'Pasaport, okul kabul belgesi, konaklama, banka dökümü, seyahat sağlık sigortası, başvuru formu ve biyometrik fotoğraf en temel evraklardandır. Evrak listesi bu sayfada tablo olarak sunulmuştur.',
    },
    {
      soru: 'VFS Global randevu linki nedir?',
      cevap:
        'C tipi (90 güne kadar) başvurularda randevu VFS Global üzerinden alınır. Randevu adresi bu sayfada ilgili adımda verilmiştir.',
    },
    {
      soru: 'Malta öğrenci vizesi neden reddedilir?',
      cevap:
        'Ret kararları çoğunlukla eksik evrak, mali yetersizlik veya belgeler arası tutarsızlıktan kaynaklanır. Bu sayfadaki "Neden Reddedilir?" bölümünde en sık yapılan hatalar maddeler halinde açıklanır.',
    },
    {
      soru: 'Taahhütname hatası vizeyi etkiler mi?',
      cevap:
        'Evet. Taahhütnamedeki içerik hataları veya tarih uyuşmazlığı, vizenin beklenenden kısa verilmesine veya ret riskinin artmasına neden olabilir.',
    },
    {
      soru: 'Malta öğrenci vizesi ile çalışabilir miyim?',
      cevap: (
        <>
          Çalışma hakkı vize türüne göre değişir. Bu sayfada özet bilgi yer alır; Work & Study sürecinin şartları ve detayları için{' '}
          <Link href="/malta-work-and-study" className="font-semibold text-slate-900 underline hover:text-slate-700">
            Malta Work & Study sayfasını
          </Link>{' '}
          inceleyin.
        </>
      ),
    },
  ];

  const toggleAcik = (index: number) => {
    setAcikIndex(acikIndex === index ? null : index);
  };

  return (
    <section id="sss" className="bg-white border-b border-slate-200 py-12 lg:py-16" itemScope itemType="https://schema.org/FAQPage">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl" itemProp="name">
            Malta Öğrenci Vizesi Hakkında Sık Sorulan Sorular
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            En çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
          </p>
        </div>

        <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
          {faqListesi.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleAcik(index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded-lg"
                aria-expanded={acikIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-900 pr-4" itemProp="name">{faq.soru}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                    acikIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {acikIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  {typeof faq.cevap === 'string' ? <p itemProp="text">{faq.cevap}</p> : <div itemProp="text">{faq.cevap}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
