const guideCards = [
  {
    question: 'Malta dil okulu ücretleri kime ödenir?',
    answer:
      'Ödemeler doğrudan dil okuluna yapılır. Ön kayıt ücretleri genellikle kredi kartı ile, kalan kurs ve konaklama bedelleri ise okulun resmi banka hesabına havale yoluyla ödenir. Danışmanlık hizmetleri için öğrenciden ek bir ücret talep edilmez.',
  },
  {
    question: 'Danışmanlık, okul seçimi ve vize süreci ücretli mi?',
    answer:
      'Okul seçimi, kayıt işlemleri ve vize başvuru sürecinde sağlanan danışmanlık hizmetleri ücretsizdir. Öğrenci yalnızca okulun belirlediği resmi eğitim ve konaklama ücretlerini öder.',
  },
  {
    question: 'Ödeme tek seferde mi yapılır, taksit imkânı var mı?',
    answer:
      'Ödeme çoğunlukla tek seferde yapılır. Bunun temel nedeni, Malta vize başvurularında eğitim ve konaklama ücretlerinin ödendiğini gösteren resmi dekontun talep edilmesidir.',
  },
  {
    question: 'Konaklama depozitosu nedir, ne zaman iade edilir?',
    answer:
      'Konaklama için genellikle yaklaşık <strong>100 € depozito</strong> alınır. Bu bedel, olası hasarlara karşı teminat niteliğindedir ve konaklamadan ayrılırken herhangi bir sorun yoksa <strong>iade edilir</strong>.',
  },
  {
    question: 'Kitap ve materyal ücretleri pakete dâhil mi?',
    answer:
      '<strong>İlk seviye ders kitabı</strong> ve temel materyaller çoğu pakete dâhildir. Seviye atlandığında yeni kitaplar için ortalama <strong>40 € ek ücret</strong> talep edilebilir.',
  },
  {
    question: 'Eğitim süresi uzadıkça fiyatlar neden daha avantajlı olur?',
    answer:
      'Okullar, uzun dönem kayıtları teşvik etmek amacıyla <strong>12 hafta</strong> ve özellikle <strong>24 hafta üzeri</strong> programlarda haftalık kurs ücretlerini daha uygun seviyelerde sunar. Bu nedenle uzun süreli eğitimlerde <strong>aylık ortalama maliyet düşer</strong>.',
  },
  {
    question: 'Yaz sezonunda fiyatlar neden artar?',
    answer:
      '<strong>Yaz aylarında</strong> talep arttığı için kurs ve konaklama fiyatları yükselir. Ancak birçok okul, <strong>12 hafta ve üzeri</strong> uzun dönem programlarda <strong>yaz sezonu farkını uygulamayabilir</strong>.',
  },
  {
    question: 'Havalimanı transfer ücreti ne kadardır?',
    answer:
      'Havalimanı transferi genellikle gidiş–dönüş toplam <strong>50 €</strong> civarındadır. Transfer çoğu pakette <strong>opsiyonel</strong> bir hizmettir.',
  },
  {
    question: 'Vize reddi durumunda ödenen ücretler iade edilir mi?',
    answer:
      '<strong>Vize reddi durumunda</strong>, ön kayıt ücreti hariç olmak üzere okula ödenen eğitim ve konaklama bedelleri <strong>iade edilir</strong>. İade süreci genellikle <strong>2–4 hafta</strong> içinde tamamlanır.',
  },
  {
    question: 'Vize ve resmi masraflar toplamda ne kadar tutar?',
    answer:
      'Malta vize masrafları <strong>2026 yılı</strong> için genellikle <strong>150 – 200 €</strong> aralığındadır. Buna ek olarak <strong>VFS Global hizmet bedeli</strong> olarak ortalama <strong>50 €</strong> alınır.',
  },
] as const;

function QuestionIcon() {
  return (
    <svg
      className="h-5 w-5 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
      />
    </svg>
  );
}

export default function PaymentGuideSection() {
  return (
    <section id="odeme-rehberi" aria-label="Malta Dil Okulu Gerçek Ödeme İade ve Gizli Masraflar Rehberi 2026" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <header className="mb-6">
          <div className="mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-slate-900 to-slate-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl lg:text-3xl">
            Malta Dil Okulu Gerçek Ödeme, İade ve Gizli Masraflar Rehberi (2026)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Malta dil okulu fiyatları yalnızca <strong>kurs ücretinden</strong> ibaret değildir. <strong>Gerçek toplam maliyet</strong>; ödemenin kime
            yapıldığı, hangi kalemlerin pakete dâhil olduğu ve <strong>iade ile depozito süreçlerinin</strong> nasıl işlediği bilinmeden
            doğru değerlendirilemez. Aşağıdaki rehber, <strong>2026 yılı</strong> için uygulanan ödeme ve iade süreçlerini net biçimde
            açıklar.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {guideCards.map((card, index) => (
            <article
              key={index}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <QuestionIcon />
                </div>
                <h3 className="text-base font-semibold leading-snug text-slate-900">{card.question}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: card.answer }} />
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-600">
          Bu rehber, 2026 yılı için Malta'daki dil okullarında en sık karşılaşılan ödeme ve iade uygulamalarını şeffaf
          biçimde özetlemek amacıyla hazırlanmıştır.
        </p>
      </div>
    </section>
  );
}
