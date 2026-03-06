export default function PaymentScheduleSection() {
  return (
    <section
      id="odeme-takvimi"
      aria-label="Malta Dil Okulu Ödeme Takvimi ve İlk Gün Bütçesi 2026"
      className="bg-gradient-to-b from-white to-slate-50/60 border-y border-slate-200"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-slate-900/90" aria-hidden="true" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Malta Dil Okulu Ödeme Takvimi ve İlk Gün Bütçesi (2026)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 speakable-odeme-ozet">
            Malta dil okulu fiyatları sadece <strong>"kurs ücreti"</strong> değildir; <strong>gerçek toplam maliyet</strong>, ne zaman ödeme yaptığın ve
            ilk hafta cebinde ne kadar bütçe olması gerektiği ile netleşir. Bu bölüm, <strong>2026 yılı</strong> için en pratik ödeme
            planını ve başlangıç bütçesini özetler.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <caption className="sr-only">
              Malta Dil Okulu 2026 ödeme takvimi ve başlangıç bütçesi – genel plan
            </caption>
            <thead>
              <tr className="bg-slate-50">
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Ne zaman?
                </th>
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Genelde ödenen
                </th>
                <th
                  scope="col"
                  className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                >
                  Not
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Kayıt / rezervasyon anı
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Kayıt + materyal / depozito (varsa)
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Paketlere göre dahil olabilir; “dahil / hariç” kontrolü şart.
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Başlangıçtan 2–6 hafta önce
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Kalan kurs + konaklama bakiyesi
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Sezon yoğunluğunda (özellikle yaz) kontenjan hızlı dolar; erken netleştirmek avantaj sağlar.
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Varış günü / ilk hafta
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Konaklama depozitosu / ilk hafta giderleri
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Depozito iade koşulu konaklama tipine göre değişebilir.
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/60">
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">Süre uzadıkça</td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Opsiyonel farklar (tek kişilik oda, ensuite, sezon farkı, transfer)
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700">
                  En çok bütçe şaşırtan nokta burasıdır; “başlangıç fiyatı” ile “toplam maliyet” aynı değildir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          <strong>2026 kuralı:</strong> Okullar kurs ücretini çoğunlukla <strong>haftalık</strong> belirler; <strong>1 ay, 12 hafta veya 24 hafta</strong> fiyatları bu
          haftalık ücretlerin toplamından oluşur.
        </p>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-900">İlk Gün / İlk Hafta Bütçesi (2026)</h3>

          <div className="mt-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5">
            <span className="text-sm font-semibold text-slate-900 speakable-ilk-gun-butce">150 – 400 € (yaklaşık)</span>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
              <span>Ulaşım, temel ihtiyaçlar ve ilk gün kurulum harcamaları</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
              <span>Konaklama depozitosu paket fiyatından ayrı olabilir</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
              <span>Yaz dönemi başlangıçları daha yüksek başlangıç temposu gerektirebilir</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
              <span>Bu aralık kişisel harcamalar içindir; paket fiyatından ayrı düşünülmelidir</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

