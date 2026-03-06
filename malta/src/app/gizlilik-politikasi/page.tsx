'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

export default function GizlilikPolitikasiPage() {
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
        '@id': 'https://maltadilokuluingilizce.com/gizlilik-politikasi/#webpage',
        url: 'https://maltadilokuluingilizce.com/gizlilik-politikasi',
        name: 'Gizlilik Politikası | Malta Dil Okulu İngilizce',
        description: 'Malta dil okulları danışmanlık hizmetlerimiz kapsamında toplanan kişisel verilerin korunması, işlenmesi ve saklanması hakkında detaylı gizlilik politikası.',
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
              name: 'Hangi kişisel veriler toplanıyor?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ad, soyad, telefon numarası, e-posta adresi, eğitim süresi tercihi ve başvuru zamanı bilgileri toplanmaktadır. Bu veriler sadece Malta dil okulu danışmanlık hizmetlerimizi sunmak için kullanılmaktadır.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kişisel veriler ne kadar süre saklanıyor?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kişisel veriler, hizmet sunumu süresince ve yasal saklama yükümlülükleri kapsamında saklanmaktadır. Hizmet sonlandıktan sonra, yasal saklama süreleri dolana kadar güvenli şekilde saklanır.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kişisel veriler üçüncü taraflarla paylaşılıyor mu?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kişisel veriler sadece Malta dil okulları ile başvuru sürecini yürütmek için gerekli durumlarda paylaşılmaktadır. Verileriniz hiçbir şekilde pazarlama veya ticari amaçlarla üçüncü taraflarla paylaşılmamaktadır.',
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
          contactType: 'Privacy Policy Inquiries',
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
              Gizlilik Politikası
            </h1>
            <p className="text-lg text-slate-600">
              Son Güncelleme: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Gizliliğinize Verdiğimiz Önem
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Malta Dil Okulu İngilizce</strong> olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz. 
              2016 yılından bu yana Malta'da faaliyet gösteren ekibimiz, kişisel verilerinizin güvenliği ve gizliliği 
              konusunda en yüksek standartları uygulamaktadır.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Bu gizlilik politikası, <strong>maltadilokuluingilizce.com</strong> web sitesi üzerinden toplanan 
              kişisel verilerin nasıl işlendiği, korunduğu ve kullanıldığı hakkında sizleri bilgilendirmek amacıyla hazırlanmıştır.
            </p>
          </div>

          {/* Data Controller */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Veri Sorumlusu
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Veri Sorumlusu:</strong> Malta Dil Okulu İngilizce
              </p>
              <p>
                <strong>Web Sitesi:</strong> https://maltadilokuluingilizce.com
              </p>
              <p>
                <strong>İletişim:</strong> +90 543 963 24 16
              </p>
              <p>
                <strong>Konum:</strong> Malta (2016'dan beri faaliyet gösteren yerel ekip)
              </p>
              <p className="mt-4 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                <strong>Uzmanlık:</strong> Malta'da 8 yıldır yaşayan ekibimiz, Malta dil okulları, öğrenci vizesi 
                ve konaklama konularında derin deneyime sahiptir. Bu deneyim, verilerinizin doğru ve güvenli 
                şekilde işlenmesini sağlamaktadır.
              </p>
            </div>
          </div>

          {/* Collected Data */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Toplanan Kişisel Veriler
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Malta dil okulu danışmanlık hizmetlerimizi sunabilmek için aşağıdaki kişisel verileri topluyoruz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası</li>
                <li><strong>Eğitim Tercihleri:</strong> Eğitim süresi (1 ay, 3 ay, 6 ay vb.), başvuru zamanı</li>
                <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı bilgileri, cookie verileri (analitik amaçlı)</li>
              </ul>
              <p className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <strong>Önemli:</strong> Tüm veriler, Malta dil okulu başvuru sürecinizi yürütmek ve size en uygun 
                okul seçeneklerini sunmak için toplanmaktadır. Hiçbir veri pazarlama veya ticari amaçlarla kullanılmamaktadır.
              </p>
            </div>
          </div>

          {/* Purpose of Processing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Veri İşleme Amaçları
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Malta dil okulu danışmanlık hizmetlerinin sunulması</li>
                <li>Size en uygun okul ve program seçeneklerinin belirlenmesi</li>
                <li>Başvuru sürecinin yürütülmesi ve takibi</li>
                <li>Vize danışmanlığı hizmetlerinin sağlanması</li>
                <li>Konaklama seçeneklerinin değerlendirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Web sitesi analitiği ve kullanıcı deneyimi iyileştirmesi (anonim veriler)</li>
              </ul>
            </div>
          </div>

          {/* Legal Basis */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Hukuki Dayanak
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>Kişisel verilerin işlenmesi aşağıdaki hukuki dayanaklara dayanmaktadır:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>KVKK Madde 5/2-c:</strong> Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması</li>
                <li><strong>KVKK Madde 5/2-f:</strong> Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için işlemenin zorunlu olması</li>
                <li><strong>Açık Rıza:</strong> Form gönderimlerinde sağlanan açık rıza</li>
              </ul>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Verilerin Paylaşımı
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verileriniz, Malta dil okulu başvuru sürecinizi yürütmek için aşağıdaki durumlarda paylaşılabilir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Malta Dil Okulları:</strong> Başvuru sürecinizi yürütmek için seçtiğiniz okul ile gerekli bilgiler paylaşılır</li>
                <li><strong>Vize Danışmanlık Hizmetleri:</strong> Vize başvuru süreciniz için gerekli durumlarda yetkili kurumlarla paylaşılır</li>
                <li><strong>Yasal Yükümlülükler:</strong> Yasal zorunluluklar gereği yetkili kurumlarla paylaşılabilir</li>
              </ul>
              <p className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                <strong>Garanti:</strong> Verileriniz hiçbir şekilde pazarlama, reklam veya ticari amaçlarla üçüncü taraflarla paylaşılmamaktadır.
              </p>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Veri Güvenliği
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari önlemler alınmıştır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS şifreleme ile güvenli veri aktarımı</li>
                <li>Güvenli sunucu altyapısı ve düzenli yedekleme</li>
                <li>Erişim kontrolü ve yetkilendirme mekanizmaları</li>
                <li>Düzenli güvenlik güncellemeleri ve izleme</li>
                <li>Personel eğitimi ve gizlilik farkındalığı</li>
              </ul>
              <p className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <strong>Güvenilirlik:</strong> 2016'dan beri Malta'da faaliyet gösteren ekibimiz, veri güvenliği 
                konusunda sürekli eğitim almakta ve en güncel güvenlik standartlarını uygulamaktadır.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Veri Saklama Süresi
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Kişisel verileriniz, aşağıdaki süreler boyunca saklanmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Aktif Hizmet Süresi:</strong> Danışmanlık hizmeti süresince</li>
                <li><strong>Yasal Saklama:</strong> Türk Ticaret Kanunu ve ilgili mevzuat gereği 10 yıl</li>
                <li><strong>KVKK Saklama:</strong> İlgili mevzuat gereği gerekli süre boyunca</li>
              </ul>
              <p className="mt-4">
                Saklama süresi sona erdiğinde, kişisel verileriniz güvenli şekilde silinmekte veya anonim hale getirilmektedir.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Haklarınız
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Bilgi Alma Hakkı:</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li><strong>Erişim Hakkı:</strong> İşlenen kişisel verilerinize erişim talep etme</li>
                <li><strong>Düzeltme Hakkı:</strong> Yanlış veya eksik verilerin düzeltilmesini talep etme</li>
                <li><strong>Silme Hakkı:</strong> Belirli şartlar altında verilerinizin silinmesini talep etme</li>
                <li><strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz etme</li>
                <li><strong>Veri Taşınabilirliği:</strong> Verilerinizi başka bir hizmet sağlayıcıya aktarma</li>
              </ul>
              <p className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                <strong>Başvuru:</strong> Haklarınızı kullanmak için <strong>+90 543 963 24 16</strong> numaralı telefondan 
                veya <strong>maltadilokuluingilizce.com</strong> web sitesi üzerinden bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Çerezler (Cookies)
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Web sitemiz, kullanıcı deneyimini iyileştirmek ve site analitiği için çerezler kullanmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Zorunlu Çerezler:</strong> Web sitesinin çalışması için gerekli çerezler</li>
                <li><strong>Analitik Çerezler:</strong> Site kullanım istatistikleri için anonim veriler</li>
                <li><strong>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerini hatırlama</li>
              </ul>
              <p className="mt-4">
                Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. Ancak bazı çerezlerin devre dışı bırakılması 
                web sitesinin bazı özelliklerinin çalışmamasına neden olabilir.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. İletişim
            </h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Gizlilik politikamız hakkında sorularınız veya kişisel verilerinizle ilgili talepleriniz için:
              </p>
              <div className="p-4 bg-slate-50 rounded-lg">
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
                Bu gizlilik politikası, yasal değişiklikler veya hizmet geliştirmeleri nedeniyle güncellenebilir. 
                Önemli değişiklikler durumunda, web sitesi üzerinden sizleri bilgilendireceğiz.
              </p>
              <p>
                <strong>Son Güncelleme Tarihi:</strong> {lastUpdated}
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Güvenilirlik ve Deneyim
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">8 Yıllık Deneyim</h3>
                <p className="text-sm">Malta'da 2016'dan beri faaliyet gösteren ekibimiz, binlerce öğrenciye hizmet vermiştir.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Yerel Uzmanlık</h3>
                <p className="text-sm">Malta'da yaşayan ekibimiz, dil okulları, vize ve konaklama konularında derin bilgiye sahiptir.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Şeffaflık</h3>
                <p className="text-sm">Tüm veri işleme süreçlerimiz şeffaf ve yasal mevzuata uygun şekilde yürütülmektedir.</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">Güvenlik</h3>
                <p className="text-sm">Kişisel verileriniz en yüksek güvenlik standartları ile korunmaktadır.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
