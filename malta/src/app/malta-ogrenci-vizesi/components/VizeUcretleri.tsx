import Image from 'next/image';

export default function VizeUcretleri() {
  return (
    <section id="vize-ucretleri" className="bg-slate-50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Malta Öğrenci Vizesi Ücretleri 2026
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            C Tipi ve D Tipi öğrenci vizesi başvuruları için uygulanan resmî ücretler
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Sol Kolon - Görsel */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/malta-ogrenci-vizesi.webp"
                alt="Malta öğrenci vizesi ücretleri 2026 - C Tipi (90 güne kadar) ve D Tipi (105 günden uzun) vize başvuru ücretleri, VFS Global servis bedelleri ve ulusal vize harcı"
                fill
                className="object-cover object-center"
                priority={false}
                loading="lazy"
                sizes="(max-width: 1024px) 0vw, 50vw"
                quality={90}
              />
            </div>
          </div>

          {/* Sağ Kolon - Ücret Kartları */}
          <div className="space-y-6">
            {/* C Tipi Kart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                C Tipi Öğrenci Vizesi Ücreti (90 Güne Kadar)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-700">Vize harç bedeli</span>
                  <span className="text-base font-semibold text-slate-900">90 €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">VFS servis ücreti</span>
                  <span className="text-base font-semibold text-slate-900">30 €</span>
                </div>
              </div>
            </div>

            {/* D Tipi Kart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                D Tipi Öğrenci Vizesi Ücreti (105 Günden Uzun)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-700">Ulusal vize harcı</span>
                  <span className="text-base font-semibold text-slate-900">150 €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">VFS servis bedeli</span>
                  <span className="text-base font-semibold text-slate-900">150 €</span>
                </div>
              </div>
            </div>

            {/* Alt Not */}
            <p className="text-xs leading-relaxed text-slate-600 italic">
              Pasaportun kargo ile gönderilmesini tercih eden başvuru sahipleri için ek gönderim ücreti 12 euro talep edilmektedir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
