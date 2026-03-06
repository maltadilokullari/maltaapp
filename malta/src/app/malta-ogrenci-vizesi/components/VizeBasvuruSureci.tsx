'use client';

import { useState } from 'react';

type VizeTipi = 'c' | 'd';

const vizeTipleri = {
  c: {
    baslik: 'C Tipi Malta Öğrenci Vizesi (90 Güne Kadar)',
    sure: '90 güne kadar eğitim programları',
    basvuruKanal: 'VFS Global',
    sonucSuresi: '2–4 hafta',
  },
  d: {
    baslik: 'D Tipi Malta Öğrenci Vizesi (105 Günden Uzun)',
    sure: '105 günden fazla eğitim programları',
    basvuruKanal: 'Identity Malta',
    sonucSuresi: '4–8 hafta',
  },
};

const adimlar = {
  c: [
    {
      baslik: 'Belgelerin hazırlanması',
      aciklama: 'C tipi Malta öğrenci vizesi için başvuru dosyası eksiksiz ve birbiriyle tutarlı şekilde hazırlanmalıdır.',
      checklist: [
        'Pasaport, seyahat bitiş tarihinden sonra geçerli olmalı ve yıpranmamış olmalıdır.',
        'Dil okulu kabul mektubunda eğitim başlangıç ve bitiş tarihleri, kurs süresi ve okul bilgileri yer almalıdır.',
        'Konaklama belgesi, eğitim süresinin tamamını kapsamalıdır.',
        'Banka dökümü son 3 aya ait olmalı, banka tarafından kaşeli ve imzalı şekilde sunulmalıdır.',
        'Seyahat sağlık sigortası, Malta ve Schengen bölgesinde geçerli olmalı ve eğitim süresini kapsamalıdır.',
        'Gerekli durumlarda sponsor evrakları ve ek belgeler dosyaya eklenir.',
      ],
    },
    {
      baslik: 'VFS Global randevusunun alınması',
      aciklama: '90 güne kadar olan Malta öğrenci vizesi başvuruları VFS Global üzerinden yapılır.',
      checklist: [
        'Randevu işlemi online sistem üzerinden gerçekleştirilir.',
        'Resmî başvuru ve randevu adresi: https://visa.vfsglobal.com/tur/tr/mlt',
        'Uygun randevu tarihi seçilir ve randevu onayı alınır.',
        'Yoğun dönemlerde randevu tarihleri ileri bir tarihe verilebilir.',
      ],
    },
    {
      baslik: 'Başvuru formunun doldurulması',
      aciklama: 'Vize başvuru formu eksiksiz ve doğru bilgilerle doldurulmalıdır.',
      checklist: [
        'Kişisel bilgiler pasaportla birebir uyumlu olmalıdır.',
        'Eğitim bilgileri, kurs süresi ve okul adı doğru şekilde girilmelidir.',
        'Konaklama adresi ve iletişim bilgileri eksiksiz yazılmalıdır.',
        'Finansal bilgiler doğru ve tutarlı şekilde beyan edilmelidir.',
        'Yanlış veya eksik bilgi verilmesi başvurunun olumsuz sonuçlanmasına neden olabilir.',
      ],
    },
    {
      baslik: 'Belgelerin teslimi ve biyometri işlemleri',
      aciklama: 'Randevu gününde başvuru merkezi ziyaret edilerek işlemler tamamlanır.',
      checklist: [
        'Tüm belgeler fiziki olarak teslim edilir.',
        'Parmak izi ve biyometrik işlemler gerçekleştirilir.',
        'Vize ve hizmet ücretleri bu aşamada tamamlanır.',
        'Eksik evrak olması durumunda başvuru süreci uzayabilir.',
      ],
    },
    {
      baslik: 'Başvurunun değerlendirilmesi',
      aciklama: 'Başvuru dosyası Malta makamları tarafından incelenir.',
      checklist: [
        'Belgelerin uygunluğu ve tutarlılığı kontrol edilir.',
        'Eğitim süresi ve finansal yeterlilik değerlendirilir.',
        'Gerekli görülmesi halinde ek belge talep edilebilir.',
        'Değerlendirme süreci birkaç hafta sürebilir.',
      ],
    },
    {
      baslik: 'Vize sonucunun açıklanması ve pasaport teslimi',
      aciklama: 'Başvurunun değerlendirilmesi tamamlandıktan sonra vize sonucu açıklanır.',
      checklist: [
        'Başvuru sonucu başvuru sistemi üzerinden bildirilir.',
        'Vize onaylandığında pasaport teslim alınır.',
        'Pasaport, başvuru merkezinden şahsen veya kargo ile teslim edilebilir.',
        'Vize reddi durumunda gerekçe yazılı olarak iletilir.',
        'Ret halinde gerekli düzeltmeler yapılarak yeniden başvuru yapılabilir.',
      ],
    },
  ],
  d: [
    {
      baslik: 'Eğitim planının netleştirilmesi',
      aciklama: 'D tipi Malta öğrenci vizesi, 105 günden uzun süren eğitim programları için geçerlidir ve başvuru öncesinde eğitim planının net olması gerekir.',
      checklist: [
        'Eğitim süresi en az 105 günü aşmalıdır.',
        'Dil okulu kabul mektubunda eğitim başlangıç ve bitiş tarihleri açıkça belirtilmelidir.',
        'Kurs süresi, haftalık ders saati ve program bilgileri belgelerde yer almalıdır.',
        'Eğitim süresi ile vize talebi birbiriyle uyumlu olmalıdır.',
      ],
    },
    {
      baslik: 'Belgelerin hazırlanması',
      aciklama: 'Uzun dönem öğrenci vizesi için başvuru dosyası eksiksiz ve detaylı şekilde hazırlanır.',
      checklist: [
        'Pasaport, seyahat bitiş tarihinden sonra geçerli olmalıdır.',
        'Dil okulu kabul mektubu ve ödeme bilgileri dosyaya eklenmelidir.',
        'Konaklama belgesi, uzun dönem kalışı kapsayacak şekilde sunulmalıdır.',
        'Banka dökümü, uzun dönem eğitim ve yaşam masraflarını karşılayacak düzeyde olmalıdır.',
        'Seyahat sağlık sigortası, uzun dönem kalış süresini kapsamalıdır.',
        'Gerekli durumlarda sponsor evrakları ve ek belgeler hazırlanır.',
      ],
    },
    {
      baslik: 'Başvuru formunun doldurulması',
      aciklama: 'D tipi öğrenci vizesi başvuru formu eksiksiz ve doğru bilgilerle doldurulmalıdır.',
      checklist: [
        'Kişisel bilgiler pasaport ile birebir uyumlu olmalıdır.',
        'Eğitim ve konaklama bilgileri detaylı şekilde girilmelidir.',
        'Finansal durum bilgileri doğru ve tutarlı şekilde beyan edilmelidir.',
        'Eksik veya yanlış bilgi verilmesi başvurunun uzamasına veya olumsuz sonuçlanmasına neden olabilir.',
      ],
    },
    {
      baslik: 'Başvurunun yapılması',
      aciklama: 'D tipi Malta öğrenci vizesi başvuruları ilgili uzun dönem başvuru sistemi üzerinden gerçekleştirilir.',
      checklist: [
        'Gerekli belgeler başvuru sistemine yüklenir.',
        'Başvuru ücretleri bu aşamada tamamlanır.',
        'Belgelerin eksiksiz yüklenmesi sürecin sağlıklı ilerlemesi için önemlidir.',
        'Başvuru tamamlandıktan sonra değerlendirme süreci başlar.',
      ],
    },
    {
      baslik: 'Başvurunun değerlendirilmesi',
      aciklama: 'Başvuru dosyası Malta makamları tarafından detaylı olarak incelenir.',
      checklist: [
        'Eğitim süresi ve eğitim planı değerlendirilir.',
        'Finansal yeterlilik ve kalış amacının tutarlılığı kontrol edilir.',
        'Gerekli görülmesi halinde ek belge talep edilebilir.',
        'Değerlendirme süreci uzun dönem başvurularda birkaç ay sürebilir.',
      ],
    },
    {
      baslik: 'Vize sonucu ve Malta\'ya giriş süreci',
      aciklama: 'Başvurunun sonuçlanmasının ardından vize ile ilgili işlemler tamamlanır.',
      checklist: [
        'Vize onaylandığında başvuru sahibine bilgi verilir.',
        'Malta\'ya giriş yapıldıktan sonra gerekli kayıt ve oturum işlemleri tamamlanır.',
        'Uzun dönem kalış süresi boyunca vize ve oturum şartlarına uyulmalıdır.',
        'Eğitim süresi sona erdiğinde vize süresi aşılmamalıdır.',
      ],
    },
  ],
};

