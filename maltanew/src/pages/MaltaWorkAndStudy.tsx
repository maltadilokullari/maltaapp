import '../css/MaltaWorkAndStudy.css';

export default function MaltaWorkAndStudy() {
  return (
    <main className="malta-work-study-main">
      <div className="malta-work-study-container">
        <h1 className="malta-work-study-title">Malta Work and Study</h1>
        <p className="malta-work-study-description">
          Malta'da eğitim alırken çalışmak mümkün. Ama bu sistem her öğrenci için uygun değil ve çoğu zaman yanlış anlatılıyor.
        </p>
        <div className="malta-work-study-content">
          <div className="malta-work-study-section">
            <h2 className="malta-work-study-section-title">Kimler Çalışabilir?</h2>
            <p className="malta-work-study-section-text">
              Malta'da çalışma izni almak için belirli şartlar vardır. Bu şartları gerçekçi şekilde anlatıyoruz.
            </p>
          </div>
          <div className="malta-work-study-section">
            <h2 className="malta-work-study-section-title">Ne Zaman Çalışılır?</h2>
            <p className="malta-work-study-section-text">
              Çalışma izni almak için belirli bir süre eğitim almanız gerekir. Bu süreç hakkında detaylı bilgi veriyoruz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
