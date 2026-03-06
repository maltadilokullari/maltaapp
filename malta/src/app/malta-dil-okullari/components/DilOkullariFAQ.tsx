'use client';

import { useState } from 'react';

export default function DilOkullariFAQ() {
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  const faqListesi = [
    {
      soru: "Malta'da dil okulu seçerken okul mu bölge mi daha belirleyicidir?",
      cevap:
        "Malta'da dil okulu deneyimini belirleyen en önemli faktörlerden biri okulun bulunduğu bölgedir. Sosyal ortam, ulaşım ve günlük yaşam temposu; öğrencinin motivasyonunu ve pratik yapma sıklığını doğrudan etkiler. Bu nedenle okul seçimi, bölge tercihinden bağımsız düşünülmemelidir.",
    },
    {
      soru: 'Malta dil okulları başlangıç seviyesi öğrenciler için uygun mu?',
      cevap:
        'Evet. Malta\'daki dil okullarının büyük bölümü, başlangıç seviyesinden ileri seviyeye kadar farklı sınıflar sunar. Özellikle sosyal ortamı güçlü ve dengeli tempoya sahip okullar, başlangıç seviyesi öğrenciler için daha rahat bir adaptasyon sağlar.',
    },
    {
      soru: "Malta'da kısa süreli dil eğitimi gerçekten işe yarar mı?",
      cevap:
        'Kısa süreli dil eğitiminin verimi, program temposu ve öğrencinin hedefiyle doğrudan ilişkilidir. Yoğun programlar kısa sürede ilerleme sağlayabilirken, dengeli programlar dilin kalıcı şekilde gelişmesine katkı sağlar.',
    },
    {
      soru: 'Malta dil okullarında milliyet dağılımı neden önemlidir?',
      cevap:
        'Sınıf içindeki milliyet dağılımı, öğrencinin İngilizce pratik yapma oranını etkiler. Daha dengeli bir uluslararası dağılım, öğrencilerin ana dillerine daha az başvurmasını ve İngilizceyi aktif kullanmasını sağlar.',
    },
    {
      soru: "Malta'da büyük zincir okullar mı yoksa küçük okullar mı daha verimlidir?",
      cevap:
        'Büyük zincir okullar daha geniş program ve aktivite seçenekleri sunarken, küçük okullar daha bireysel ilgi ve sakin sınıf ortamı sağlayabilir. Verimlilik, okulun büyüklüğünden çok öğrencinin beklentisine uygunluğuna bağlıdır.',
    },
    {
      soru: 'Malta dil okullarında sınıf değişikliği veya seviye yükseltme nasıl yapılır?',
      cevap:
        'Çoğu Malta dil okulunda düzenli seviye değerlendirme testleri uygulanır. Öğrenciler, ilerleme durumlarına göre sınıf değiştirebilir veya daha uygun bir seviyeye yönlendirilebilir.',
    },
    {
      soru: 'Malta dil okullarında eğitim kalitesini nasıl karşılaştırabilirim?',
      cevap:
        'Eğitim kalitesini karşılaştırırken akreditasyonlar, sınıf mevcudu, öğretmen deneyimi ve program yapısı dikkate alınmalıdır. Okul ismi tek başına kalite göstergesi değildir; eğitim modeli belirleyici faktördür.',
    },
    {
      soru: "Malta'da dil eğitimi alırken sosyal hayat eğitimi etkiler mi?",
      cevap:
        'Evet. Sosyal hayatın aktif olduğu bölgelerde öğrenciler, sınıf dışında daha fazla İngilizce pratik yapma fırsatı bulur. Ancak aşırı sosyal ortam, disiplinli çalışmayı zorlaştırabilir. Bu denge öğrenci profiline göre değerlendirilmelidir.',
    },
    {
      soru: 'Malta dil okulları uzun dönem eğitim için uygun mu?',
      cevap:
        "Malta'daki birçok dil okulu, uzun dönem öğrenciler için özel programlar ve fiyat avantajları sunar. Uzun dönem eğitim, dilin kalıcı gelişimi açısından genellikle daha verimli sonuçlar sağlar.",
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
            Malta Dil Okulları Hakkında En Çok Sorulan Sorular
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