export default function VizeBasvuruSureci() {
  const [seciliTip, setSeciliTip] = useState<VizeTipi>('c');

  return (
    <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Vize Türü Seçimi */}
        <div className="mb-12" id="vize-turleri" itemScope itemType="https://schema.org/ItemList">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl" itemProp="name">
            Malta Öğrenci Vizesi Türleri
          </h2>
          <p className="mb-6 text-base leading-relaxed text-slate-700" itemProp="description">
            Eğitim süresine göre <strong>C Tipi (90 güne kadar)</strong> ve <strong>D Tipi (105 günden uzun)</strong> öğrenci vizesi seçenekleri
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* C Tipi Kart */}
            <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <button
              onClick={() => setSeciliTip('c')}
              className={`group relative rounded-xl border-2 p-6 text-left transition-all ${
                seciliTip === 'c'
                  ? 'border-slate-900 bg-slate-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
              aria-pressed={seciliTip === 'c'}
              aria-label="C Tipi Malta Öğrenci Vizesi (90 Güne Kadar) seçeneği"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    seciliTip === 'c'
                      ? 'border-slate-900 bg-slate-900'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {seciliTip === 'c' && (
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900" itemProp="name">
                  {vizeTipleri.c.baslik}
                </h3>
                <meta itemProp="position" content="1" />
              </div>
              <div className="space-y-2 text-sm text-slate-700" itemProp="description">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Eğitim süresi:</span>
                  <span>{vizeTipleri.c.sure}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Başvuru kanalı:</span>
                  <span>{vizeTipleri.c.basvuruKanal}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Ortalama sonuç süresi:</span>
                  <span>{vizeTipleri.c.sonucSuresi}</span>
                </div>
              </div>
              </button>
            </div>

            {/* D Tipi Kart */}
            <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <button
                onClick={() => setSeciliTip('d')}
                className={`group relative w-full rounded-xl border-2 p-6 text-left transition-all ${
                  seciliTip === 'd'
                    ? 'border-slate-900 bg-slate-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
                aria-pressed={seciliTip === 'd'}
                aria-label="D Tipi Malta Öğrenci Vizesi (105 Günden Uzun) seçeneği"
                itemProp="item"
              >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    seciliTip === 'd'
                      ? 'border-slate-900 bg-slate-900'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {seciliTip === 'd' && (
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900" itemProp="name">
                  {vizeTipleri.d.baslik}
                </h3>
                <meta itemProp="position" content="2" />
              </div>
              <div className="space-y-2 text-sm text-slate-700" itemProp="description">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Eğitim süresi:</span>
                  <span>{vizeTipleri.d.sure}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Başvuru kanalı:</span>
                  <span>{vizeTipleri.d.basvuruKanal}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-900">Ortalama sonuç süresi:</span>
                  <span>{vizeTipleri.d.sonucSuresi}</span>
                </div>
              </div>
              </button>
            </div>
          </div>
        </div>

        {/* Başvuru Süreci */}
        <div>
          <h2 id="basvuru-sureci" className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Malta Öğrenci Vizesi Başvuru Süreci (Adım Adım)
          </h2>
          <p className="mb-4 text-base leading-relaxed text-slate-700">
            C Tipi ve D Tipi öğrenci vizesi başvuruları için izlenmesi gereken adımlar
          </p>

          <p className="mb-8 text-base leading-relaxed text-slate-700">
            <strong>
              {seciliTip === 'c'
                ? 'C Tipi (90 güne kadar) başvuruları VFS Global üzerinden,'
                : '105+ gün eğitim programları için uzun dönem başvurular Identity Malta üzerinden'}
            </strong>{' '}
            {seciliTip === 'c'
              ? 'yürütülür.'
              : 'yürütülür.'}
          </p>

          {/* Stepper */}
          <div className="relative">
            {/* Dikey çizgi (sadece desktop'ta görünür) */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-slate-200 md:block" />

            <div className="space-y-8">
              {adimlar[seciliTip].map((adim, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Numara daire */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-white text-sm font-semibold text-slate-900 md:h-10 md:w-10 md:text-base">
                    {index + 1}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 pb-8">
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {adim.baslik}
                    </h3>
                    <p className="mb-4 text-base leading-relaxed text-slate-700">
                      {adim.aciklama}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {adim.checklist.map((madde, maddeIndex) => {
                        // Önemli kelimeleri ve terimleri bold yap
                        let boldMadde = madde;
                        
                        // C Tipi için özel bold yapıları
                        if (seciliTip === 'c') {
                          boldMadde = boldMadde
                            .replace(/(Pasaport)(, seyahat bitiş tarihinden sonra geçerli olmalı ve yıpranmamış olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Dil okulu kabul mektubunda)( eğitim başlangıç ve bitiş tarihleri, kurs süresi ve okul bilgileri yer almalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Konaklama belgesi)(, eğitim süresinin tamamını kapsamalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Banka dökümü)( son 3 aya ait olmalı, banka tarafından )(kaşeli ve imzalı)( şekilde sunulmalıdır\.)/g, '<strong>$1</strong>$2<strong>$3</strong>$4')
                            .replace(/(Seyahat sağlık sigortası)(, Malta ve Schengen bölgesinde geçerli olmalı ve eğitim süresini kapsamalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Gerekli durumlarda )(sponsor evrakları ve ek belgeler)( dosyaya eklenir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Randevu işlemi)( online sistem üzerinden gerçekleştirilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Resmî başvuru ve randevu adresi: )(https:\/\/visa\.vfsglobal\.com\/tur\/tr\/mlt)/g, '<strong>$1</strong>$2')
                            .replace(/(Uygun randevu tarihi)( seçilir ve )(randevu onayı)( alınır\.)/g, '<strong>$1</strong>$2<strong>$3</strong>$4')
                            .replace(/(Yoğun dönemlerde )(randevu tarihleri)( ileri bir tarihe verilebilir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Kişisel bilgiler)( pasaportla birebir uyumlu olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eğitim bilgileri, kurs süresi ve okul adı)( doğru şekilde girilmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Konaklama adresi ve iletişim bilgileri)( eksiksiz yazılmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Finansal bilgiler)( doğru ve tutarlı şekilde beyan edilmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Yanlış veya eksik bilgi)( verilmesi başvurunun olumsuz sonuçlanmasına neden olabilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Tüm belgeler)( fiziki olarak teslim edilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Parmak izi ve biyometrik işlemler)( gerçekleştirilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Vize ve hizmet ücretleri)( bu aşamada tamamlanır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eksik evrak)( olması durumunda başvuru süreci uzayabilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Belgelerin uygunluğu ve tutarlılığı)( kontrol edilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eğitim süresi ve finansal yeterlilik)( değerlendirilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Gerekli görülmesi halinde )(ek belge)( talep edilebilir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Değerlendirme süreci)( birkaç hafta sürebilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Başvuru sonucu)( başvuru sistemi üzerinden bildirilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Vize onaylandığında)( pasaport teslim alınır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Pasaport, başvuru merkezinden )(şahsen veya kargo ile)( teslim edilebilir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Vize reddi durumunda )(gerekçe)( yazılı olarak iletilir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Ret halinde gerekli düzeltmeler yapılarak )(yeniden başvuru)( yapılabilir\.)/g, '$1<strong>$2</strong>$3');
                        }
                        
                        // D Tipi için özel bold yapıları
                        if (seciliTip === 'd') {
                          boldMadde = boldMadde
                            .replace(/(Eğitim süresi)( en az 105 günü aşmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Dil okulu kabul mektubunda)( eğitim başlangıç ve bitiş tarihleri açıkça belirtilmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Kurs süresi, haftalık ders saati ve program bilgileri)( belgelerde yer almalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eğitim süresi ile vize talebi)( birbiriyle uyumlu olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Pasaport)(, seyahat bitiş tarihinden sonra geçerli olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Dil okulu kabul mektubu ve ödeme bilgileri)( dosyaya eklenmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Konaklama belgesi)(, uzun dönem kalışı kapsayacak şekilde sunulmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Banka dökümü)(, uzun dönem eğitim ve yaşam masraflarını karşılayacak düzeyde olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Seyahat sağlık sigortası)(, uzun dönem kalış süresini kapsamalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Gerekli durumlarda )(sponsor evrakları ve ek belgeler)( hazırlanır\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Kişisel bilgiler)( pasaport ile birebir uyumlu olmalıdır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eğitim ve konaklama bilgileri)( detaylı şekilde girilmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Finansal durum bilgileri)( doğru ve tutarlı şekilde beyan edilmelidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Eksik veya yanlış bilgi)( verilmesi başvurunun uzamasına veya olumsuz sonuçlanmasına neden olabilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Gerekli belgeler)( başvuru sistemine yüklenir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Başvuru ücretleri)( bu aşamada tamamlanır\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Belgelerin eksiksiz yüklenmesi)( sürecin sağlıklı ilerlemesi için önemlidir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Başvuru tamamlandıktan sonra )(değerlendirme süreci)( başlar\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Eğitim süresi ve eğitim planı)( değerlendirilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Finansal yeterlilik ve kalış amacının tutarlılığı)( kontrol edilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Gerekli görülmesi halinde )(ek belge)( talep edilebilir\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Değerlendirme süreci)( uzun dönem başvurularda birkaç ay sürebilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Vize onaylandığında)( başvuru sahibine bilgi verilir\.)/g, '<strong>$1</strong>$2')
                            .replace(/(Malta'ya giriş yapıldıktan sonra )(gerekli kayıt ve oturum işlemleri)( tamamlanır\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Uzun dönem kalış süresi boyunca )(vize ve oturum şartlarına)( uyulmalıdır\.)/g, '$1<strong>$2</strong>$3')
                            .replace(/(Eğitim süresi sona erdiğinde )(vize süresi)( aşılmamalıdır\.)/g, '$1<strong>$2</strong>$3');
                        }
                        
                        return (
                          <li key={maddeIndex} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                            <span dangerouslySetInnerHTML={{ __html: boldMadde }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
