export default function BankaBakiyeGereksinimi() {
  return (
    <section id="banka-bakiye" className="bg-white border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
            Malta Öğrenci Vizesi İçin Bankada Ne Kadar Para Olmalı?
          </h2>

          {/* Kısa ve Net Cevap - Snippet Adayı */}
          <p className="mb-8 text-base leading-relaxed text-slate-700 speakable-banka-bakiye">
            <strong>C Tipi (90 güne kadar) Malta öğrenci vizesi</strong> başvuruları için bankada gösterilmesi gereken tutar, konaklama ödemesinin yapılıp yapılmadığına göre belirlenir. <strong>Konaklama ücreti önceden ödenmişse günlük 18 €</strong>, <strong>konaklama ücreti ödenmemişse günlük 30 €</strong> hesapta bulunmalıdır. Bu tutar, eğitim süresinin tamamını kapsayacak şekilde hesaplanır.
          </p>
        </div>

        {/* Hesaplama Nasıl Yapılır? */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Hesaplama Nasıl Yapılır?
          </h3>
          <p className="text-base leading-relaxed text-slate-700">
            Banka bakiyesi hesaplaması, <strong>günlük tutar × eğitim gün sayısı</strong> formülüyle yapılır. Örneğin, 4 haftalık (28 gün) bir eğitim programı için konaklama ödenmişse <strong>28 × 18 = 504 €</strong>, konaklama ödenmemişse <strong>28 × 30 = 840 €</strong> hesapta bulunmalıdır. Kendi eğitim sürenize göre bu hesaplamayı yapabilirsiniz.
          </p>
        </div>

        {/* Hesaplama Tablosu */}
        <div className="mb-8">
          <p className="mb-4 text-base leading-relaxed text-slate-700">
            Aşağıdaki tabloda, eğitim süresine göre bankada gösterilmesi gereken minimum tutarlar yer almaktadır.
          </p>
          <div className="overflow-x-auto">
            <table id="banka-bakiye-tablosu" className="w-full" itemScope itemType="https://schema.org/Table">
              <caption className="sr-only" itemProp="description">
                Malta öğrenci vizesi için banka bakiyesi gereksinimi - Eğitim süresine ve konaklama ödeme durumuna göre hesaplama tablosu
              </caption>
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Eğitim Süresi
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                    Konaklama Ödenmişse
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                    Konaklama Ödenmemişse
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">4 Hafta (28 gün)</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">504 €</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">840 €</td>
                </tr>
                <tr className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">8 Hafta (56 gün)</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">1.008 €</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">1.680 €</td>
                </tr>
                <tr className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">12 Hafta (84 gün)</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">1.512 €</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">2.520 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Para Nasıl Gösterilmeli? */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Para Nasıl Gösterilmeli?
          </h3>
          <ul className="space-y-3 text-base leading-relaxed text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>Banka dökümü <strong>son 3 aya ait</strong> olmalıdır.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>Banka dökümü <strong>banka tarafından kaşeli ve imzalı</strong> şekilde sunulmalıdır.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>Hesap <strong>başvuru sahibine veya sponsora ait</strong> olabilir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>Okul veya konaklama ödemesi yapıldıysa, bu ödeme <strong>belgeyle gösterilmeli</strong> ve hesap bakiyesi hesaplamasında dikkate alınmalıdır.</span>
            </li>
          </ul>
        </div>

        {/* Sponsorla Başvuru Durumu */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">
            Sponsorla Başvuru Durumu
          </h3>
          <p className="text-base leading-relaxed text-slate-700">
            Malta öğrenci vizesi başvuruları <strong>sponsorla yapılabilir</strong>. Sponsorun masrafları karşıladığını gösteren <strong>resmî taahhüt belgesi</strong> dosyaya eklenmelidir. Sponsorun <strong>banka belgeleri</strong> de başvuru dosyasına eklenir ve sponsorun mali yeterliliği değerlendirilir. Sponsorla başvurularda, sponsorun banka bakiyesinin de eğitim süresiyle uyumlu olması gerekmektedir.
          </p>
        </div>

        {/* Uyarı Kutusu */}
        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-5">
          <p className="text-sm leading-relaxed text-slate-900">
            <strong>Önemli:</strong> Banka bakiyesinde gösterilen tutar, <strong>eğitim süresiyle uyumlu</strong> olmalıdır. Yetersiz veya tutarsız bakiye, vize başvuru sürecini olumsuz etkileyebilir.
          </p>
        </div>
      </div>
    </section>
  );
}
