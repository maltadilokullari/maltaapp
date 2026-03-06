import '../css/MaltaYazOkullari.css';

export default function MaltaYazOkullari() {
  return (
    <main className="malta-yaz-okullari-main">
      <div className="malta-yaz-okullari-container">
        <h1 className="malta-yaz-okullari-title">Malta Yaz Okulları</h1>
        <p className="malta-yaz-okullari-description">
          Malta'da yaz döneminde dil eğitimi almak isteyen öğrenciler için özel programlar.
        </p>
        <div className="malta-yaz-okullari-programs">
          <div className="malta-yaz-okullari-program">
            <h2 className="malta-yaz-okullari-program-title">Junior Programlar</h2>
            <p className="malta-yaz-okullari-program-desc">
              8-17 yaş arası öğrenciler için özel yaz okulu programları.
            </p>
          </div>
          <div className="malta-yaz-okullari-program">
            <h2 className="malta-yaz-okullari-program-title">Teen Programlar</h2>
            <p className="malta-yaz-okullari-program-desc">
              13-17 yaş arası gençler için yaz dönemi dil eğitimi.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
