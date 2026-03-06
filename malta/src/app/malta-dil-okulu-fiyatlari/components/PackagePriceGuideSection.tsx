export default function PackagePriceGuideSection() {
  return (
    <section id="paket-fiyat-rehberi" aria-label="Malta Dil Okulu Paket Fiyatı Nedir ve Neleri Kapsar 2026" className="bg-slate-50/40 border-y border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-6">
          <div className="mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-slate-900 to-slate-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl lg:text-3xl">
            Malta Dil Okulu Paket Fiyatı Nedir ve Neleri Kapsar? (2026)
          </h2>
        </header>

        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Paket fiyatı neyi ifade eder?</h3>
          <p className="text-base leading-relaxed text-slate-700">
            <strong>"Paket fiyat"</strong> çoğu zaman <strong>kurs + konaklama toplamını</strong> anlatır; ancak içerik okuldan okula değişebilir.
            Karşılaştırmada ilk soru şu olmalı: <strong>"Bu fiyata neler dahil?"</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Sol Kolon */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
            <h3 className="mb-4 text-base font-semibold text-slate-900">Genellikle pakete dahil olanlar</h3>
            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
                <span>Kurs ücreti (haftalık ders sayısı belirtilmiş şekilde)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
                <span>Konaklama (oda tipi belirtilmişse)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
                <span>Bazı paketlerde kayıt veya materyal kalemleri</span>
              </li>
            </ul>
          </div>

          {/* Sağ Kolon */}
          <div className="rounded-xl border border-slate-200 bg-blue-50/30 p-5">
            <h3 className="mb-4 text-base font-semibold text-slate-900">Sıkça sonradan eklenen kalemler</h3>
            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-700" />
                <span>Kayıt + materyal (bazı okullarda ayrıca)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-700" />
                <span>Sezon farkı (özellikle yaz dönemi)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-700" />
                <span>Tek kişilik oda / ensuite farkı</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-700" />
                <span>Transfer (opsiyonel)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Blok */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Malta Dil Okulu "Her Şey Dahil" Fiyatlar Ne Anlama Gelir? (2026)
          </h3>
          <p className="text-base leading-relaxed text-slate-700">
            <strong>"Her şey dahil"</strong> ifadesi genellikle <strong>kurs + konaklama</strong> ve bazı paketlerde <strong>kayıt/materyal toplamını</strong> anlatır.
            Ancak <strong>transfer, sezon farkı veya tek kişilik oda/ensuite</strong> gibi kalemler çoğu zaman ayrıca eklenebilir. Bu
            yüzden <strong>"her şey dahil"</strong> gördüğünde, dahil olan kalemleri <strong>tek tek kontrol etmek</strong> gerekir.
          </p>
        </div>
      </div>
    </section>
  );
}
