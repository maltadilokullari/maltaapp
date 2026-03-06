export default function PriceIndexSection() {
  return (
    <section
      id="fiyat-endeksi"
      aria-label="Malta Dil Okulu Fiyat Endeksi 2026"
      className="bg-gradient-to-b from-slate-50/60 to-white border-y border-slate-200"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-slate-900/90" aria-hidden="true" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Malta Dil Okulu Fiyat Endeksi (2026) — Referans Seviye
          </h2>
        </header>

        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          <p className="speakable-endeks-giris">
            Malta dil okulu fiyatları <strong>2026 yılında</strong> tek bir "ucuz / pahalı" etiketiyle değerlendirilemez. Bu sayfadaki
            veriler baz alınarak <strong>ortalama paket seviyesi = 100</strong> kabul edilmiştir. Aşağıdaki endeks, seçilen programın bu
            ortalamaya göre daha uygun mu yoksa daha maliyetli mi olduğunu net biçimde gösterir.
          </p>
          <p>
            Bu endeks; <strong>20 ders genel İngilizce programları</strong>, <strong>standart konaklama seçenekleri</strong> ve <strong>2026 yılı güncel fiyat
            aralıkları</strong> baz alınarak oluşturulmuştur. Okul kampanyaları ve bireysel tercihler endeksi aşağı veya yukarı
            çekebilir.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] border-separate border-spacing-0">
            <caption className="sr-only">
              Malta Dil Okulu Fiyat Endeksi 2026 – Program senaryolarına göre referans maliyet seviyesi
            </caption>
            <thead>
              <tr className="bg-slate-50">
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Program Senaryosu
                </th>
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Fiyat Endeksi
                </th>
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Ne Anlama Gelir?
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Düşük sezon + 20 ders + paylaşımlı konaklama
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">90 – 95</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Ortalama altı maliyet, en ekonomik seçeneklerden biri
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Standart paket (referans)
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">100</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Malta genelinde kabul edilen ortalama fiyat seviyesi
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">Yaz sezonu + 20 ders</td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">105 – 110</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Yoğun talep nedeniyle sezon farkı yansır
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Yaz sezonu + 30 ders (yoğun program)
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">110 – 115</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Daha yoğun eğitim ve yaz dönemi birleşimi
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Tek kişilik oda + yaz sezonu
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">120 – 130</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Konfor odaklı, üst seviye bütçe gerektirir
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  24 hafta ve üzeri uzun dönem program
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                  <span className="inline-flex rounded-lg bg-slate-900/5 px-2 py-0.5">95 – 98</span>
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Toplam tutar artsa da aylık maliyet daha avantajlıdır
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Bu endeks, Malta’daki dil okullarının 2026 yılı paket fiyatlarını karşılaştırmalı olarak yorumlamak için
          referans niteliğinde hazırlanmıştır.
        </p>
      </div>
    </section>
  );
}

