import { useState, useEffect } from 'react';
import '../css/KVKK.css';

export default function KVKK() {
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
    <main className="kvkk-main">
      <div className="kvkk-container">
        <h1 className="kvkk-title">KVKK Aydınlatma Metni</h1>
        <p className="kvkk-subtitle">6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında</p>
        <p className="kvkk-update">Son Güncelleme: {lastUpdated}</p>
        <div className="kvkk-content">
          <section className="kvkk-section">
            <h2 className="kvkk-section-title">Aydınlatma Yükümlülüğü</h2>
            <p className="kvkk-section-text">
              <strong>Malta Dil Okulu İngilizce</strong> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu 
              (KVKK) kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesi hakkında sizleri 
              aydınlatma yükümlülüğümüz bulunmaktadır.
            </p>
          </section>
          <section className="kvkk-section">
            <h2 className="kvkk-section-title">Veri Sorumlusu</h2>
            <p className="kvkk-section-text">
              <strong>Veri Sorumlusu:</strong> Malta Dil Okulu İngilizce
            </p>
            <p className="kvkk-section-text">
              <strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com
            </p>
            <p className="kvkk-section-text">
              <strong>İletişim Telefonu:</strong> +90 543 963 24 16
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
