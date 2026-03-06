'use client';

import { useState } from 'react';

const faqItems = [
  {
    question: 'Malta dil okulları konaklama fiyatları 2026 yılında ne kadar?',
    answer: 'Malta dil okulları konaklama fiyatları 2026 yılında konaklama türüne göre değişmekle birlikte genellikle haftalık ortalama 150 – 350 Euro aralığındadır. Fiyatlar sezon, konum ve kalış süresine göre farklılık gösterebilir.',
  },
  {
    question: 'Malta\'da dil okulu öğrencileri için hangi konaklama seçenekleri vardır?',
    answer: 'Malta\'da dil okulu öğrencileri için aile yanı, öğrenci rezidansı, paylaşımlı apart, stüdyo daire, hostel ve otel gibi farklı konaklama seçenekleri sunulmaktadır.',
  },
  {
    question: 'Malta dil okulları için en çok tercih edilen konaklama hangisidir?',
    answer: 'Malta dil okullarında en çok tercih edilen konaklama türleri aile yanı ve öğrenci rezidansıdır. Aile yanı dil pratiği, rezidanslar ise sosyal ortam avantajı sunar.',
  },
  {
    question: 'Malta\'da aile yanı konaklama mı rezidans mı daha avantajlı?',
    answer: 'Aile yanı konaklama dil pratiği ve kültürel deneyim açısından avantajlıyken, öğrenci rezidansı sosyal yaşam ve bağımsızlık açısından öne çıkar. Tercih öğrencinin beklentisine göre değişir.',
  },
  {
    question: 'Malta dil okulları konaklamaları okula yakın mı?',
    answer: 'Malta dil okulları konaklamaları genellikle okula yürüme mesafesinde veya toplu taşıma ile kolay ulaşılabilir bölgelerde planlanmaktadır.',
  },
  {
    question: 'Malta\'da konaklama fiyatları okula göre değişir mi?',
    answer: 'Evet, Malta\'da konaklama fiyatları dil okuluna, okulun bulunduğu bölgeye ve anlaşmalı konaklama türlerine göre değişiklik gösterebilir.',
  },
  {
    question: 'Malta dil okulu konaklamalarında yemek dahil mi?',
    answer: 'Aile yanı konaklamalarda genellikle kahvaltı veya yarım pansiyon seçenekleri bulunur. Rezidans, apart ve stüdyo dairelerde yemek çoğunlukla dahil değildir.',
  },
  {
    question: 'Malta\'da konaklama süresi eğitim süresiyle aynı olmak zorunda mı?',
    answer: 'Hayır, Malta dil okulları konaklamalarında konaklama süresi eğitim süresinden daha kısa veya daha uzun olacak şekilde ayarlanabilir.',
  },
  {
    question: 'Malta\'ya gitmeden önce konaklama ayarlamak zorunlu mu?',
    answer: 'Malta\'ya dil eğitimi için giden öğrenciler için konaklamanın önceden ayarlanması önerilir, özellikle yoğun sezonlarda bu büyük avantaj sağlar.',
  },
  {
    question: 'Malta dil okulları konaklama değişikliği yapılabilir mi?',
    answer: 'Evet, konaklamadan memnun kalınmaması durumunda çoğu dil okulu, müsaitlik durumuna göre konaklama değişikliği yapılmasına yardımcı olur.',
  },
];

export default function FAQSection() {
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-12" id="sss" itemScope itemType="https://schema.org/FAQPage">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
            Malta Dil Okulları Konaklama: Sıkça Sorulan Sorular
          </h2>
          <p className="text-base leading-relaxed text-slate-700" itemProp="description">
            En çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
          </p>
        </div>
        
        <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setAcikIndex(acikIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                aria-expanded={acikIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-900 pr-4" itemProp="name">{faq.question}</span>
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
                  <p itemProp="text">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
