import '../css/MaltaKonaklama.css';

export default function MaltaKonaklama() {
  return (
    <main className="malta-konaklama-main">
      <div className="malta-konaklama-container">
        <h1 className="malta-konaklama-title">Malta Konaklama</h1>
        <p className="malta-konaklama-description">
          Malta'da nerede ve nasıl kalacağınızı birlikte planlıyoruz.
        </p>
        <div className="malta-konaklama-options">
          <div className="malta-konaklama-option">
            <h2 className="malta-konaklama-option-title">Aile Yanı</h2>
            <p className="malta-konaklama-option-desc">
              Malta kültürünü yakından tanıma fırsatı sunan aile yanı konaklama seçeneği.
            </p>
          </div>
          <div className="malta-konaklama-option">
            <h2 className="malta-konaklama-option-title">Öğrenci Evi</h2>
            <p className="malta-konaklama-option-desc">
              Bağımsız yaşam isteyen öğrenciler için öğrenci evi seçenekleri.
            </p>
          </div>
          <div className="malta-konaklama-option">
            <h2 className="malta-konaklama-option-title">Yurt</h2>
            <p className="malta-konaklama-option-desc">
              Sosyal ortam arayan öğrenciler için yurt konaklama seçenekleri.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
