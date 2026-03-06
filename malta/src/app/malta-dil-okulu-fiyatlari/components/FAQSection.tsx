'use client';

import { useState } from 'react';

const faqItems = [
  {
    question: 'Malta dil okulu fiyatları 2026\'da ne kadar?',
    answer: {
      snippet: 'Malta dil okulu fiyatları 2026\'da süreye göre değişir: 4 hafta 1.350–1.800 €, 12 hafta 3.800–4.900 €, 24 hafta 7.000–9.000 €.',
      points: [
        'Fiyatlar haftalık ücretlerin toplamıdır.',
        'Sezon (yaz) ve konaklama toplamı en çok değiştirir.',
        'Net rakam için ders sayısı + oda tipi aynı olmalıdır.',
      ],
    },
  },
  {
    question: 'Malta dil okulu fiyatları haftalık mı hesaplanır?',
    answer: {
      snippet: 'Malta dil okulu fiyatları çoğunlukla haftalık belirlenir; 1 ay/12 hafta/24 hafta ücretleri haftalık ücretlerin toplamından oluşur.',
      points: [
        'Süre uzadıkça haftalık ortalama düşebilir.',
        '20 ders ve 30 ders farklı haftalık ücrete sahiptir.',
        'Yaz sezonu haftalık fark ekleyebilir.',
      ],
    },
  },
  {
    question: 'Malta dil okulu paket fiyatına neler dahildir?',
    answer: {
      snippet: 'Malta dil okulu fiyatları \'paket\' olarak verildiyse genelde kurs + konaklama toplamını ifade eder; ancak içerik okuldan okula değişebilir.',
      points: [
        'Genelde: kurs, konaklama (oda tipi netse)',
        'Bazen: kayıt veya materyal',
        'Sıkça ayrıca: sezon farkı, tek kişilik oda/ensuite, transfer',
      ],
    },
  },
  {
    question: 'Malta dil okulu fiyatları neden bu kadar değişken?',
    answer: {
      snippet: 'Malta dil okulu fiyatları aynı sürede bile değişebilir; çünkü toplam maliyet sezon + ders sayısı + konaklama türü birleşimiyle oluşur.',
      points: [
        'Yaz/kış sezonu fiyatı yukarı-aşağı çeker.',
        '20 ders–30 ders farkı toplamı büyütür.',
        'Oda tipi ve tek kişilik farkı en büyük oynatıcıdır.',
      ],
    },
  },
  {
    question: 'Yaz sezonunda Malta dil okulu fiyatları daha mı pahalı?',
    answer: {
      snippet: 'Evet, yaz sezonunda Malta dil okulu fiyatları genelde artar; çünkü talep yükselir ve sezon farkı haftalık maliyete eklenebilir.',
      points: [
        'Haziran–Eylül aralığı daha yüksek bütçe gerektirebilir.',
        'Konaklama tarafı daha hızlı yükselir.',
        'Uzun dönemlerde bazı paketlerde fark daha sınırlı kalabilir.',
      ],
    },
  },
  {
    question: 'Malta dil okulu ücretini kime ödüyoruz?',
    answer: {
      snippet: 'Malta dil okulu fiyatları için ödemeler çoğunlukla doğrudan okula yapılır; ön kayıt kartla, kalan tutar okul hesabına havale ile tamamlanabilir.',
      points: [
        'Ödeme dekontu vize için önemlidir.',
        'Paket içeriği \'dahil/hariç\' kontrol edilmelidir.',
        'Süre uzadıkça toplam tutar büyür, planlama şarttır.',
      ],
    },
  },
  {
    question: 'Malta dil okulu ödemesi tek seferde mi yapılır?',
    answer: {
      snippet: 'Malta dil okulu fiyatları çoğu başvuruda tek seferde ödenir; çünkü vize dosyasında ödemenin tamamlandığını gösteren dekont istenebilir.',
      points: [
        'Ön kayıt + kalan bakiye şeklinde iki aşama görülebilir.',
        'Başlangıca 2–6 hafta kala bakiye kapanır.',
        'Sezonda erken ödeme kontenjan avantajı sağlar.',
      ],
    },
  },
  {
    question: 'Malta dil okulu fiyatlarına konaklama depozitosu dahil mi?',
    answer: {
      snippet: 'Malta dil okulu fiyatları pakete göre değişir; konaklama depozitosu çoğu zaman paketten ayrı alınır ve çıkışta iade edilebilir.',
      points: [
        'Depozito iade şartı konaklama tipine bağlıdır.',
        'Hasar/eksik durumunda kesinti olabilir.',
        'Netleşmesi gereken kalemlerden biridir.',
      ],
    },
  },
  {
    question: 'Malta dil okulu fiyatları uzun sürede neden daha avantajlı?',
    answer: {
      snippet: 'Malta dil okulu fiyatları uzun dönemde daha avantajlı görünebilir; çünkü birçok programda süre uzadıkça haftalık kurs ücreti düşebilir.',
      points: [
        '12–24 hafta planlarda haftalık ortalama dengelenir.',
        'Toplam artar ama aylık ortalama düşebilir.',
        'En büyük farkı yine konaklama standardı belirler.',
      ],
    },
  },
] as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="sss" aria-label="Malta Dil Okulu Fiyatları Sıkça Sorulan Sorular" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-8">
          <div className="mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-slate-900 to-slate-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl lg:text-3xl">
            Malta Dil Okulu Fiyatları Hakkında Sıkça Sorulan Sorular (2026)
          </h2>
        </header>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <article
              key={index}
              className="group rounded-xl border border-slate-200 bg-white transition hover:border-slate-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base font-semibold text-slate-900 md:text-lg">{item.question}</h3>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-slate-600 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="border-t border-slate-200 px-5 py-4">
                  <p className="mb-4 text-base font-medium leading-relaxed text-slate-900">{item.answer.snippet}</p>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                    {item.answer.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
