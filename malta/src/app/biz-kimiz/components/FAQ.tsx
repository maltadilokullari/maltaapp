'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'Danışmanlık hizmetiniz gerçekten ücretsiz mi?',
    answer: 'Evet. Okul seçimi, konaklama planlaması ve vize danışmanlığı için herhangi bir ücret almıyoruz. Süreci en baştan şeffaf şekilde anlatıyoruz.',
  },
  {
    question: 'Sadece okul kaydı mı yapıyorsunuz?',
    answer: 'Hayır. Malta\'ya varıştan eğitimin bitişine ve Türkiye\'ye dönüşe kadar öğrencilerimizin yanında oluyoruz.',
  },
  {
    question: 'Malta\'ya geldikten sonra destek alabiliyor muyum?',
    answer: 'Evet. Malta\'da yaşayan ekibimizle eğitim süresi boyunca destek sağlıyoruz ve acil durumlarda müdahale ediyoruz.',
  },
  {
    question: 'Her öğrenciye aynı okulu mu öneriyorsunuz?',
    answer: 'Hayır. Okul önerilerimizi öğrencinin hedefi, bütçesi ve beklentisine göre kişisel olarak yapıyoruz.',
  },
  {
    question: 'Vize sürecinde yalnız mı ilerliyorum?',
    answer: 'Hayır. Vize sürecindeki tüm adımları birlikte ilerliyor, öğrenciyi yalnız bırakmıyoruz.',
  },
  {
    question: 'Transfer ve ilk günlerde destek sağlıyor musunuz?',
    answer: 'Evet. Ücretsiz havalimanı transferi ve ilk gün destek hizmeti sunuyoruz.',
  },
  {
    question: 'Sizin farkınız nedir?',
    answer: 'Malta\'da 8 yıldır yaşayan bir ekip olarak süreci uzaktan değil, yerinde yönetiyoruz.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-center">
          Sıkça Sorulan Sorular
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-900"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-left">{faq.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-slate-600 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 text-base leading-relaxed text-slate-700 bg-slate-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
