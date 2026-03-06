import { Link } from 'react-router-dom';
import '../css/MaltaDilOkullari.css';

export default function MaltaDilOkullari() {
  return (
    <main className="malta-dil-okullari-main">
      <div className="malta-dil-okullari-container">
        <h1 className="malta-dil-okullari-title">Malta Dil Okulları</h1>
        <p className="malta-dil-okullari-description">
          Malta'daki dil okullarını karşılaştırın ve size en uygun okulu bulun.
        </p>
        <div className="malta-dil-okullari-schools">
          <div className="malta-dil-okullari-school-card">
            <h2 className="malta-dil-okullari-school-name">ESE Malta</h2>
            <p className="malta-dil-okullari-school-desc">St. Julian's bölgesinde modern dil okulu</p>
            <Link to="/malta-dil-okullari/ese-malta" className="malta-dil-okullari-school-link">
              Detaylar →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
