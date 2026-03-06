'use client';

import { useState } from 'react';

const faqItemsMaltaNerede = [
  {
    question: 'Malta\'da saat kaç?',
    answer: 'Malta, Orta Avrupa Saati (CET) zaman dilimini kullanır. Türkiye\'ye göre kış aylarında 2 saat, yaz aylarında ise 1 saat geridedir.',
  },
  {
    question: 'Malta Türkiye ile aynı saat diliminde mi?',
    answer: 'Hayır. Türkiye UTC+3 saat dilimini yıl boyunca sabit kullanır. Malta ise CET (UTC+1) ve yaz döneminde CEST (UTC+2) saat dilimine geçer.',
  },
  {
    question: 'Malta yaz saati uygulaması var mı?',
    answer: 'Evet. Malta, Mart ayının son Pazar günü yaz saati uygulamasına geçer ve Ekim ayının son Pazar günü yaz saatini sona erdirir.',
  },
  {
    question: 'Malta hangi dili konuşuyor?',
    answer: 'Malta\'nın resmi dilleri Maltaca ve İngilizce\'dir.',
  },
  {
    question: 'Malta\'da İngilizce konuşuluyor mu?',
    answer: 'Evet. İngilizce, Malta\'nın resmi dillerinden biridir ve ülkede yaygın olarak kullanılır.',
  },
  {
    question: 'Malta küçük bir ülke mi?',
    answer: 'Evet. Malta, yüzölçümü ve nüfus açısından Avrupa\'nın en küçük ülkelerinden biridir.',
  },
  {
    question: 'Malta Akdeniz ülkesi mi?',
    answer: 'Evet. Malta, Akdeniz\'de yer alan bir ada ülkesidir.',
  },
  {
    question: 'Malta Schengen ülkesi mi?',
    answer: 'Evet. Malta, Schengen Bölgesi\'ne dahil bir ülkedir.',
  },
  {
    question: 'Malta Avrupa Birliği üyesi mi?',
    answer: 'Evet. Malta, 2004 yılından beri Avrupa Birliği üyesidir.',
  },
  {
    question: 'Malta güvenli bir ülke mi?',
    answer: 'Evet. Malta, düşük suç oranlarına sahip olup Avrupa\'nın güvenli ülkeleri arasında yer alır.',
  },
  {
    question: 'Malta\'da kaç ada var?',
    answer: 'Malta, üç ana adadan oluşur: Malta, Gozo ve Comino.',
  },
  {
    question: 'Malta\'nın başkenti neresidir?',
    answer: 'Malta\'nın başkenti Valletta\'dır.',
  },
  {
    question: 'Malta\'nın para birimi nedir?',
    answer: 'Malta\'nın resmi para birimi Euro (€)\'dur.',
  },
  {
    question: 'Malta euro kullanıyor mu?',
    answer: 'Evet. Malta\'da Euro kullanılmaktadır.',
  },
  {
    question: 'Malta hangi kıtada yer alır?',
    answer: 'Malta, Avrupa kıtasında yer alır.',
  },
  {
    question: 'Malta Güney Avrupa\'da mı?',
    answer: 'Evet. Malta, Güney Avrupa ülkeleri arasında kabul edilir.',
  },
  {
    question: 'Malta İtalya\'ya yakın mı?',
    answer: 'Evet. Malta, İtalya\'nın Sicilya Adası\'nın yaklaşık 90 km güneyinde yer alır.',
  },
  {
    question: 'Malta Türkiye\'ye uzak mı?',
    answer: 'Türkiye ile Malta arasındaki kuş uçuşu mesafe yaklaşık 1.400–1.600 km\'dir.',
  },
  {
    question: 'Malta bir ada ülkesi mi?',
    answer: 'Evet. Malta, tamamen adalardan oluşan bir ada ülkesidir.',
  },
  {
    question: 'Malta\'da trafik hangi yönden akar?',
    answer: 'Malta\'da trafik soldan akar.',
  },
];

