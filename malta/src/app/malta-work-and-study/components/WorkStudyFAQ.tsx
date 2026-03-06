'use client';

import { useState } from 'react';

export default function WorkStudyFAQ() {
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  const faqListesi = [
    {
      soru: 'Malta Work & Study ile tam zamanlı çalışabilir miyim?',
      cevap:
        'Hayır. Malta Work & Study programı kapsamında öğrenciler haftada maksimum 20 saat part-time çalışabilir. Full-time çalışma, öğrenci statüsünde mümkün değildir.',
    },
    {
      soru: 'İlk 90 gün çalışmak zorunlu mu?',
      cevap:
        "Hayır. Malta'da Work & Study sürecinin ilk 90 günü yalnızca eğitim odaklıdır. Çalışma izni başvurusu bu sürenin ardından yapılabilir.",
    },
    {
      soru: "Malta'da öğrenci olarak ayda ne kadar kazanılır?",
      cevap:
        '2026 itibarıyla saatlik ücretler genellikle 7–9 € arasındadır. Haftada 20 saat çalışan bir öğrenci, aylık ortalama 550–750 € gelir elde edebilir.',
    },
    {
      soru: 'İngilizce seviyem düşükse Work & Study yapabilir miyim?',
      cevap:
        'Evet. Program İngilizce eğitimi ile başladığı için başlangıç seviyesindeki öğrenciler için de uygundur. İş bulma süreci, temel iletişim seviyesine ulaşıldıktan sonra daha kolay ilerler.',
    },
    {
      soru: 'İş bulamazsam Work & Study programı iptal olur mu?',
      cevap:
        'Hayır. Work & Study bir çalışma programı değil, eğitim temelli bir sistemdir. İş bulamamak programın iptal edilmesine neden olmaz.',
    },
    {
      soru: 'Malta Work & Study 2026 yılında gerçekten mantıklı mı?',
      cevap:
        'İngilizce pratiği, bütçe kontrolü ve Avrupa deneyimini birlikte hedefleyen öğrenciler için Malta Work & Study, 2026 itibarıyla dengeli ve erişilebilir bir seçenektir.',
    },
  ];

  const toggleAcik = (index: number) => {
    setAcikIndex(acikIndex === index ? null : index);
  };

  return (
    <section id="sss" className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16" itemScope itemType="https://schema.org/FAQPage">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl" itemProp="name">
            Malta Work & Study Hakkında Sık Sorulan Sorular (2026)
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
                type="button"
                onClick={() => toggleAcik(index)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                aria-expanded={acikIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">{faq.soru}</span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                      acikIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  acikIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-0" itemScope itemType="https://schema.org/Answer">
                  <p className="text-base leading-relaxed text-slate-700" itemProp="text">
                    {faq.cevap}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
