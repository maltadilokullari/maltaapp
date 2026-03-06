import { useState, useEffect } from 'react';
import '../css/GizlilikPolitikasi.css';

export default function GizlilikPolitikasi() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ];
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);
  }, []);

  return (
    <main className="gizlilik-main">
      <div className="gizlilik-container">
        <h1 className="gizlilik-title">Gizlilik Politikası</h1>
        <p className="gizlilik-update">Son Güncelleme: {lastUpdated}</p>
        <div className="gizlilik-content">
          <section className="gizlilik-section">
            <h2 className="gizlilik-section-title">Gizliliğinize Verdiğimiz Önem</h2>
            <p className="gizlilik-section-text">
              <strong>Malta Dil Okulu İngilizce</strong> olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz.
            </p>
          </section>
          <section className="gizlilik-section">
            <h2 className="gizlilik-section-title">Veri Sorumlusu</h2>
            <p className="gizlilik-section-text">
              <strong>Veri Sorumlusu:</strong> Malta Dil Okulu İngilizce
            </p>
            <p className="gizlilik-section-text">
              <strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com
            </p>
            <p className="gizlilik-section-text">
              <strong>İletişim:</strong> +90 543 963 24 16
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