const faqItemsHavalimaniTransfer = [
  {
    question: 'Uçağım gecikirse okul transferi beni yine karşılar mı?',
    answer: 'Evet. Transfer hizmeti uçuş bilgilerine göre planlandığı için, uçuş gecikmeleri takip edilir ve öğrenci Malta Uluslararası Havalimanı\'nda varış saatine göre karşılanır.',
  },
  {
    question: 'Gece veya çok erken saatlerde transfer oluyor mu?',
    answer: 'Evet. Malta dil okulları tarafından organize edilen transfer hizmeti, gece geç saatler ve sabah erken varışlar dahil olmak üzere günün her saatinde yapılabilmektedir.',
  },
  {
    question: 'Havalimanında beni tam olarak nerede karşılayacaklar?',
    answer: 'Karşılama yöntemi okula göre değişir. Bazı okullarda transfer yetkilisi isim yazılı bir kartla terminal çıkışında beklerken, bazı okullarda öğrenci okulun belirttiği karşılama noktasına veya transfer ofisine yönlendirilir. Detaylar seyahat öncesinde paylaşılır.',
  },
  {
    question: 'Transfer ücreti kişi başı mı yoksa araç başı mı?',
    answer: 'Çoğu Malta dil okulunda transfer ücreti kişi başı olarak belirlenir. Ancak bazı özel transferlerde veya aynı uçuşla gelen öğrenciler için araç bazlı uygulamalar olabilir.',
  },
  {
    question: 'Okul transferini almazsam sonradan ekletebilir miyim?',
    answer: 'Evet. Uçuş bilgileri zamanında paylaşılması şartıyla, çoğu okulda transfer hizmeti sonradan eklenebilir. Ancak yoğun sezonlarda müsaitlik sınırlı olabileceği için önceden planlanması önerilir.',
  },
];

const faqItemsHazirlik = [
  {
    question: 'Malta\'ya dil okulu için giderken havalimanında zor soru sorulur mu?',
    answer: 'Hayır. Malta\'ya dil eğitimi için giden öğrenciler genellikle kısa ve basit sorularla karşılaşır. Kaç hafta kalacağınız, hangi okula gittiğiniz ve nerede konaklayacağınız sorulabilir; süreç genelde birkaç dakika sürer.',
  },
  {
    question: 'Malta\'ya giderken tüm belgelerin çıktısını almak zorunda mıyım?',
    answer: 'Zorunlu değildir. Belgelerin telefonunuzda PDF olarak bulunması çoğu zaman yeterlidir. Ancak ilk kez yurt dışına çıkan öğrenciler için okul kabul belgesi ve konaklama bilgisinin çıktısını almak rahatlatıcı olabilir.',
  },
  {
    question: 'Malta\'ya girişte yanımda ne kadar nakit para olmalı?',
    answer: 'Belirli bir zorunlu tutar yoktur. Çoğu öğrenci ilk gün için küçük bir nakit miktarı ve banka kartı ile rahatça giriş yapar. Günlük harcamalar Malta\'da kartla kolayca yapılabilir.',
  },
  {
    question: 'Malta\'da telefon hattım çalışır mı, sim kart almam gerekir mi?',
    answer: 'Türkiye\'den gelen telefon hatları Malta\'da roaming ile çalışır. Ancak uzun süre kalacak öğrenciler genellikle ilk günlerde yerel sim kart veya eSIM almayı tercih eder.',
  },
  {
    question: 'Malta\'ya indiğim gün okula gitmek zorunda mıyım?',
    answer: 'Hayır. Çoğu dil okulunda ilk gün oryantasyon ve seviye belirleme farklı bir gün yapılır. Varış günü genellikle yerleşme ve dinlenme için ayrılır.',
  },
  {
    question: 'Malta\'da ilk gün konaklamada ne yapmam beklenir?',
    answer: 'İlk gün genelde oda yerleşimi yapılır, temel bilgiler verilir ve ev veya rezidans kuralları kısaca anlatılır. Detaylı bilgilendirme çoğu zaman yazılı olarak da paylaşılır.',
  },
  {
    question: 'Havalimanı transferi almamak sorun yaratır mı?',
    answer: 'Hayır. Transfer zorunlu değildir. Ancak Malta\'ya ilk kez gelen öğrenciler için okul tarafından organize edilen transfer, ilk gün stresi yaşamamak açısından daha rahat bir seçenektir.',
  },
  {
    question: 'Malta\'ya giderken büyük valiz sorun olur mu?',
    answer: 'Hayır. Malta Havalimanı küçük ve düzenli olduğu için valizle ilerlemek zor değildir. Yine de ilk gün için küçük bir sırt çantası taşımak öğrencilerin işini kolaylaştırır.',
  },
];

