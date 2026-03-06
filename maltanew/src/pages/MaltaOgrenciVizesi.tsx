import '../css/MaltaOgrenciVizesi.css';

export default function MaltaOgrenciVizesi() {
  return (
    <main className="malta-vize-main">
      <div className="malta-vize-container">
        <h1 className="malta-vize-title">Malta Öğrenci Vizesi</h1>
        <p className="malta-vize-description">
          Malta öğrenci vizesi sürecinde yanınızdayız. Tüm adımları sakin ve net şekilde anlatıyoruz.
        </p>
        <div className="malta-vize-steps">
          <div className="malta-vize-step">
            <div className="malta-vize-step-number">1</div>
            <h2 className="malta-vize-step-title">Belgelerin Hazırlanması</h2>
            <p className="malta-vize-step-desc">
              Gerekli tüm belgeleri birlikte hazırlıyoruz.
            </p>
          </div>
          <div className="malta-vize-step">
            <div className="malta-vize-step-number">2</div>
            <h2 className="malta-vize-step-title">Başvuru Süreci</h2>
            <p className="malta-vize-step-desc">
              Başvuru adımlarını birlikte takip ediyoruz.
            </p>
          </div>
          <div className="malta-vize-step">
            <div className="malta-vize-step-number">3</div>
            <h2 className="malta-vize-step-title">Vize Sonucu</h2>
            <p className="malta-vize-step-desc">
              Vize sonucunu birlikte değerlendiriyoruz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
