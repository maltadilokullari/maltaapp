import Link from 'next/link';

export default function VizeReddiNedenleri() {
  const reddiNedenleri = [
    {
      baslik: 'Eksik veya Yanlış Banka Dökümü',
      aciklama:
        'Yetersiz bakiye, düzensiz hesap hareketleri veya eğitim süresiyle uyumsuz banka dökümleri, vize başvurusunun olumsuz değerlendirilmesine neden olabilir.',
    },
    {
      baslik: 'Konaklama Belgesinin Uygunsuz Olması',
      aciklama:
        'Konaklama belgesinin doğrulanabilir olmaması ya da eğitim süresini kapsamaması, başvurunun reddedilmesine yol açabilir.',
    },
    {
      baslik: 'Dil Okulu Kabul Mektubunda Hata',
      aciklama:
        'Kabul mektubundaki tarih, süre veya format hataları, başvurunun tutarsız görülmesine neden olabilir.',
    },
    {
      baslik: 'Uçuş veya Sigorta Belgelerinin Eksikliği',
      aciklama:
        'Uçuş rezervasyonu veya seyahat sağlık sigortasının eksik ya da eğitim süresiyle uyumsuz olması, ret sebepleri arasında yer alır.',
    },
    {
      baslik: 'Başvuru Formunun Yanlış Doldurulması',
      aciklama:
        'Başvuru formundaki küçük bilgi hataları veya çelişkili beyanlar, dosyanın olumsuz değerlendirilmesine neden olabilir.',
    },
    {
      baslik: 'Evraklar Arasında Tutarsızlık',
      aciklama:
        'Sunulan belgeler arasında tarih, süre veya başvuru amacı uyumsuzluğu, vize memurunun başvuruya şüpheyle yaklaşmasına yol açabilir.',
    },
    {
      baslik: 'Taahhütname Hataları ve Tarih Uyumsuzluğu',
      aciklama:
        'Taahhütnamedeki en ufak bir içerik hatası veya tarih uyuşmazlığı, vizenin beklenenden kısa süreli verilmesine veya doğrudan vize reddine neden olabilir.',
    },
  ];

  return (
    <section id="reddi-nedenleri" className="bg-slate-50/50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
            Malta Öğrenci Vizesi Neden Reddedilir?
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            Malta öğrenci vizesi başvurularında ret kararları, çoğunlukla başvuru dosyasındaki eksik, hatalı veya tutarsız bilgilerden kaynaklanır. Aşağıda en sık karşılaşılan vize reddi nedenleri yer almaktadır.
          </p>
        </div>

        {/* Kartlar */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reddiNedenleri.map((neden, index) => (
            <div
              key={index}
              className="rounded-xl border border-amber-200 bg-amber-50/30 p-5 shadow-sm transition-all hover:shadow-md hover:border-amber-300"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="text-2xl shrink-0">⚠️</span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {neden.baslik}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 pl-9">
                {neden.aciklama}
              </p>
            </div>
          ))}
        </div>

        {/* Uyarı Kutusu */}
        <div className="mb-8 rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-5">
          <p className="text-sm leading-relaxed text-slate-900">
            <strong>Önemli:</strong> Vize başvurularında ret kararlarının büyük bir kısmı, başvuru dosyasındaki küçük ama kritik hatalardan kaynaklanır. Belgelerin birbiriyle uyumlu ve eksiksiz hazırlanması, ret riskini önemli ölçüde azaltır.
          </p>
        </div>

        {/* Yumuşak CTA */}
        <div className="text-center space-y-4">
          <p className="text-base leading-relaxed text-slate-700">
            Vize başvuru sürecinde belgelerin doğru hazırlanması, başvurunun sağlıklı ilerlemesi açısından önemlidir. Süreç hakkında bilgi almak isteyen adaylar bizimle iletişime geçebilir.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://wa.me/35699143066"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Vize Başvurusu Hakkında Bilgi Al
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
