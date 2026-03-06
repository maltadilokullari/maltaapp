import Image from 'next/image';
import Link from 'next/link';

export default function WorkStudyCTA() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50/30 to-slate-50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Sol Kolon - Görsel */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto lg:mx-0 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/work-and-study/malta-calisarak-ingilizce-ogrenme.webp"
                alt="Malta'da work and study programı ile çalışarak İngilizce öğrenme"
                fill
                className="object-cover object-center"
                priority={false}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 480px"
                quality={90}
              />
            </div>
          </div>

          {/* Sağ Kolon - İçerik */}
          <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                Malta'da Work & Study Çalışarak İngilizce Öğrenme 2026 Detaylı Bilgi
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Malta'da uzun dönem öğrenci vizesiyle çalışarak İngilizce öğrenme süreci, çalışma izni şartları ve güncel uygulamalar Work & Study sayfamızda detaylı olarak anlatılmaktadır.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/malta-work-and-study"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Malta Work & Study 2026 Rehberini İncele
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
