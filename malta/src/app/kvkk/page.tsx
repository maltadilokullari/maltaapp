'use client';

import { useState, useEffect } from 'react';

export default function KVKKPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');

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
    
    const isoDate = istanbulDate.toISOString().split('T')[0];
    setDateModified(isoDate);
  }, []);

  const datePublished = '2026-01-15';

  // Structured Data - E-E-A-T optimized
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/kvkk/#webpage',
        url: 'https://maltadilokuluingilizce.com/kvkk',
        name: 'KVKK Aydınlatma Metni | Malta Dil Okulu İngilizce',
        description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında Malta dil okulu danışmanlık hizmetlerimiz için aydınlatma metni ve kişisel veri işleme bilgilendirmesi.',
        datePublished: datePublished,
        dateModified: dateModified,
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntity: {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'KVKK kapsamında hangi haklarım var?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'KVKK kapsamında bilgi alma, erişim, düzeltme, silme, itiraz ve veri taşınabilirliği haklarınıza sahipsiniz. Bu hakları kullanmak için +90 543 963 24 16 numaralı telefondan veya web sitemiz üzerinden bizimle iletişime geçebilirsiniz.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kişisel verilerim neden toplanıyor?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kişisel verileriniz, Malta dil okulu danışmanlık hizmetlerimizi sunmak, size en uygun okul seçeneklerini belirlemek, başvuru sürecini yürütmek ve vize danışmanlığı sağlamak amacıyla toplanmaktadır.',
              },
            },
            {
              '@type': 'Question',
              name: 'Verilerim güvende mi?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Evet. Kişisel verileriniz SSL/TLS şifreleme, güvenli sunucu altyapısı, erişim kontrolü ve düzenli güvenlik güncellemeleri ile korunmaktadır. 2016\'dan beri Malta\'da faaliyet gösteren ekibimiz, veri güvenliği konusunda sürekli eğitim almaktadır.',
              },
            },
          ],
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://maltadilokuluingilizce.com/#organization',
        name: 'Malta Dil Okulu İngilizce',
        url: 'https://maltadilokuluingilizce.com',
        foundingDate: '2016',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MT',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+905439632416',
          contactType: 'KVKK Inquiries',
          availableLanguage: ['tr', 'en'],
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <main className="pt-20 pb-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-lg text-slate-600 mb-2">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
            </p>
            <p className="text-sm text-slate-500">
              Son Güncelleme: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Aydınlatma Yükümlülüğü
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Malta Dil Okulu İngilizce</strong> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu 
              (KVKK) kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesi hakkında sizleri 
              aydınlatma yükümlülüğümüz bulunmaktadır.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Bu aydınlatma metni, <strong>maltadilokuluingilizce.com</strong> web sitesi üzerinden toplanan 
              kişisel verilerinizin işlenme amacı, hukuki dayanağı, saklama süresi ve haklarınız hakkında 
              bilgilendirme yapmak amacıyla hazırlanmıştır.
            </p>
          </div>

          {/* Data Controller */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Veri Sorumlusu
            </h2>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Veri Sorumlusu:</strong> Malta Dil Okulu İngilizce
              </p>
              <p>
                <strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com
              </p>
              <p>
                <strong>İletişim Telefonu:</strong> +90 543 963 24 16
              </p>
              <p>
                <strong>Faaliyet Bölgesi:</strong> Malta (2016'dan beri yerel ekip)
              </p>
              <p className="mt-4 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <strong>Otorite ve Deneyim:</strong> Malta'da 8 yıldır yaşayan ekibimiz, Malta dil okulları, 
                öğrenci vizesi ve konaklama konularında uzmanlaşmıştır. Bu uzmanlık, KVKK uyumlu veri işleme 
                süreçlerimizin temelini oluşturmaktadır.
              </p>
            </div>
          </div>

          {/* Processed Data */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. İşlenen Kişisel Veriler
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Malta dil okulu danışmanlık hizmetlerimiz kapsamında aşağıdaki kişisel veriler işlenmektedir:
              </p>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">2.1. Kimlik Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ad</li>
                  <li>Soyad</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">2.2. İletişim Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>E-posta adresi</li>
                  <li>Telefon numarası</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">2.3. Eğitim Tercih Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Eğitim süresi tercihi (1 ay, 3 ay, 6 ay vb.)</li>
                  <li>Başvuru zamanı tercihi</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">2.4. İşlem Güvenliği Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP adresi</li>
                  <li>Tarayıcı bilgileri</li>
                  <li>Cookie verileri (analitik amaçlı, anonim)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processing Purpose */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Kişisel Verilerin İşlenme Amacı
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Toplanan kişisel verileriniz, aşağıdaki amaçlarla KVKK'nın 5. ve 6. maddelerinde belirtilen 
                şartlar çerçevesinde işlenmektedir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Malta dil okulu danışmanlık hizmetlerinin sunulması</li>
                <li>Size en uygun okul ve program seçeneklerinin belirlenmesi ve önerilmesi</li>
                <li>Başvuru sürecinin yürütülmesi, takibi ve sonuçlandırılması</li>
                <li>Vize danışmanlığı hizmetlerinin sağlanması</li>
                <li>Konaklama seçeneklerinin değerlendirilmesi ve önerilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Hizmet kalitesinin artırılması ve kullanıcı deneyiminin iyileştirilmesi</li>
                <li>Web sitesi analitiği ve istatistiksel değerlendirmeler (anonim veriler)</li>
              </ul>
            </div>
          </div>

          {/* Legal Basis */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verilerinizin işlenmesi, KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki 
                sebeplere dayanmaktadır:
              </p>
              
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-bold mb-2">KVKK Madde 5/2-c:</p>
                <p>
                  Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin 
                  taraflarına ait kişisel verilerin işlenmesinin gerekli olması
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-bold mb-2">KVKK Madde 5/2-f:</p>
                <p>
                  Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için işlemenin zorunlu olması
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-bold mb-2">KVKK Madde 5/2-e:</p>
                <p>
                  İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun 
                  meşru menfaatleri için veri işlemenin zorunlu olması
                </p>
              </div>

              <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-bold mb-2">Açık Rıza:</p>
                <p>
                  Form gönderimlerinde sağlanan açık rıza (KVKK Madde 5/2-a)
                </p>
              </div>
            </div>
          </div>

          {/* Data Transfer */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Kişisel Verilerin Aktarılması
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verileriniz, hizmet sunumu kapsamında aşağıdaki durumlarda aktarılabilir:
              </p>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">5.1. Malta Dil Okulları</h3>
                <p className="ml-4">
                  Başvuru sürecinizi yürütmek için seçtiğiniz Malta dil okulu ile gerekli bilgiler 
                  (ad, soyad, iletişim bilgileri, eğitim tercihleri) paylaşılır.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">5.2. Vize Danışmanlık Hizmetleri</h3>
                <p className="ml-4">
                  Vize başvuru süreciniz için gerekli durumlarda, yetkili vize danışmanlık firmaları 
                  ile sınırlı bilgiler paylaşılır.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-lg mb-2">5.3. Yasal Yükümlülükler</h3>
                <p className="ml-4">
                  Yasal zorunluluklar gereği (mahkeme kararı, yasal düzenlemeler vb.) yetkili kurum 
                  ve kuruluşlarla paylaşılabilir.
                </p>
              </div>

              <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                <p className="font-bold mb-2">Önemli Garanti:</p>
                <p>
                  Kişisel verileriniz, hiçbir şekilde pazarlama, reklam, ticari amaçlarla veya 
                  KVKK'ya aykırı şekilde üçüncü taraflarla paylaşılmamaktadır.
                </p>
              </div>
            </div>
          </div>

          {/* Data Collection Method */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Kişisel Verilerin Toplanma Yöntemi
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verileriniz, aşağıdaki yöntemlerle toplanmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Web Sitesi Formları:</strong> Anasayfa ve iletişim sayfasındaki başvuru formları</li>
                <li><strong>Otomatik Yöntemler:</strong> IP adresi, cookie verileri, tarayıcı bilgileri</li>
                <li><strong>İletişim Kanalları:</strong> Telefon, e-posta iletişimleri</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Kişisel Verilerin Saklanma Süresi
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verileriniz, aşağıdaki süreler boyunca saklanmaktadır:
              </p>
              
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="font-bold mb-2">Aktif Hizmet Süresi:</p>
                <p>Danışmanlık hizmeti süresince ve hizmet sonlandıktan sonra 1 yıl</p>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="font-bold mb-2">Yasal Saklama Süresi:</p>
                <p>
                  Türk Ticaret Kanunu ve ilgili mevzuat gereği <strong>10 yıl</strong> (muhasebe kayıtları)
                </p>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="font-bold mb-2">KVKK Saklama Süresi:</p>
                <p>
                  İlgili mevzuat gereği gerekli süre boyunca (veri işleme amacı ortadan kalktığında silinir)
                </p>
              </div>

              <p className="mt-4">
                Saklama süresi sona erdiğinde, kişisel verileriniz KVKK'nın 7. maddesi gereği güvenli 
                şekilde silinmekte, yok edilmekte veya anonim hale getirilmektedir.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. İlgili Kişi Olarak Haklarınız (KVKK Madde 11)
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                KVKK'nın 11. maddesi uyarınca, aşağıdaki haklara sahipsiniz:
              </p>
              
              <div className="mt-4 space-y-3">
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">a) Bilgi Alma Hakkı</p>
                  <p className="text-sm">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">b) Erişim Hakkı</p>
                  <p className="text-sm">İşlenen kişisel verilerinize erişim talep etme</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">c) Düzeltme Hakkı</p>
                  <p className="text-sm">Yanlış veya eksik verilerin düzeltilmesini talep etme</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">d) Silme Hakkı</p>
                  <p className="text-sm">Belirli şartlar altında verilerinizin silinmesini talep etme</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">e) İtiraz Hakkı</p>
                  <p className="text-sm">Veri işlemeye itiraz etme</p>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <p className="font-bold mb-1">f) Veri Taşınabilirliği Hakkı</p>
                  <p className="text-sm">Verilerinizi başka bir hizmet sağlayıcıya aktarma</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <p className="font-bold mb-2">Haklarınızı Kullanma:</p>
                <p className="mb-2">
                  Haklarınızı kullanmak için aşağıdaki yöntemlerle bizimle iletişime geçebilirsiniz:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Telefon:</strong> +90 543 963 24 16</li>
                  <li><strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com</li>
                  <li><strong>İletişim Sayfası:</strong> <a href="/iletisim" className="text-emerald-600 hover:underline">/iletisim</a></li>
                </ul>
                <p className="mt-2 text-sm">
                  Başvurularınız, KVKK'nın 13. maddesi gereği en geç <strong>30 gün</strong> içinde 
                  sonuçlandırılacaktır.
                </p>
              </div>
            </div>
          </div>

          {/* Complaint Right */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Şikayet Hakkı
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verilerinizin işlenmesi ile ilgili haklarınızın ihlal edildiğini düşünüyorsanız, 
                KVKK'nın 14. maddesi gereği Kişisel Verileri Koruma Kurulu'na şikayet başvurusunda bulunabilirsiniz.
              </p>
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-bold mb-2">Kişisel Verileri Koruma Kurulu:</p>
                <p className="text-sm">
                  <strong>Adres:</strong> Nasuh Akar Mahallesi 1407. Sokak No:4 06520 Balgat/Çankaya/Ankara<br />
                  <strong>Web:</strong> www.kvkk.gov.tr<br />
                  <strong>E-posta:</strong> kvkk@kvkk.gov.tr
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. İletişim
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                KVKK kapsamındaki sorularınız, talepleriniz veya başvurularınız için:
              </p>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p><strong>Veri Sorumlusu:</strong> Malta Dil Okulu İngilizce</p>
                <p><strong>Telefon:</strong> +90 543 963 24 16</p>
                <p><strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com</p>
                <p><strong>İletişim Sayfası:</strong> <a href="/iletisim" className="text-emerald-600 hover:underline">/iletisim</a></p>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Güncellemeler
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Bu KVKK aydınlatma metni, yasal değişiklikler, hizmet geliştirmeleri veya KVKK Kurulu 
                kararları nedeniyle güncellenebilir. Önemli değişiklikler durumunda, web sitesi üzerinden 
                sizleri bilgilendireceğiz.
              </p>
              <p>
                <strong>Son Güncelleme Tarihi:</strong> {lastUpdated}
              </p>
            </div>
          </div>

          {/* Trust Signals - E-E-A-T */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Güvenilirlik ve Uyum
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">KVKK Uyumluluğu</h3>
                <p className="text-sm">Tüm veri işleme süreçlerimiz 6698 sayılı KVKK'ya tam uyumlu şekilde yürütülmektedir.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Şeffaflık</h3>
                <p className="text-sm">Veri işleme süreçlerimiz tam şeffaflık ilkesi ile yürütülmekte, tüm bilgiler açıkça paylaşılmaktadır.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Güvenlik</h3>
                <p className="text-sm">Kişisel verileriniz en yüksek güvenlik standartları ile korunmakta, düzenli güvenlik denetimleri yapılmaktadır.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Uzmanlık</h3>
                <p className="text-sm">Malta'da 8 yıldır faaliyet gösteren ekibimiz, veri koruma konusunda sürekli eğitim almaktadır.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
