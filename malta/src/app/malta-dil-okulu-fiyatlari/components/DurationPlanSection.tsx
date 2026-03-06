const cards = [
  {
    title: '1 Ay (4 Hafta)',
    total: '1.350 € – 1.800 €',
    sub: 'Kısa dönem, başlangıç seviyesi',
    desc: 'Genellikle düşük sezon ve paylaşımlı konaklama seçenekleriyle tercih edilir.',
  },
  {
    title: '2 Ay (8 Hafta)',
    total: '2.200 € – 2.900 €',
    sub: 'Aylık ortalama: 1.100 € – 1.450 €',
    desc: 'Uzun dönem indirimlerinin başladığı ilk avantajlı süre.',
  },
  {
    title: '3 Ay (12 Hafta)',
    total: '3.800 € – 4.900 €',
    sub: 'Aylık ortalama: 1.260 € – 1.630 €',
    desc: 'En dengeli maliyet–verim oranına sahip sürelerden biri.',
  },
  {
    title: '6 Ay (24 Hafta)',
    total: '7.000 € – 9.000 €',
    sub: 'Aylık ortalama: 1.160 € – 1.500 €',
    desc: 'Toplam tutar yükselse de aylık bazda en ekonomik seçenek.',
  },
] as const;

function CalendarIcon() {
  return (
    <svg
      className="h-5 w-5 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export default function DurationPlanSection() {
  return (
    <section id="sure-planlama" aria-label="Kaç Ay Planlıyorsun 2026 ortalama paket aralıkları" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-slate-900/90" aria-hidden="true" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Kaç Ay Planlıyorsun? (2026 Ortalama Paket Fiyat Aralıkları)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 speakable-sure-ozet">
            Malta dil okulu fiyatları, <strong>eğitim süresi uzadıkça</strong> haftalık ve aylık ortalama maliyet açısından <strong>daha avantajlı
            hâle gelir</strong>. Aşağıdaki ortalama paket aralıkları, <strong>2026 yılı</strong> için <strong>kurs + konaklama dâhil</strong> genel maliyet
            seviyesini hızlıca görmeni sağlar.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                <CalendarIcon />
              </div>

              <p className="text-lg font-semibold text-slate-900">{card.total}</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{card.sub}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.desc}</p>

              <div
                className="mt-4 h-1 w-10 rounded-full bg-slate-900/10 transition group-hover:bg-slate-900/20"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Bu aralıklar, <strong>20 ders genel İngilizce programları</strong> ve <strong>standart konaklama seçenekleri</strong> baz alınarak hesaplanan
          <strong>2026 yılı ortalama paket fiyatlarını</strong> temsil eder.
        </p>
      </div>
    </section>
  );
}

