'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'Malta dil okulu hakkında nasıl daha detaylı bilgi alabilirim?',
    answer: 'Malta dil okullarıyla ilgili süreç bilgisi, okul önerileri, fiyatlar ve program karşılaştırmaları için bizimle form üzerinden iletişime geçebilir veya WhatsApp/telefonla hızlıca yazabilirsiniz. Ücretsiz danışmanlık ekibimiz size birebir geri dönüş sağlar.',
  },
  {
    question: 'Malta dil okulu hakkında telefonla veya e-postayla iletişim kurabilir miyim?',
    answer: 'Evet. Türkiye ve Malta ofislerimiz üzerinden hızlı şekilde ulaşabilirsiniz: Türkiye: +90 543 963 24 16, Malta: +356 99 14 30 66, E-posta: bilgi@maltadilokuluingilizce.com. Bu kanallar başvuru, kayıt, vize ve konaklama gibi tüm sorularınız için aktiftir.',
  },
  {
    question: 'Başvuru ve kayıt sürecinde hangi konularda destek alabilirim?',
    answer: 'Formu doldurduktan veya yazdıktan sonra okul başvuru işlemleri, program/okul seçimi, fiyat ve bütçe bilgisi, vize başvurusu ve konaklama planlama süreçlerinde profesyonel yönlendirme alırsınız.',
  },
  {
    question: 'Malta\'da eğitim almak için gerekli belgeler nelerdir?',
    answer: 'Genel olarak Malta öğrenci vizesi için kabul mektubu, pasaport, sağlık ve seyahat sigortası, finansal yeterlilik belgeleri, konaklama rezervasyonu ve uçuş bilgileri gereklidir. Bu belgelerle ilgili eksiksiz listeyi danışmanlık sürecinde adım adım iletiriz.',
  },
  {
    question: 'Ücretsiz bilgi/danışmanlık ne kadar sürer?',
    answer: 'Genellikle form veya WhatsApp üzerinden bize ulaştıktan sonra 24–48 saat içinde dönüş sağlıyoruz. Acil durumlarda WhatsApp üzerinden daha hızlı iletişim imkanı vardır.',
  },
  {
    question: 'Malta dil okulu fiyatları ve program seçenekleri hakkında bilgi alabilir miyim?',
    answer: 'Evet. Fiyatlar okul türüne, program süresine ve ders yoğunluğuna göre değişir. 2026 yılı için Malta dil okulu fiyatlarını ve uygun programları size özel plan dahilinde danışmanlıkla netleştiriyoruz.',
  },
  {
    question: 'Malta dil okulu ile ilgili gerçek öğrenci değerlendirmeleri ve okul deneyimleri var mı?',
    answer: 'Evet. Malta dil okulları ile ilgili akreditasyon, sınıf yapısı ve öğrenci deneyimleri hakkında danışmanlık sürecinde detaylı bilgi alabilirsiniz.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
          Sık Sorulan Sorular
        </h2>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-base font-semibold text-slate-900 hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-900"
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
                <div className="px-6 py-4 text-sm leading-relaxed text-slate-700 bg-white">
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