const faqItemsVize = [
  {
    question: 'Malta Vize İstiyor mu? (2026)',
    answer: 'Evet. 2026 yılı itibarıyla Türkiye Cumhuriyeti vatandaşlarının Malta\'ya seyahat edebilmesi için vize alması gerekmektedir. Malta, Schengen Bölgesi\'nde yer aldığı için vize uygulaması pasaport türüne göre değişir.',
  },
  {
    question: 'Malta İçin Vize Gerekli mi? (Türkiye – 2026)',
    answer: 'Evet. Bordo (umuma mahsus) pasaport sahipleri için Malta vizesi zorunludur. Yeşil pasaport sahipleri ise kısa süreli seyahatlerde vizeden muaftır.',
  },
  {
    question: 'Malta Adası Vize İstiyor mu?',
    answer: 'Evet. Malta Adası, Schengen Bölgesi\'nde bulunduğundan Türkiye\'den giden bordo pasaport sahiplerinden vize ister. Vize muafiyeti yalnızca belirli pasaport türleri için geçerlidir.',
  },
  {
    question: 'Malta Yeşil Pasaporta Vize İstiyor mu? (2026)',
    answer: 'Hayır. Yeşil (hususi) pasaport sahipleri, 2026 yılında Malta\'ya 180 gün içinde 90 günü aşmamak şartıyla vizesiz seyahat edebilir.',
  },
  {
    question: 'Malta Bordo Pasaporta Vize İstiyor mu? (2026)',
    answer: 'Evet. Bordo pasaport sahiplerinin Malta\'ya giriş yapabilmesi için Schengen vizesi alması zorunludur.',
  },
  {
    question: 'Malta\'ya Vize Var mı?',
    answer: 'Evet. Malta\'ya seyahat etmek isteyen Türkiye Cumhuriyeti vatandaşları için Schengen vizesi ve uzun süreli ulusal vize seçenekleri bulunmaktadır.',
  },
  {
    question: 'Malta Hangi Vizeyi İstiyor?',
    answer: 'Malta, seyahat süresine ve amacına göre: 90 güne kadar olan seyahatlerde Schengen (C tipi) vize, 90 günü aşan eğitim, çalışma ve ikametlerde ulusal (D tipi) vize uygular.',
  },
  {
    question: 'Malta\'ya Nasıl Gidilir, Vize Gerekir mi?',
    answer: 'Türkiye\'den Malta\'ya gitmek için: Bordo pasaport sahiplerinin vize alması gerekir. Yeşil pasaport sahipleri kısa süreli seyahatlerde vizeden muaftır.',
  },
  {
    question: 'Malta İçin Hangi Vize Alınır?',
    answer: 'Turistik, ziyaret ve kısa süreli seyahatler için Schengen vizesi. Dil eğitimi, work and study ve uzun süreli programlar için ulusal (D tipi) vize alınır.',
  },
  {
    question: 'Malta Vizesi Kaç Gün Verilir?',
    answer: 'Malta Schengen vizesi, 180 gün içinde en fazla 90 gün kalış hakkı sağlar. Verilen süre, başvurunun içeriğine ve seyahat planına göre değişebilir.',
  },
  {
    question: 'Malta\'ya Vizesiz Kaç Gün Gidilebilir?',
    answer: 'Yeşil pasaport sahipleri, Malta\'da 180 gün içinde en fazla 90 gün vizesiz kalabilir. Bordo pasaport sahipleri için vizesiz giriş hakkı yoktur.',
  },
];

interface FAQSectionProps {
  slug?: string;
}

export default function FAQSection({ slug }: FAQSectionProps) {
  const [acikIndex, setAcikIndex] = useState<number | null>(null);
  
  const faqItems = slug === 'malta-vize-istiyor-mu' 
    ? faqItemsVize 
    : slug === 'malta-dil-okullari-havalimani-transfer'
    ? faqItemsHavalimaniTransfer
    : slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? faqItemsHazirlik
    : faqItemsMaltaNerede;
  const title = slug === 'malta-vize-istiyor-mu' 
    ? 'Malta Vizesi Hakkında Türkiye\'den En Sık Sorulan Sorular (2026)'
    : slug === 'malta-dil-okullari-havalimani-transfer'
    ? 'Malta Havalimanı Transferi Hakkında Sık Sorulan Sorular (2026)'
    : slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? 'Malta Dil Okulu Hazırlık: Sık Sorulan Sorular (2026)'
    : 'Malta Hakkında Türkiye\'den Sık Sorulan Sorular 2026';
  const sectionId = slug === 'malta-vize-istiyor-mu' 
    ? 'malta-vize-faq' 
    : slug === 'malta-dil-okullari-havalimani-transfer'
    ? 'malta-havalimani-transfer-faq'
    : slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? 'malta-hazirlik-faq'
    : 'malta-nerede-faq';

  return (
    <section className="bg-slate-50 py-12" id={sectionId} itemScope itemType="https://schema.org/FAQPage">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
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
