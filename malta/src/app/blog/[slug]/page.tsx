import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockPosts, BlogPost } from '@/lib/blog/mockPosts';
import PostMeta from '@/components/blog/PostMeta';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Badge from '@/components/ui/Badge';
import WhatsAppButton from './WhatsAppButton';
import FAQSection from './FAQSection';
import VisaFreeDaysSection from './VisaFreeDaysSection';
import Schengen90180RuleSection from './Schengen90180RuleSection';
import type { Metadata } from 'next';

// Hero content data
const heroContent: Record<string, {
  introText: React.ReactNode;
  infoBox: {
    title: string;
    icon: React.ReactNode;
    items: Array<{ label: string; value: string }>;
    note?: string;
  };
}> = {
  'malta-nerede': {
    introText: (
      <>
        <p>
          Malta, <strong>Akdeniz'in ortasında</strong> yer alan ve <strong>Güney Avrupa'da bulunan</strong> bağımsız bir ada ülkesidir. Coğrafi olarak <strong>İtalya'nın Sicilya Adası'nın yaklaşık 90 kilometre güneyinde</strong> bulunur ve <strong>Avrupa Birliği üyesidir</strong>.
        </p>
        <p>
          Malta tek bir adadan oluşmaz; <strong>Malta, Gozo ve Comino</strong> adalarından oluşan bir takım adalar ülkesidir. Ülkenin başkenti <strong>Valletta</strong>'dır.
        </p>
      </>
    ),
    infoBox: {
      title: 'Malta Nerede?',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        { label: 'Kıta', value: 'Avrupa' },
        { label: 'Deniz', value: 'Akdeniz' },
        { label: 'Yakın Ülke', value: 'İtalya (Sicilya)' },
        { label: 'Ülke Türü', value: 'Bağımsız ada ülkesi' },
        { label: 'Avrupa Birliği', value: 'Üye' },
        { label: 'Başkent', value: 'Valletta' },
        { label: 'Ada Sayısı', value: '3 (Malta, Gozo, Comino)' },
      ],
    },
  },
  'malta-vize-istiyor-mu': {
    introText: (
      <>
        <p>
          <strong>Malta vize istiyor mu?</strong>
        </p>
        <p>
          Evet, 2026 yılı itibarıyla Malta'ya seyahat etmek isteyen <strong>Türkiye Cumhuriyeti vatandaşları için vize gerekliliği</strong> bulunmaktadır. Malta, <strong>Schengen Bölgesi'nde yer aldığı için</strong> vize uygulaması pasaport türüne göre farklılık gösterir.
        </p>
        <p>
          <strong>Bordo (umuma mahsus) pasaport</strong> sahipleri Malta'ya girişte vize almak zorundadır. <strong>Yeşil (hususi) pasaport</strong> sahipleri ise 90 güne kadar olan kısa süreli seyahatlerde vizeden muaftır. Ancak uzun süreli kalış veya çalışma gibi durumlarda pasaport türü fark etmeksizin Malta vizesi gerekmektedir.
        </p>
      </>
    ),
    infoBox: {
      title: 'Malta Vize Bilgileri (Türkiye – 2026)',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        { label: 'Malta vize istiyor mu?', value: 'Evet, Türkiye Cumhuriyeti vatandaşları için vize gereklidir.' },
        { label: 'Malta Schengen ülkesi mi?', value: 'Evet, Malta Schengen Bölgesi\'ndedir.' },
        { label: 'Bordo pasaportla Malta\'ya gidilir mi?', value: 'Evet, ancak vize alınması zorunludur.' },
        { label: 'Yeşil pasaport Malta için vize istiyor mu?', value: 'Hayır, 90 güne kadar olan kısa süreli seyahatlerde vize gerekmez.' },
        { label: 'Malta\'ya vizesiz kaç gün gidilebilir?', value: 'Yeşil pasaportla 180 gün içinde en fazla 90 gün.' },
        { label: 'Dil eğitimi için Malta vizesi gerekir mi?', value: 'Evet, öğrenci vizesi gereklidir.' },
        { label: 'Uzun süre Malta\'da kalmak için ne gerekir?', value: 'Uzun süreli (ulusal) vize alınmalıdır.' },
      ],
    },
  },
  'malta-dil-okullari-havalimani-transfer': {
    introText: (
      <>
        <p>
          Malta'da <strong>dil okullarında eğitim alacak öğrencilerimiz</strong> için <strong>havaalanı transfer ve karşılama organizasyonlarını biz ayarlıyoruz</strong>. <strong>Malta Uluslararası Havalimanı'na (MLA) varışta</strong>, öğrenciler dilerse <strong>okul tarafından görevlendirilen bir transfer yetkilisi</strong> tarafından karşılanarak <strong>doğrudan konaklamalarına güvenli şekilde ulaştırılır</strong>. Özellikle <strong>Malta'ya ilk kez giden öğrenciler</strong> için bu hizmet, sürecin <strong>stressiz ve kontrollü ilerlemesini</strong> sağlar.
        </p>
        <p>
          Alternatif olarak <strong>öğrencilerimiz</strong>, Malta'da <strong>otobüs veya taksi seçeneklerini</strong> kullanarak da konaklamalarına ulaşabilir. Ancak <strong>Malta dil okulları tarafından organize edilen transfer hizmeti</strong>, <strong>uçuş bilgilerinin önceden paylaşılması</strong>, <strong>doğrudan karşılama ve konaklamaya bırakma avantajı</strong> sayesinde <strong>en çok tercih edilen yöntemdir</strong>. <strong>Gidiş–dönüş transfer ücretleri</strong>, okula ve konaklama türüne bağlı olarak <strong>ortalama 50 Euro civarındadır</strong> ve transfer detayları kayıt sürecinde netleştirilir.
        </p>
      </>
    ),
    infoBox: {
      title: 'Malta Dil Okulları Havalimanı Transfer Bilgileri (2026)',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      items: [
        { label: 'Havalimanı', value: 'Malta Uluslararası Havalimanı (MLA)' },
        { label: 'Okul Bölgelerine Göre Transfer Süresi', value: '' },
        { label: 'St. Julian\'s', value: '20–30 dakika' },
        { label: 'Sliema', value: '25–35 dakika' },
        { label: 'Swieqi', value: '25–30 dakika' },
        { label: 'Pembroke', value: '20–25 dakika' },
        { label: '', value: '(Süreler trafik durumuna göre değişebilir.)' },
        { label: 'Transfer Seçenekleri', value: 'Okul tarafından organize edilen özel transfer, taksi, otobüs' },
        { label: 'Okul Transfer Ücreti', value: 'Gidiş–dönüş ortalama 50 Euro (Ücret okul ve konaklama türüne göre değişebilir.)' },
        { label: 'Alternatif Ulaşım', value: '' },
        { label: 'Taksi', value: '15–25 Euro (tek yön, merkezi bölgeler)' },
        { label: 'Otobüs', value: '2 Euro (tek yön)' },
      ],
      note: '🔒 Güven Notu: Okul tarafından organize edilen transferlerde, öğrenciler uçuş bilgilerinin önceden paylaşılmasıyla birlikte Malta Uluslararası Havalimanı\'nda karşılanır ve doğrudan konaklamalarına ulaştırılır.',
    },
  },
  'malta-dil-okulu-gitmeden-once-hazirlik': {
    introText: (
      <>
        <p>
          Malta'da <strong>dil okuluna gitmek</strong> heyecan verici olduğu kadar, özellikle <strong>ilk kez yurt dışına çıkacak öğrenciler</strong> için zaman zaman <strong>kafa karıştırıcı</strong> da olabilir. <strong>Vizenizi aldıktan sonra</strong> <strong>uçağa bineceğiniz gün yaklaştıkça</strong> "Havalimanında ne soracaklar?", "Valizime neler koymam gerekir?", "Beni orada kim karşılayacak?" gibi soruların aklınızdan geçmesi çok normal. Bunlar, <strong>bizim de öğrencilerimizle birlikte defalarca yaşadığımız süreçler</strong>.
        </p>
        <p>
          Bu sayfada, <strong>Malta'ya dil okulu için giderken gerçekte neler yaşandığını</strong>, <strong>yolculuk sırasında ve havaalanında karşılaşılan detayları</strong> ve <strong>ilk günün genelde nasıl geçtiğini</strong> <strong>kendi deneyimlerimiz üzerinden</strong> paylaşıyoruz. Amacımız süreci karmaşık hale getirmek değil; <strong>Malta'ya giderken sizi nelerin beklediğini önceden bilmenizi</strong> ve <strong>yolculuğa daha rahat, daha sakin bir şekilde çıkmanızı</strong> sağlamak.
        </p>
      </>
    ),
    infoBox: {
      title: 'Malta Dil Okulu Yolculuk Kontrol Listesi (2026)',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      items: [
        { label: 'Vize & Pasaport', value: 'Vize etiketindeki isim, tarih ve giriş bilgilerini son kez kontrol edin. Pasaport geçerliliğinin eğitim süresini kapsadığından emin olun.' },
        { label: 'Okul Belgeleri', value: 'Okul kabul belgesini ve varsa ödeme veya kayıt yazışmalarını telefonunuzda PDF olarak ve mümkünse çıktı halinde hazır bulundurun.' },
        { label: 'Konaklama Bilgisi', value: 'Konaklama adresi, giriş saati ve iletişim bilgilerini kaydedin. Aile yanı veya rezidansta geçerli olan temel kuralları önceden bilmek işinizi kolaylaştırır.' },
        { label: 'Transfer / Karşılama', value: 'Transfer aldıysanız uçuş bilgilerinizi ilettiğinizden emin olun. Havalimanında isimli kartla mı yoksa belirli bir noktadan mı karşılanacağınızı önceden öğrenin.' },
        { label: 'Havalimanında Sorulabilecekler', value: 'Pasaport kontrolünde genelde "Nerede kalacaksın?" ve "Kaç hafta kalacaksın?" gibi sorular sorulur. Okul ve konaklama bilgilerini hızlıca gösterebilmek yeterlidir.' },
      ],
    },
  },
};

// Blog post content data
const blogContent: Record<string, {
  content: string;
  image?: string;
}> = {
  'malta-nerede': {
    content: `
      <p style="font-size: 1.125rem; color: #475569; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta, Akdeniz'in ortasında yer alan küçük bir ada ülkesidir. Coğrafi konumu ve tarihi nedeniyle sıkça "Malta nerede?" sorusu sorulur. Bu yazıda Malta'nın konumu, Avrupa'daki yeri ve siyasi durumu hakkında bilgiler paylaşıyoruz.
      </p>

      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Malta'nın Coğrafi Konumu
      </h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1rem;">
        Malta, Akdeniz'in merkezinde, İtalya'nın güneyinde ve Tunus'un kuzeyinde yer alır. Üç ana adadan oluşur: Malta, Gozo ve Comino. Toplam yüzölçümü yaklaşık 316 km²'dir, bu da onu dünyanın en küçük ülkelerinden biri yapar.
      </p>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta'nın başkenti Valletta'dır ve ülke Avrupa Birliği'nin en güneydeki üyesidir. Stratejik konumu sayesinde tarih boyunca önemli bir ticaret ve kültür merkezi olmuştur.
      </p>

      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Malta Avrupa'da mı?
      </h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1rem;">
        Evet, Malta kesinlikle Avrupa'da yer alır. Malta, 2004 yılında Avrupa Birliği'ne katılmıştır ve 2008 yılından beri Euro bölgesinin bir parçasıdır. Ayrıca Schengen Bölgesi'nin de üyesidir, bu da AB vatandaşları için vizesiz seyahat imkanı sağlar.
      </p>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta'nın resmi dilleri Maltaca ve İngilizce'dir. İngilizce'nin resmi dil olması, Malta'yı İngilizce öğrenmek isteyen öğrenciler için popüler bir destinasyon haline getirmiştir.
      </p>

      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Malta Hangi Ülkeye Bağlı?
      </h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1rem;">
        Malta bağımsız bir ülkedir. 1964 yılında İngiltere'den bağımsızlığını kazanmış ve 1974 yılında cumhuriyet ilan edilmiştir. Malta, Commonwealth (İngiliz Milletler Topluluğu) üyesidir ancak siyasi olarak tamamen bağımsızdır.
      </p>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta'nın kendi parlamentosu, hükümeti ve cumhurbaşkanı vardır. Ülke, demokratik bir sistemle yönetilir ve Avrupa Birliği'nin tam üyesidir.
      </p>

      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Malta'ya Nasıl Gidilir?
      </h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1rem;">
        Malta'ya ulaşım genellikle havayolu ile yapılır. Malta Uluslararası Havalimanı (MLA), ülkenin tek havalimanıdır ve Avrupa'nın birçok şehrinden direkt uçuşlar bulunur. Türkiye'den Malta'ya direkt uçuşlar mevcut olup, aktarmalı uçuş seçenekleri de bulunmaktadır.
      </p>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta'ya giden öğrenciler için havalimanı transfer hizmetleri mevcuttur. Okullar genellikle öğrencilerine transfer hizmeti sunar veya özel transfer hizmetleri kullanılabilir.
      </p>

      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Sonuç
      </h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta, Akdeniz'in ortasında yer alan bağımsız bir Avrupa ülkesidir. Avrupa Birliği üyeliği, İngilizce'nin resmi dil olması ve güvenli ortamı sayesinde dil eğitimi için ideal bir destinasyondur. Malta'da dil okulu planlayan öğrenciler, ülkenin stratejik konumu ve Avrupa standartlarındaki eğitim kalitesinden faydalanabilir.
      </p>
    `,
    image: '/malta-dil-okullari.webp',
  },
  'malta-vize-istiyor-mu': {
    content: `
      <p style="font-size: 1.125rem; color: #475569; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta vize gerekliliği, Türkiye'den Malta'ya seyahat planlayan öğrenciler için önemli bir konudur. Bu yazıda Malta vize şartları, bordo ve yeşil pasaport farkları hakkında detaylı bilgiler paylaşıyoruz.
      </p>
    `,
    image: '/malta-ogrenci-vizesi.webp',
  },
  'malta-dil-okullari-havalimani-transfer': {
    content: `
      <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem;">
        Malta Dil Okulları Havalimanı Transfer Süreci Nasıl İşler?
      </h2>
      <p style="font-size: 1.125rem; color: #475569; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta dil okullarında eğitim alacak <strong>öğrencilerimiz için havalimanı transfer süreci</strong>, <strong>kayıt aşamasında planlanır</strong> ve <strong>uçuş bilgilerinin paylaşılmasıyla birlikte netleştirilir</strong>. Öğrencilerin, Malta'ya varıştan önce <strong>uçuş numarası, iniş tarihi ve saatini</strong> bildirmesi gerekmektedir. Bu bilgiler doğrultusunda, <strong>okul tarafından görevlendirilen transfer yetkilisi</strong> varış saatine göre planlama yapar.
      </p>
      <p style="font-size: 1.125rem; color: #475569; line-height: 1.75; margin-bottom: 1.5rem;">
        Öğrenci <strong>Malta Uluslararası Havalimanı'na (MLA) ulaştığında</strong>, <strong>transfer yetkilisi tarafından havaalanında karşılanır</strong> ve <strong>doğrudan konaklama adresine götürülür</strong>. Transfer hizmeti, özellikle <strong>Malta'ya ilk kez gelen öğrenciler</strong> için <strong>güvenli ve sorunsuz bir başlangıç</strong> sağlar. <strong>Dönüş transferi</strong> de talep edilmesi halinde aynı şekilde organize edilir ve <strong>eğitim bitiş tarihine göre planlanır</strong>.
      </p>
    `,
    image: '/malta-hizmetler/malta-havalimani-transfer.webp',
  },
  'malta-dil-okulu-gitmeden-once-hazirlik': {
    content: `
      <p style="font-size: 1.125rem; color: #475569; line-height: 1.75; margin-bottom: 1.5rem;">
        Malta dil okuluna gitmeden önce yapılması gereken hazırlıklar hakkında detaylı bilgiler.
      </p>
    `,
    image: '/malta-ogrenci-vizesi-basvuru-sureci.webp',
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }

  // SEO optimized title (max 60 characters)
  const seoTitle = post.slug === 'malta-nerede' 
    ? 'Malta Nerede? Avrupa\'da mı, Hangi Ülkeye Bağlı? | Blog'
    : post.slug === 'malta-vize-istiyor-mu'
    ? 'Malta Vize İstiyor mu? 2026 Bordo-Yeşil Pasaport | Blog'
    : post.slug === 'malta-dil-okullari-havalimani-transfer'
    ? 'Malta Dil Okulları Havalimanı Transferi 2026 | Blog'
    : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? 'Malta Dil Okulu Gitmeden Önce Hazırlık 2026 | Blog'
    : post.title.length > 50
    ? `${post.title.substring(0, 47)}... | Blog`
    : `${post.title} | Blog`;

  // SEO optimized description (150-160 characters)
  const seoDescription = post.slug === 'malta-nerede'
    ? 'Malta nerede? Malta adası Avrupa\'da mı, hangi ülkeye bağlı? Malta\'nın coğrafi konumu, Türkiye\'ye mesafesi, Avrupa Birliği üyeliği ve bağımsızlık durumu hakkında detaylı bilgiler.'
    : post.slug === 'malta-vize-istiyor-mu'
    ? 'Malta vize istiyor mu? 2026 Türkiye vatandaşları için vize gerekliliği, bordo ve yeşil pasaport farkları, Schengen vizesi başvuru süreci hakkında bilgiler.'
    : post.slug === 'malta-dil-okullari-havalimani-transfer'
    ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti. Okul transferi, alternatif ulaşım seçenekleri ve transfer ücretleri hakkında bilgiler.'
    : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? 'Malta dil okuluna gitmeden önce yolculuk ve ilk gün rehberi. Havalimanı süreci, pasaport kontrolü, konaklama varışı ve ilk gün deneyimi hakkında gerçek öğrenci deneyimleri.'
    : post.excerpt.length > 160
    ? `${post.excerpt.substring(0, 157)}...`
    : post.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.slug === 'malta-vize-istiyor-mu'
      ? [
          'Malta vize',
          'Malta vize istiyor mu',
          'Malta Türkiye vize',
          'Malta bordo pasaport',
          'Malta yeşil pasaport',
          'Malta Schengen vizesi',
          'Malta öğrenci vizesi',
          'Malta vize başvurusu',
          'Malta vize gerekliliği',
          'Malta dil okulu vizesi',
        ]
      : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
      ? [
          'Malta dil okulu hazırlık',
          'Malta yolculuk rehberi',
          'Malta havalimanı süreci',
          'Malta ilk gün',
          'Malta dil okulu hazırlık listesi',
          'Malta konaklama varış',
          'Malta pasaport kontrolü',
          'Malta dil okulu deneyim',
          'Malta öğrenci hazırlık',
          'Malta yolculuk ipuçları',
        ]
      : [
          'Malta nerede',
          'Malta adası',
          'Malta Avrupa',
          'Malta hangi ülkeye bağlı',
          'Malta Türkiye mesafe',
          'Malta coğrafi konum',
          'Malta Avrupa Birliği',
          'Malta dil okulu',
          'Malta İngilizce eğitimi',
        ],
    alternates: {
      canonical: `https://maltadilokuluingilizce.com/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://maltadilokuluingilizce.com/blog/${post.slug}`,
      siteName: 'Malta Dil Okulu İngilizce',
      locale: 'tr_TR',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ['Malta Dil Okulu İngilizce'],
      images: [
        {
          url: `https://maltadilokuluingilizce.com${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.slug === 'malta-vize-istiyor-mu'
            ? 'Malta vize gerekliliği 2026 - Türkiye Cumhuriyeti vatandaşları için Malta vize şartları, bordo ve yeşil pasaport farkları, Schengen vizesi başvuru süreci'
            : post.slug === 'malta-dil-okullari-havalimani-transfer'
            ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026 - Malta Uluslararası Havalimanı (MLA) transfer süreci, okul transferi, alternatif ulaşım seçenekleri ve transfer ücretleri'
            : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
            ? 'Malta dil okuluna gitmeden önce hazırlık rehberi 2026 - Yolculuk, havalimanı süreci, pasaport kontrolü, konaklama varışı ve ilk gün deneyimi'
            : 'Malta adası coğrafi konumu ve Avrupa\'daki yeri - Akdeniz\'de Malta, Gozo ve Comino adaları',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`https://maltadilokuluingilizce.com${post.coverImage}`],
    },
  };
}

// Generate static params for known posts
export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post || !content) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = mockPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Popular posts for sidebar
  const popularPosts = [...mockPosts]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 5);

  // FAQ items for structured data
  const faqItemsForSchema = post.slug === 'malta-vize-istiyor-mu' 
    ? [
        { question: 'Malta Vize İstiyor mu? (2026)', answer: 'Evet. 2026 yılı itibarıyla Türkiye Cumhuriyeti vatandaşlarının Malta\'ya seyahat edebilmesi için vize alması gerekmektedir. Malta, Schengen Bölgesi\'nde yer aldığı için vize uygulaması pasaport türüne göre değişir.' },
        { question: 'Malta İçin Vize Gerekli mi? (Türkiye – 2026)', answer: 'Evet. Bordo (umuma mahsus) pasaport sahipleri için Malta vizesi zorunludur. Yeşil pasaport sahipleri ise kısa süreli seyahatlerde vizeden muaftır.' },
        { question: 'Malta Adası Vize İstiyor mu?', answer: 'Evet. Malta Adası, Schengen Bölgesi\'nde bulunduğundan Türkiye\'den giden bordo pasaport sahiplerinden vize ister. Vize muafiyeti yalnızca belirli pasaport türleri için geçerlidir.' },
        { question: 'Malta Yeşil Pasaporta Vize İstiyor mu? (2026)', answer: 'Hayır. Yeşil (hususi) pasaport sahipleri, 2026 yılında Malta\'ya 180 gün içinde 90 günü aşmamak şartıyla vizesiz seyahat edebilir.' },
        { question: 'Malta Bordo Pasaporta Vize İstiyor mu? (2026)', answer: 'Evet. Bordo pasaport sahiplerinin Malta\'ya giriş yapabilmesi için Schengen vizesi alması zorunludur.' },
        { question: 'Malta\'ya Vize Var mı?', answer: 'Evet. Malta\'ya seyahat etmek isteyen Türkiye Cumhuriyeti vatandaşları için Schengen vizesi ve uzun süreli ulusal vize seçenekleri bulunmaktadır.' },
        { question: 'Malta Hangi Vizeyi İstiyor?', answer: 'Malta, seyahat süresine ve amacına göre: 90 güne kadar olan seyahatlerde Schengen (C tipi) vize, 90 günü aşan eğitim, çalışma ve ikametlerde ulusal (D tipi) vize uygular.' },
        { question: 'Malta\'ya Nasıl Gidilir, Vize Gerekir mi?', answer: 'Türkiye\'den Malta\'ya gitmek için: Bordo pasaport sahiplerinin vize alması gerekir. Yeşil pasaport sahipleri kısa süreli seyahatlerde vizeden muaftır.' },
        { question: 'Malta İçin Hangi Vize Alınır?', answer: 'Turistik, ziyaret ve kısa süreli seyahatler için Schengen vizesi. Dil eğitimi, work and study ve uzun süreli programlar için ulusal (D tipi) vize alınır.' },
        { question: 'Malta Vizesi Kaç Gün Verilir?', answer: 'Malta Schengen vizesi, 180 gün içinde en fazla 90 gün kalış hakkı sağlar. Verilen süre, başvurunun içeriğine ve seyahat planına göre değişebilir.' },
        { question: 'Malta\'ya Vizesiz Kaç Gün Gidilebilir?', answer: 'Yeşil pasaport sahipleri, Malta\'da 180 gün içinde en fazla 90 gün vizesiz kalabilir. Bordo pasaport sahipleri için vizesiz giriş hakkı yoktur.' },
      ]
    : post.slug === 'malta-dil-okullari-havalimani-transfer'
    ? [
        { question: 'Uçağım gecikirse okul transferi beni yine karşılar mı?', answer: 'Evet. Transfer hizmeti uçuş bilgilerine göre planlandığı için, uçuş gecikmeleri takip edilir ve öğrenci Malta Uluslararası Havalimanı\'nda varış saatine göre karşılanır.' },
        { question: 'Gece veya çok erken saatlerde transfer oluyor mu?', answer: 'Evet. Malta dil okulları tarafından organize edilen transfer hizmeti, gece geç saatler ve sabah erken varışlar dahil olmak üzere günün her saatinde yapılabilmektedir.' },
        { question: 'Havalimanında beni tam olarak nerede karşılayacaklar?', answer: 'Karşılama yöntemi okula göre değişir. Bazı okullarda transfer yetkilisi isim yazılı bir kartla terminal çıkışında beklerken, bazı okullarda öğrenci okulun belirttiği karşılama noktasına veya transfer ofisine yönlendirilir. Detaylar seyahat öncesinde paylaşılır.' },
        { question: 'Transfer ücreti kişi başı mı yoksa araç başı mı?', answer: 'Çoğu Malta dil okulunda transfer ücreti kişi başı olarak belirlenir. Ancak bazı özel transferlerde veya aynı uçuşla gelen öğrenciler için araç bazlı uygulamalar olabilir.' },
        { question: 'Okul transferini almazsam sonradan ekletebilir miyim?', answer: 'Evet. Uçuş bilgileri zamanında paylaşılması şartıyla, çoğu okulda transfer hizmeti sonradan eklenebilir. Ancak yoğun sezonlarda müsaitlik sınırlı olabileceği için önceden planlanması önerilir.' },
      ]
    : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
    ? [
        { question: 'Malta\'ya dil okulu için giderken havalimanında zor soru sorulur mu?', answer: 'Hayır. Malta\'ya dil eğitimi için giden öğrenciler genellikle kısa ve basit sorularla karşılaşır. Kaç hafta kalacağınız, hangi okula gittiğiniz ve nerede konaklayacağınız sorulabilir; süreç genelde birkaç dakika sürer.' },
        { question: 'Malta\'ya giderken tüm belgelerin çıktısını almak zorunda mıyım?', answer: 'Zorunlu değildir. Belgelerin telefonunuzda PDF olarak bulunması çoğu zaman yeterlidir. Ancak ilk kez yurt dışına çıkan öğrenciler için okul kabul belgesi ve konaklama bilgisinin çıktısını almak rahatlatıcı olabilir.' },
        { question: 'Malta\'ya girişte yanımda ne kadar nakit para olmalı?', answer: 'Belirli bir zorunlu tutar yoktur. Çoğu öğrenci ilk gün için küçük bir nakit miktarı ve banka kartı ile rahatça giriş yapar. Günlük harcamalar Malta\'da kartla kolayca yapılabilir.' },
        { question: 'Malta\'da telefon hattım çalışır mı, sim kart almam gerekir mi?', answer: 'Türkiye\'den gelen telefon hatları Malta\'da roaming ile çalışır. Ancak uzun süre kalacak öğrenciler genellikle ilk günlerde yerel sim kart veya eSIM almayı tercih eder.' },
        { question: 'Malta\'ya indiğim gün okula gitmek zorunda mıyım?', answer: 'Hayır. Çoğu dil okulunda ilk gün oryantasyon ve seviye belirleme farklı bir gün yapılır. Varış günü genellikle yerleşme ve dinlenme için ayrılır.' },
        { question: 'Malta\'da ilk gün konaklamada ne yapmam beklenir?', answer: 'İlk gün genelde oda yerleşimi yapılır, temel bilgiler verilir ve ev veya rezidans kuralları kısaca anlatılır. Detaylı bilgilendirme çoğu zaman yazılı olarak da paylaşılır.' },
        { question: 'Havalimanı transferi almamak sorun yaratır mı?', answer: 'Hayır. Transfer zorunlu değildir. Ancak Malta\'ya ilk kez gelen öğrenciler için okul tarafından organize edilen transfer, ilk gün stresi yaşamamak açısından daha rahat bir seçenektir.' },
        { question: 'Malta\'ya giderken büyük valiz sorun olur mu?', answer: 'Hayır. Malta Havalimanı küçük ve düzenli olduğu için valizle ilerlemek zor değildir. Yine de ilk gün için küçük bir sırt çantası taşımak öğrencilerin işini kolaylaştırır.' },
      ]
    : [
        { question: 'Malta\'da saat kaç?', answer: 'Malta, Orta Avrupa Saati (CET) zaman dilimini kullanır. Türkiye\'ye göre kış aylarında 2 saat, yaz aylarında ise 1 saat geridedir.' },
        { question: 'Malta Türkiye ile aynı saat diliminde mi?', answer: 'Hayır. Türkiye UTC+3 saat dilimini yıl boyunca sabit kullanır. Malta ise CET (UTC+1) ve yaz döneminde CEST (UTC+2) saat dilimine geçer.' },
        { question: 'Malta yaz saati uygulaması var mı?', answer: 'Evet. Malta, Mart ayının son Pazar günü yaz saati uygulamasına geçer ve Ekim ayının son Pazar günü yaz saatini sona erdirir.' },
        { question: 'Malta hangi dili konuşuyor?', answer: 'Malta\'nın resmi dilleri Maltaca ve İngilizce\'dir.' },
        { question: 'Malta\'da İngilizce konuşuluyor mu?', answer: 'Evet. İngilizce, Malta\'nın resmi dillerinden biridir ve ülkede yaygın olarak kullanılır.' },
        { question: 'Malta küçük bir ülke mi?', answer: 'Evet. Malta, yüzölçümü ve nüfus açısından Avrupa\'nın en küçük ülkelerinden biridir.' },
        { question: 'Malta Akdeniz ülkesi mi?', answer: 'Evet. Malta, Akdeniz\'de yer alan bir ada ülkesidir.' },
        { question: 'Malta Schengen ülkesi mi?', answer: 'Evet. Malta, Schengen Bölgesi\'ne dahil bir ülkedir.' },
        { question: 'Malta Avrupa Birliği üyesi mi?', answer: 'Evet. Malta, 2004 yılından beri Avrupa Birliği üyesidir.' },
        { question: 'Malta güvenli bir ülke mi?', answer: 'Evet. Malta, düşük suç oranlarına sahip olup Avrupa\'nın güvenli ülkeleri arasında yer alır.' },
        { question: 'Malta\'da kaç ada var?', answer: 'Malta, üç ana adadan oluşur: Malta, Gozo ve Comino.' },
        { question: 'Malta\'nın başkenti neresidir?', answer: 'Malta\'nın başkenti Valletta\'dır.' },
        { question: 'Malta\'nın para birimi nedir?', answer: 'Malta\'nın resmi para birimi Euro (€)\'dur.' },
        { question: 'Malta euro kullanıyor mu?', answer: 'Evet. Malta\'da Euro kullanılmaktadır.' },
        { question: 'Malta hangi kıtada yer alır?', answer: 'Malta, Avrupa kıtasında yer alır.' },
        { question: 'Malta Güney Avrupa\'da mı?', answer: 'Evet. Malta, Güney Avrupa ülkeleri arasında kabul edilir.' },
        { question: 'Malta İtalya\'ya yakın mı?', answer: 'Evet. Malta, İtalya\'nın Sicilya Adası\'nın yaklaşık 90 km güneyinde yer alır.' },
        { question: 'Malta Türkiye\'ye uzak mı?', answer: 'Türkiye ile Malta arasındaki kuş uçuşu mesafe yaklaşık 1.400–1.600 km\'dir.' },
        { question: 'Malta bir ada ülkesi mi?', answer: 'Evet. Malta, tamamen adalardan oluşan bir ada ülkesidir.' },
        { question: 'Malta\'da trafik hangi yönden akar?', answer: 'Malta\'da trafik soldan akar.' },
      ];

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://maltadilokuluingilizce.com/#website',
        url: 'https://maltadilokuluingilizce.com',
        name: 'Malta Dil Okulu İngilizce',
        description: "Malta'daki dil okulları hakkında detaylı bilgi ve karşılaştırma rehberi",
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://maltadilokuluingilizce.com/#organization',
        name: 'Malta Dil Okulu İngilizce',
        url: 'https://maltadilokuluingilizce.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://maltadilokuluingilizce.com/logo-header.png',
          width: 1200,
          height: 630,
        },
        description: 'Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Malta\'da 8 yıldır yaşayan ekibimizle ücretsiz danışmanlık, okul seçimi, vize danışmanlığı ve öğrenci destek hizmetleri sunuyoruz.',
      },
      {
        '@type': 'WebPage',
        '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
        url: `https://maltadilokuluingilizce.com/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#breadcrumb`,
        },
        mainEntity: {
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#article`,
        },
        primaryImageOfPage: {
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#featured-image`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Anasayfa',
            item: 'https://maltadilokuluingilizce.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://maltadilokuluingilizce.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://maltadilokuluingilizce.com/blog/${post.slug}`,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [
          {
            '@type': 'ImageObject',
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#featured-image`,
            url: `https://maltadilokuluingilizce.com${post.coverImage}`,
            width: 1200,
            height: 630,
            caption: post.slug === 'malta-vize-istiyor-mu'
              ? 'Malta vize gerekliliği 2026 - Türkiye Cumhuriyeti vatandaşları için Malta vize şartları, bordo ve yeşil pasaport farkları, Schengen vizesi başvuru süreci'
              : post.slug === 'malta-dil-okullari-havalimani-transfer'
              ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026 - Malta Uluslararası Havalimanı (MLA) transfer süreci, okul transferi, alternatif ulaşım seçenekleri ve transfer ücretleri'
              : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
              ? 'Malta dil okuluna gitmeden önce hazırlık rehberi 2026 - Yolculuk, havalimanı süreci, pasaport kontrolü, konaklama varışı ve ilk gün deneyimi'
              : 'Malta adası coğrafi konumu ve Avrupa\'daki yeri - Akdeniz\'de Malta, Gozo ve Comino adaları',
            description: post.slug === 'malta-vize-istiyor-mu'
              ? 'Malta vize gerekliliği 2026 yılı için Türkiye Cumhuriyeti vatandaşları. Bordo (umuma mahsus) pasaport sahipleri Malta\'ya giriş için Schengen vizesi almak zorundadır. Yeşil (hususi) pasaport sahipleri ise 180 gün içinde 90 güne kadar olan kısa süreli seyahatlerde vizeden muaftır. Malta, Schengen Bölgesi\'nde yer alan bir Avrupa Birliği ülkesidir.'
              : post.slug === 'malta-dil-okullari-havalimani-transfer'
              ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026. Malta Uluslararası Havalimanı\'na (MLA) varışta, öğrenciler okul tarafından görevlendirilen transfer yetkilisi tarafından karşılanarak doğrudan konaklamalarına güvenli şekilde ulaştırılır. Gidiş-dönüş transfer ücretleri ortalama 50 Euro civarındadır.'
              : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
              ? 'Malta dil okuluna gitmeden önce hazırlık rehberi 2026. Malta\'ya dil eğitimi için giderken yolculuk sırasında ve havaalanında karşılaşılan detaylar, ilk günün nasıl geçtiği ve konaklamaya varış sonrası süreç hakkında gerçek öğrenci deneyimleri.'
              : 'Malta adası Akdeniz\'in ortasında, İtalya\'nın Sicilya Adası\'nın güneyinde yer alan bağımsız bir Avrupa ülkesidir. Malta, Gozo ve Comino adalarından oluşan takım adalar ülkesi.',
          },
        ],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          '@type': 'Organization',
          name: 'Malta Dil Okulu İngilizce',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Malta Dil Okulu İngilizce',
          logo: {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/logo-header.png',
          },
        },
        mainEntityOfPage: {
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: post.slug === 'malta-vize-istiyor-mu'
            ? [
                '.speakable-bordo-pasaport',
                '.speakable-yesil-pasaport',
                '.speakable-vizesiz-gun',
                '.speakable-schengen-kurali',
              ]
            : [
                '.speakable-malta-nerede-intro',
                '.speakable-malta-turkiye',
                '.speakable-malta-ulkede',
                '.speakable-malta-avrupa',
              ],
          xpath: [],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#faq`,
        name: post.slug === 'malta-vize-istiyor-mu' 
          ? 'Malta Vizesi Hakkında Türkiye\'den En Sık Sorulan Sorular (2026)'
          : post.slug === 'malta-dil-okullari-havalimani-transfer'
          ? 'Malta Havalimanı Transferi Hakkında Sık Sorulan Sorular (2026)'
          : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
          ? 'Malta Dil Okulu Hazırlık: Sık Sorulan Sorular (2026)'
          : 'Malta Hakkında Türkiye\'den Sık Sorulan Sorular 2026',
        description: post.slug === 'malta-vize-istiyor-mu'
          ? 'Malta vize gerekliliği, bordo ve yeşil pasaport farkları, Schengen vizesi, ulusal vize türleri ve vize başvuru süreçleri hakkında sık sorulan sorular ve cevapları. Malta vize istiyor mu, hangi vize alınır, vizesiz kaç gün gidilebilir gibi soruların detaylı cevapları.'
          : post.slug === 'malta-dil-okullari-havalimani-transfer'
          ? 'Malta havalimanı transferi, okul transfer hizmeti, alternatif ulaşım seçenekleri, transfer ücretleri ve karşılama süreci hakkında sık sorulan sorular ve cevapları. Uçuş gecikmesi, gece transferi, karşılama noktası ve transfer ücreti hakkında detaylı bilgiler.'
          : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
          ? 'Malta dil okuluna gitmeden önce hazırlık süreci, havalimanı deneyimi, pasaport kontrolü, konaklama varışı ve ilk gün deneyimi hakkında sık sorulan sorular ve cevapları. Yolculuk, belgeler, nakit para, telefon hattı ve transfer hakkında detaylı bilgiler.'
          : 'Malta\'nın coğrafi konumu, Avrupa\'daki yeri, saat dilimi, dil, para birimi ve diğer önemli bilgiler hakkında sık sorulan sorular ve cevapları. Malta nerede, hangi ülkeye bağlı, Avrupa\'da mı gibi soruların detaylı cevapları.',
        mainEntity: faqItemsForSchema.map((faq, index) => ({
          '@type': 'Question',
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#faq-${index + 1}`,
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#faq-answer-${index + 1}`,
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#toc`,
        name: 'İçindekiler',
        description: post.slug === 'malta-vize-istiyor-mu' 
          ? 'Malta Vize İstiyor mu? blog yazısı içindekiler listesi'
          : post.slug === 'malta-dil-okullari-havalimani-transfer'
          ? 'Malta Havalimanı Transferi blog yazısı içindekiler listesi'
          : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
          ? 'Malta Dil Okulu Gitmeden Önce Hazırlık blog yazısı içindekiler listesi'
          : 'Malta Nerede? blog yazısı içindekiler listesi',
        itemListElement: post.slug === 'malta-vize-istiyor-mu'
          ? [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Malta Bordo Pasaportlulara Vize İstiyor mu?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-bordo-pasaport-vize`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Malta Yeşil Pasaport Vize İstiyor mu?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-yesil-pasaport-vize`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Malta\'ya Vizesiz Kaç Gün Gidilebilir?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-vizesiz-kac-gun`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Schengen Hesaplaması: 180 Günde 90 Gün Kuralı Nedir?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#schengen-180-gunde-90-gun-kurali`,
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Malta\'da Kısa Süreli Vize Türleri Nelerdir?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-kisa-sureli-vize-turleri`,
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Malta\'da Uzun Süreli ve Diğer Vize Türleri',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-uzun-sureli-vize-turleri`,
              },
              {
                '@type': 'ListItem',
                position: 7,
                name: 'Malta Vizesi Hakkında Türkiye\'den En Sık Sorulan Sorular (2026)',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-vize-faq`,
              },
            ]
          : post.slug === 'malta-dil-okullari-havalimani-transfer'
          ? [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Malta Dil Okulları Havalimanı Transfer Süreci Nasıl İşler?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#havalimani-transfer-sureci`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Okul Transferi Dışında Alternatif Ulaşım Seçenekleri',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#alternatif-ulasim-secenekleri`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Malta Dil Okullarında Havalimanı Karşılama Nasıl Yapılır?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#havalimani-karsilama`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Malta Havalimanı Transferi Hakkında Sık Sorulan Sorular (2026)',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-havalimani-transfer-faq`,
              },
            ]
          : post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik'
          ? [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Havalimanında Neler Soruluyor?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#havalimaninda-neler-soruluyor`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Havalimanına İner İnmez Bilmeniz İyi Olur',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#havalimanina-iner-inmez-bilmeniz-iyi-olur`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Konaklamaya Vardıktan Sonra Süreç Nasıl İlerliyor?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#konaklamaya-vardiktan-sonra-surec`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'İlk Gün Hazırlığı ve Okul Oryantasyonu',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#ilk-gun-hazirligi`,
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Malta Dil Okulu Hazırlık: Sık Sorulan Sorular (2026)',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-hazirlik-faq`,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Malta Türkiye\'ye Göre Nerede?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-turkiye-gore-nerede`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Malta Hangi Ülkede? Nereye Bağlı?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-hangi-ulkede`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Malta Avrupa\'da mı? Avrupa Birliği Üyesi mi?',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-avrupa-birligi`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Malta Hakkında Türkiye\'den Sık Sorulan Sorular 2026',
                item: `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-nerede-faq`,
              },
            ],
      },
      // Article schemas for bordo and yeşil pasaport sections (vize page only)
      ...(post.slug === 'malta-vize-istiyor-mu' ? [
        {
          '@type': 'Article',
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-bordo-pasaport-vize`,
          headline: 'Malta Bordo Pasaportlulara Vize İstiyor mu?',
          description: 'Bordo (umuma mahsus) pasaport sahibi Türkiye Cumhuriyeti vatandaşlarının Malta\'ya seyahat edebilmesi için vize alması zorunludur. Malta, Schengen Bölgesi\'nde yer aldığı için bordo pasaportla yapılan seyahatlerde Schengen vizesi uygulanır.',
          author: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
            logo: {
              '@type': 'ImageObject',
              url: 'https://maltadilokuluingilizce.com/logo-header.png',
            },
          },
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          mainEntityOfPage: {
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
          },
        },
        {
          '@type': 'Article',
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-yesil-pasaport-vize`,
          headline: 'Malta Yeşil Pasaport Vize İstiyor mu?',
          description: 'Yeşil (hususi) pasaport sahipleri, Malta\'ya yapacakları 90 güne kadar olan kısa süreli seyahatlerde vizeden muaftır. Ancak dil eğitimi, 90 günü aşan kalış veya çalışma gibi durumlarda yeşil pasaport sahipleri için de Malta vizesi gerekmektedir.',
          author: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
            logo: {
              '@type': 'ImageObject',
              url: 'https://maltadilokuluingilizce.com/logo-header.png',
            },
          },
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          mainEntityOfPage: {
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
          },
        },
        {
          '@type': 'Article',
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#malta-vizesiz-kac-gun`,
          headline: 'Malta\'ya Vizesiz Kaç Gün Gidilebilir?',
          description: 'Yeşil (hususi) pasaport sahipleri, Malta\'ya kısa süreli seyahatlerde vizesiz gidebilir. Ancak bu vizesiz giriş, Schengen bölgesinde geçerli olan "180 günde 90 gün" kuralına tabidir. Malta\'da vizesiz kalış süresi, son 180 gün içindeki toplam kalış günlerinin hesabıdır.',
          author: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
            logo: {
              '@type': 'ImageObject',
              url: 'https://maltadilokuluingilizce.com/logo-header.png',
            },
          },
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          mainEntityOfPage: {
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
          },
        },
        {
          '@type': 'Article',
          '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#schengen-180-gunde-90-gun-kurali`,
          headline: 'Schengen Hesaplaması: 180 Günde 90 Gün Kuralı Nedir?',
          description: '180 günde 90 gün kuralı, Schengen bölgesinde vizesiz veya kısa süreli Schengen vizesiyle seyahat edenler için geçerli bir kalış süresi sınırıdır. Bugünden geriye doğru sayılan son 180 gün içinde Schengen\'de geçirdiğiniz günlerin toplamı 90 günü geçemez. Malta Schengen ülkesi olduğundan, Malta\'da geçirilen günler bu hesaba dahil edilir.',
          author: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Malta Dil Okulu İngilizce',
            logo: {
              '@type': 'ImageObject',
              url: 'https://maltadilokuluingilizce.com/logo-header.png',
            },
          },
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          mainEntityOfPage: {
            '@id': `https://maltadilokuluingilizce.com/blog/${post.slug}#webpage`,
          },
        },
      ] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Sol Kısım */}
            <div>
              <div className="mb-6">
                <PostMeta post={post} />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {post.title}
              </h1>
              {heroContent[post.slug] && (
                <div className="text-lg text-slate-700 leading-relaxed space-y-4">
                  {heroContent[post.slug].introText}
                </div>
              )}

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mt-6" itemScope itemType="https://schema.org/BreadcrumbList">
                <ol className="flex items-center gap-2 text-sm flex-wrap">
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors" itemProp="item">
                      <span itemProp="name">Anasayfa</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li className="text-slate-400" aria-hidden="true">›</li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/blog" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors" itemProp="item">
                      <span itemProp="name">Blog</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <li className="text-slate-400" aria-hidden="true">›</li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span className="text-slate-900 font-medium line-clamp-1" itemProp="name">{post.title}</span>
                    <meta itemProp="position" content="3" />
                  </li>
                </ol>
              </nav>

              {/* Tarih */}
              <div className="text-sm text-slate-600 mt-4">
                Son kontrol: <time dateTime={new Date().toISOString().split('T')[0]} className="font-semibold">
                  {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time> • bilgiler günceldir.
              </div>
            </div>

            {/* Sağ Kısım - Kısa Bilgiler */}
            {heroContent[post.slug] && (
              <div>
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 md:p-8 shadow-xl border border-blue-200/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      {heroContent[post.slug].infoBox.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {heroContent[post.slug].infoBox.title}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {heroContent[post.slug].infoBox.items.map((item, index) => {
                      // Boş label için özel stil
                      if (!item.label && item.value) {
                        return (
                          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                            <span className="text-slate-600 text-xs italic">{item.value}</span>
                          </div>
                        );
                      }
                      // Başlık için özel stil
                      if (item.label && !item.value) {
                        return (
                          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                            <span className="text-blue-700 font-bold text-sm uppercase tracking-wide">{item.label}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col gap-2">
                            <span className="text-blue-600 font-bold text-sm">{item.label}</span>
                            <span className="text-slate-900 font-semibold">{item.value}</span>
                          </div>
                        </div>
                      );
                    })}
                    {heroContent[post.slug].infoBox.note && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 mt-4">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {heroContent[post.slug].infoBox.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Havalimanı Transfer sayfası için */}
      {post.slug === 'malta-dil-okullari-havalimani-transfer' && (
        <main className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 space-y-8">
                {/* Table of Contents */}
                <section id="içindekiler" className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
                  <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">
                      İçindekiler
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        <Link
                          href="#havalimani-transfer-sureci"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            1
                          </span>
                          <span className="leading-relaxed">Malta Dil Okulları Havalimanı Transfer Süreci Nasıl İşler?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#alternatif-ulasim-secenekleri"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            2
                          </span>
                          <span className="leading-relaxed">Okul Transferi Dışında Alternatif Ulaşım Seçenekleri</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#havalimani-karsilama"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            3
                          </span>
                          <span className="leading-relaxed">Malta Dil Okullarında Havalimanı Karşılama Nasıl Yapılır?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-havalimani-transfer-faq"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            4
                          </span>
                          <span className="leading-relaxed">Malta Havalimanı Transferi Hakkında Sık Sorulan Sorular (2026)</span>
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </section>

                {/* TOC Featured Image */}
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <figure className="relative w-full aspect-video">
                    <Image
                      src="/malta-dil-okullari-havalimani-transfer.webp"
                      alt="Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026 - Malta Uluslararası Havalimanı (MLA) transfer süreci, okul transferi, alternatif ulaşım seçenekleri ve transfer ücretleri"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 896px"
                      priority={false}
                      itemProp="image"
                    />
                    <figcaption className="mt-3 px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026. Malta Uluslararası Havalimanı'na (MLA) varışta, öğrenciler okul tarafından görevlendirilen transfer yetkilisi tarafından karşılanarak doğrudan konaklamalarına güvenli şekilde ulaştırılır. Gidiş-dönüş transfer ücretleri ortalama 50 Euro civarındadır.
                    </figcaption>
                  </figure>
                </div>

                {/* Malta Dil Okulları Havalimanı Transfer Süreci Nasıl İşler? */}
                <section 
                  id="havalimani-transfer-sureci" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Malta Dil Okulları Havalimanı Transfer Süreci Nasıl İşler?
                  </h2>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta dil okullarında eğitim alacak <strong>öğrencilerimiz için havalimanı transfer süreci</strong>, <strong>kayıt aşamasında planlanır</strong> ve <strong>uçuş bilgilerinin paylaşılmasıyla birlikte netleştirilir</strong>. Öğrencilerin, Malta'ya varıştan önce <strong>uçuş numarası, iniş tarihi ve saatini</strong> bildirmesi gerekmektedir. Bu bilgiler doğrultusunda, <strong>okul tarafından görevlendirilen transfer yetkilisi</strong> varış saatine göre planlama yapar.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      Öğrenci <strong>Malta Uluslararası Havalimanı'na (MLA) ulaştığında</strong>, <strong>transfer yetkilisi tarafından havaalanında karşılanır</strong> ve <strong>doğrudan konaklama adresine götürülür</strong>. Transfer hizmeti, özellikle <strong>Malta'ya ilk kez gelen öğrenciler</strong> için <strong>güvenli ve sorunsuz bir başlangıç</strong> sağlar. <strong>Dönüş transferi</strong> de talep edilmesi halinde aynı şekilde organize edilir ve <strong>eğitim bitiş tarihine göre planlanır</strong>.
                    </p>
                  </div>
                </section>

                {/* Okul Transferi Dışında Alternatif Ulaşım Seçenekleri */}
                <section 
                  id="alternatif-ulasim-secenekleri" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h3 
                    className="text-xl md:text-2xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Okul Transferi Dışında Alternatif Ulaşım Seçenekleri
                  </h3>
                  
                  <div className="space-y-6" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta Uluslararası Havalimanı'ndan konaklamaya ulaşım için, <strong>okul tarafından organize edilen transfer hizmeti dışında</strong> <strong>taksi ve otobüs seçenekleri</strong> de bulunmaktadır. Ancak bu alternatifler, özellikle <strong>Malta'ya ilk kez gelen öğrenciler</strong> için <strong>daha fazla planlama ve yön bulma gerektirebilir</strong>.
                    </p>

                    {/* Taksi ve Uygulamalar */}
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span>🚕</span>
                        <span>Taksi ve Uygulamalar</span>
                      </h4>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Malta'da havalimanında <strong>resmi taksiler</strong> bulunur ve <strong>St. Julian's, Sliema, Swieqi ve Pembroke</strong> gibi merkezi bölgelere <strong>15–25 Euro aralığında</strong> ulaşım sağlanabilir. Bunun yanı sıra Malta'da <strong>Bolt ve eCabs</strong> gibi mobil taksi uygulamaları yaygın olarak kullanılmaktadır. Uygulama üzerinden çağrılan taksiler, <strong>trafik ve saat durumuna göre değişken ücretlendirme</strong> yapabilir.
                      </p>
                    </div>

                    {/* Otobüs ile Ulaşım */}
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span>🚌</span>
                        <span>Otobüs ile Ulaşım</span>
                      </h4>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Malta'da <strong>toplu taşıma otobüslerle</strong> sağlanır ve havalimanından birçok bölgeye <strong>direkt veya aktarmalı seferler</strong> bulunmaktadır. <strong>Tek yön otobüs ücreti 2 Euro</strong> olup yolculuk süresi, gidilecek bölgeye bağlı olarak <strong>45–90 dakika arasında</strong> değişebilir. Otobüsle ulaşım daha ekonomik olsa da, <strong>valizlerle seyahat eden ve Malta'ya ilk kez gelen öğrenciler</strong> için zorlayıcı olabilir.
                      </p>
                    </div>

                    {/* CTA Paragraf */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-xl border border-blue-500/20">
                      <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                        Bu nedenle <strong>Malta dil okullarında eğitim alacak öğrencilerimiz için</strong>, ilk günlerde <strong>okul tarafından organize edilen havalimanı transfer hizmeti</strong> <strong>en güvenli ve pratik ulaşım seçeneği</strong> olarak önerilmektedir.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Malta Dil Okullarında Havalimanı Karşılama Nasıl Yapılır? */}
                <section 
                  id="havalimani-karsilama" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h3 
                    className="text-xl md:text-2xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Malta Dil Okullarında Havalimanı Karşılama Nasıl Yapılır?
                  </h3>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta'daki dil okulları, öğrenciler için <strong>havalimanı transfer sürecini farklı yöntemlerle organize edebilmektedir</strong>. Bazı okullarda öğrenciler, <strong>Malta Uluslararası Havalimanı'na (MLA) vardıklarında</strong> <strong>üzerinde isimlerinin yazılı olduğu bir karşılama kartı taşıyan transfer yetkilisi</strong> tarafından karşılanır. Bu yöntem özellikle <strong>ilk kez Malta'ya gelen öğrenciler</strong> için süreci oldukça kolaylaştırır.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      Bazı <strong>büyük dil okullarında</strong> ise <strong>havalimanı içerisinde, okulun anlaşmalı olduğu karşılama noktaları veya transfer ofisleri</strong> bulunur. Öğrenciler, <strong>kendilerine önceden iletilen bilgilere göre</strong> bu noktaya yönlendirilir ve buradan konaklamalarına transfer edilir. <strong>Hangi karşılama yönteminin uygulanacağı</strong>, okula ve transfer organizasyonuna göre değişiklik gösterebilir ve <strong>detaylar öğrencilerimize seyahat öncesinde net şekilde iletilir</strong>.
                    </p>
                  </div>
                </section>

                {/* FAQ Section */}
                <FAQSection slug={post.slug} />
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar popularPosts={popularPosts} />
                </div>
              </aside>
            </div>
          </div>
        </main>
      )}

      {/* Main Content with Sidebar - Hazırlık sayfası için */}
      {post.slug === 'malta-dil-okulu-gitmeden-once-hazirlik' && (
        <main className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 space-y-8">
                {/* Table of Contents */}
                <section id="içindekiler" className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
                  <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">
                      İçindekiler
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        <Link
                          href="#havalimaninda-neler-soruluyor"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            1
                          </span>
                          <span className="leading-relaxed">Havalimanında Neler Soruluyor?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#havalimanina-iner-inmez-bilmeniz-iyi-olur"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            2
                          </span>
                          <span className="leading-relaxed">Havalimanına İner İnmez Bilmeniz İyi Olur</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#konaklamaya-vardiktan-sonra"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            3
                          </span>
                          <span className="leading-relaxed">Konaklamaya Vardıktan Sonra Süreç Nasıl İlerliyor?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#ilk-gun-hazirligi"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            4
                          </span>
                          <span className="leading-relaxed">İlk Gün Hazırlığı ve Okul Oryantasyonu</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-hazirlik-faq"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            5
                          </span>
                          <span className="leading-relaxed">Malta Dil Okulu Hazırlık: Sık Sorulan Sorular (2026)</span>
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </section>

                {/* TOC Featured Image */}
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <figure className="relative w-full aspect-video">
                    <Image
                      src="/malta-dil-okulu-gitmeden-once-hazirlik.webp"
                      alt="Malta dil okuluna gitmeden önce hazırlık rehberi 2026 - Yolculuk, havalimanı süreci, ilk gün ve konaklama hazırlığı"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 896px"
                      priority={false}
                      itemProp="image"
                    />
                    <figcaption className="mt-3 px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Malta dil okuluna gitmeden önce hazırlık rehberi 2026. Malta'ya dil eğitimi için giderken yolculuk sırasında ve havaalanında karşılaşılan detaylar, ilk günün nasıl geçtiği ve konaklamaya varış sonrası süreç hakkında gerçek deneyimler.
                    </figcaption>
                  </figure>
                </div>

                {/* Havalimanında Neler Soruluyor? */}
                <section 
                  id="havalimaninda-neler-soruluyor" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Havalimanında Neler Soruluyor?
                  </h2>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Malta Uluslararası Havalimanı'na indiğinizde</strong> süreç genelde <strong>sakin ve hızlı ilerler</strong>. <strong>Pasaport kontrolünde sorulan sorular</strong> çoğu öğrenci için <strong>oldukça basittir</strong> ve <strong>kısa cevaplarla geçilir</strong>. En sık sorulanlar genellikle <strong>kaç hafta kalacağınız</strong>, <strong>hangi dil okuluna gittiğiniz</strong> ve <strong>nerede konaklayacağınız</strong> olur.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      Çoğu zaman <strong>pasaport ve vize yeterlidir</strong>. Nadiren <strong>okul kabul belgesi</strong> veya <strong>konaklama bilgisine</strong> bakmak isteyebilirler; bu durumda <strong>telefonunuzdan göstermeniz genellikle yeterli olur</strong>. Süreç <strong>bir sorgulama havasında değil</strong>, daha çok <strong>bilgi teyidi şeklinde</strong> ilerler.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>İlk kez yurt dışına çıkan öğrencilerin</strong> en çok yaşadığı şey, <strong>beklediklerinden çok daha rahat bir giriş süreci</strong> olmasıdır.
                    </p>
                  </div>
                </section>

                {/* Havalimanına İner İnmez Bilmeniz İyi Olur */}
                <section 
                  id="havalimanina-iner-inmez-bilmeniz-iyi-olur" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Havalimanına İner İnmez Bilmeniz İyi Olur
                  </h2>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Malta Havalimanı'na indiğiniz anda</strong> <strong>ücretsiz havalimanı Wi-Fi ağı</strong> kullanılabilir durumdadır. Bu sayede:
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-base text-slate-700 leading-relaxed ml-4">
                      <li><strong>Telefonunuzdan okul veya transfer detaylarını</strong> kontrol edebilirsiniz</li>
                      <li><strong>Ailenize güvenli bir şekilde indiğinizi</strong> haber verebilirsiniz</li>
                      <li><strong>Transfer almadıysanız taksi veya ulaşım seçeneklerine</strong> bakabilirsiniz</li>
                    </ul>

                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Wi-Fi genellikle terminal genelinde sorunsuz çalışır</strong> ve <strong>ilk girişte ekstra bir işlem gerektirmez</strong>. Bu da özellikle <strong>ilk kez Malta'ya gelen öğrenciler</strong> için <strong>rahatlatıcı bir detay</strong> olur.
                    </p>
                  </div>
                </section>

                {/* CTA: Havalimanı Transfer Süreci */}
                <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 lg:p-12 border border-blue-200/50 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/malta-dil-okullari-havalimani-transfer.webp"
                        alt="Malta dil okulları havalimanı transfer süreci - Havalimanından konaklamaya ulaşım rehberi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 448px"
                        priority={false}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Havalimanından Sonra Transfer Süreci Nasıl İşler?
                      </h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Malta Uluslararası Havalimanı'na indikten sonra <strong>konaklamanıza nasıl ulaşacağınız</strong>, <strong>okul transfer hizmeti</strong>, <strong>alternatif ulaşım seçenekleri</strong> ve <strong>transfer ücretleri</strong> hakkında detaylı bilgileri inceleyebilirsiniz.
                      </p>
                      <Link
                        href="/blog/malta-dil-okullari-havalimani-transfer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                      >
                        <span>Havalimanı Transfer Sürecini İncele</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Konaklamaya Vardıktan Sonra Süreç Nasıl İlerliyor? */}
                <section 
                  id="konaklamaya-vardiktan-sonra" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Konaklamaya Vardıktan Sonra Süreç Nasıl İlerliyor?
                  </h2>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Havalimanından çıktıktan</strong> ve <strong>transfer süreci tamamlandıktan sonra</strong> öğrenciler genellikle <strong>doğrudan konaklamalarına bırakılır</strong>. <strong>Aile yanı, öğrenci rezidansı veya apart konaklama</strong> fark etmeksizin, varışta çoğu zaman <strong>okulun yönlendirdiği görevli</strong> ya da <strong>konaklama sorumlusu</strong> sürece eşlik eder.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Aile yanı konaklamalarda</strong>, öğrenciler <strong>ev sahibi tarafından karşılanır</strong> ve <strong>oda, banyo kullanımı, ev kuralları ve günlük düzen</strong> kısaca anlatılır. <strong>Rezidans veya apart konaklamalarda</strong> ise görevli kişi, <strong>odanın nerede olduğunu</strong>, <strong>ortak alanları</strong> ve <strong>giriş–çıkış kurallarını</strong> gösterir. <strong>İlk anda her detayı hatırlamak zorunda değilsiniz</strong>; çoğu bilgi <strong>zaten yazılı olarak da paylaşılır</strong>.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>İlk gün genelde yerleşme ve dinlenme ile geçer</strong>. <strong>Uzun yolculuktan sonra</strong> öğrencilerin en çok söylediği şey, <strong>beklediklerinden daha düzenli ve rahat bir karşılama süreci</strong> yaşadıklarıdır. <strong>Okul ve konaklama ekipleri</strong>, özellikle <strong>ilk günlerde öğrencilerin ortama alışmasını kolaylaştıracak şekilde</strong> süreci yönlendirir.
                    </p>
                  </div>
                </section>

                {/* İlk Gün Hazırlığı */}
                <section 
                  id="ilk-gun-hazirligi" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    İlk Gün Hazırlığı ve Okul Oryantasyonu
                  </h2>
                  
                  <div className="space-y-4" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta'ya <strong>varışınızın ilk günü</strong>, <strong>okul oryantasyonu</strong> için önemlidir. <strong>Oryantasyon programı</strong>, genellikle <strong>ilk Pazartesi günü</strong> yapılır ve <strong>okul kuralları</strong>, <strong>ders programı</strong>, <strong>sosyal aktiviteler</strong> ve <strong>şehir rehberi</strong> gibi konuları içerir.
                    </p>

                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>İlk gün için hazırlık</strong> yaparken <strong>pasaport</strong>, <strong>vize</strong>, <strong>okul kabul mektubu</strong> ve <strong>konaklama adresi</strong> gibi belgeleri yanınızda bulundurmanız önerilir. <strong>Okul oryantasyonuna katılım</strong>, <strong>eğitim sürecinizin</strong> <strong>sorunsuz başlaması</strong> için önemlidir.
                    </p>
                  </div>
                </section>

                {/* FAQ Section */}
                <FAQSection slug={post.slug} />
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar popularPosts={popularPosts} />
                </div>
              </aside>
            </div>
          </div>
        </main>
      )}

      {/* Main Content with Sidebar - Vize sayfası için */}
      {post.slug === 'malta-vize-istiyor-mu' && (
        <main className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 space-y-8">
                {/* Table of Contents */}
                <section id="içindekiler" className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
                  <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">
                      İçindekiler
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        <Link
                          href="#malta-bordo-pasaport-vize"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            1
                          </span>
                          <span className="leading-relaxed">Malta Bordo Pasaportlulara Vize İstiyor mu?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-yesil-pasaport-vize"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            2
                          </span>
                          <span className="leading-relaxed">Malta Yeşil Pasaport Vize İstiyor mu?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-vizesiz-kac-gun"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            3
                          </span>
                          <span className="leading-relaxed">Malta'ya Vizesiz Kaç Gün Gidilebilir?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#schengen-180-gunde-90-gun-kurali"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            4
                          </span>
                          <span className="leading-relaxed">Schengen Hesaplaması: 180 Günde 90 Gün Kuralı Nedir?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-kisa-sureli-vize-turleri"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            5
                          </span>
                          <span className="leading-relaxed">Malta'da Kısa Süreli Vize Türleri Nelerdir?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-uzun-sureli-vize-turleri"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            6
                          </span>
                          <span className="leading-relaxed">Malta'da Uzun Süreli ve Diğer Vize Türleri</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-vize-faq"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            7
                          </span>
                          <span className="leading-relaxed">Malta Vizesi Hakkında Türkiye'den En Sık Sorulan Sorular (2026)</span>
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </section>

                {/* Featured Image */}
                {post.coverImage && (
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                    <figure className="relative w-full aspect-video">
                      <Image
                        src={post.coverImage}
                        alt={post.slug === 'malta-vize-istiyor-mu'
                          ? 'Malta vize gerekliliği 2026 - Türkiye Cumhuriyeti vatandaşları için Malta vize şartları, bordo ve yeşil pasaport farkları, Schengen vizesi başvuru süreci'
                          : post.slug === 'malta-dil-okullari-havalimani-transfer'
                          ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026 - Malta Uluslararası Havalimanı (MLA) transfer süreci, okul transferi, alternatif ulaşım seçenekleri ve transfer ücretleri'
                          : 'Malta adası coğrafi konumu ve Avrupa\'daki yeri - Akdeniz\'de Malta, Gozo ve Comino adaları'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 896px"
                        priority
                        itemProp="image"
                      />
                      <figcaption className="mt-3 px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                        {post.slug === 'malta-vize-istiyor-mu'
                          ? 'Malta vize gerekliliği 2026 yılı için Türkiye Cumhuriyeti vatandaşları. Bordo (umuma mahsus) pasaport sahipleri Malta\'ya giriş için Schengen vizesi almak zorundadır. Yeşil (hususi) pasaport sahipleri ise 180 gün içinde 90 güne kadar olan kısa süreli seyahatlerde vizeden muaftır. Malta, Schengen Bölgesi\'nde yer alan bir Avrupa Birliği ülkesidir.'
                          : post.slug === 'malta-dil-okullari-havalimani-transfer'
                          ? 'Malta dil okulları havalimanı transfer ve karşılama hizmeti 2026. Malta Uluslararası Havalimanı\'na (MLA) varışta, öğrenciler okul tarafından görevlendirilen transfer yetkilisi tarafından karşılanarak doğrudan konaklamalarına güvenli şekilde ulaştırılır. Gidiş-dönüş transfer ücretleri ortalama 50 Euro civarındadır.'
                          : 'Malta adası Akdeniz\'in ortasında, İtalya\'nın Sicilya Adası\'nın güneyinde yer alan bağımsız bir Avrupa ülkesidir. Malta, Gozo ve Comino adalarından oluşan takım adalar ülkesi.'}
                      </figcaption>
                    </figure>
                  </div>
                )}

                {/* Bordo ve Yeşil Pasaport Bölümleri */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Sol Bölüm - Bordo Pasaport */}
                  <article 
                    id="malta-bordo-pasaport-vize" 
                    className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 md:p-8 shadow-lg border border-orange-200/50 hover:shadow-xl transition-shadow"
                    itemScope 
                    itemType="https://schema.org/Article"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900" itemProp="headline">
                        Malta Bordo Pasaportlulara Vize İstiyor mu?
                      </h2>
                    </div>
                    
                    <div className="space-y-4 speakable-bordo-pasaport" itemProp="articleBody">
                      <p className="text-lg font-semibold text-slate-900 leading-relaxed">
                        Evet.
                      </p>
                      <p className="text-base text-slate-700 leading-relaxed">
                        <strong>Bordo (umuma mahsus) pasaport</strong> sahibi <strong>Türkiye Cumhuriyeti vatandaşlarının</strong> Malta'ya seyahat edebilmesi için <strong>vize alması zorunludur</strong>. Malta, <strong>Schengen Bölgesi'nde yer aldığı için</strong> bordo pasaportla yapılan turistik, ziyaret veya iş amaçlı seyahatlerde <strong>Schengen vizesi uygulanır</strong>.
                      </p>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Bordo pasaport sahipleri için vize gerekliliği, <strong>seyahatin süresine bakılmaksızın geçerlidir</strong>. Malta'ya kısa süreli dahi olsa bordo pasaportla <strong>vizesiz giriş mümkün değildir</strong>.
                      </p>
                    </div>
                  </article>

                  {/* Sağ Bölüm - Yeşil Pasaport */}
                  <article 
                    id="malta-yesil-pasaport-vize" 
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 shadow-lg border border-green-200/50 hover:shadow-xl transition-shadow"
                    itemScope 
                    itemType="https://schema.org/Article"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900" itemProp="headline">
                        Malta Yeşil Pasaport Vize İstiyor mu?
                      </h2>
                    </div>
                    
                    <div className="space-y-4 speakable-yesil-pasaport" itemProp="articleBody">
                      <p className="text-lg font-semibold text-slate-900 leading-relaxed">
                        Hayır.
                      </p>
                      <p className="text-base text-slate-700 leading-relaxed">
                        <strong>Yeşil (hususi) pasaport</strong> sahipleri, Malta'ya yapacakları <strong>90 güne kadar olan kısa süreli seyahatlerde vizeden muaftır</strong>. Bu muafiyet turistik, ziyaret ve kısa süreli iş amaçlı seyahatler için geçerlidir.
                      </p>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Ancak <strong>dil eğitimi, 90 günü aşan kalış veya çalışma</strong> gibi durumlarda yeşil pasaport sahipleri için de <strong>Malta vizesi gerekmektedir</strong>. Bu tür seyahatlerde vize gerekliliği, <strong>pasaporttan bağımsız olarak seyahat amacına göre</strong> değerlendirilir.
                      </p>
                    </div>
                  </article>
                </div>

                {/* Vizesiz Gün ve Schengen Kuralı Bölümleri */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <VisaFreeDaysSection />
                  <Schengen90180RuleSection />
                </div>

                {/* Öğrenci Vizesi CTA */}
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-10 shadow-2xl border-2 border-blue-400/50 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          Malta'da Eğitim Planlıyorsanız
                        </h3>
                        <p className="text-blue-50 text-lg leading-relaxed mb-6">
                          Malta'da eğitim planlayanlar için vize süreci, kısa süreli seyahatlerden farklıdır. Dil eğitimi, uzun süreli programlar ve work and study seçenekleri için hangi vizeye başvurmanız gerektiğini detaylı olarak inceleyebilirsiniz.
                        </p>
                        <Link
                          href="/malta-ogrenci-vizesi"
                          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <span>👉 Malta Öğrenci Vizesi Hakkında Detaylı Bilgi</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Malta'da Kısa Süreli Vize Türleri */}
                <section 
                  id="malta-kisa-sureli-vize-turleri" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Malta'da Kısa Süreli Vize Türleri Nelerdir?
                  </h2>
                  
                  <div className="space-y-6" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta, <strong>Schengen Bölgesi'nde yer aldığı için</strong> Türkiye Cumhuriyeti vatandaşlarına uygulanan kısa süreli vizeler, <strong>seyahatin amacına göre</strong> farklı kategoriler altında değerlendirilir. Aşağıda Malta için uygulanan kısa süreli vize türleri, genel hatlarıyla yer almaktadır:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">1</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Transit</h3>
                            <p className="text-sm text-slate-600">Malta üzerinden başka bir ülkeye aktarma yapan yolcular</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">2</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Turistik</h3>
                            <p className="text-sm text-slate-600">Tatil ve kısa süreli bireysel seyahatler</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">3</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Ticari</h3>
                            <p className="text-sm text-slate-600">İş toplantıları, fuarlar ve kısa süreli ticari ziyaretler</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">4</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Spor ve Kültürel</h3>
                            <p className="text-sm text-slate-600">Spor müsabakaları, kültürel etkinlikler ve organizasyonlar</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">5</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Aile ve Arkadaş Ziyareti</h3>
                            <p className="text-sm text-slate-600">Malta'da yaşayan yakınları ziyaret amacıyla yapılan seyahatler</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">6</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Eğitim</h3>
                            <p className="text-sm text-slate-600">90 günü aşmayan kısa süreli eğitim ve kurs programları</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">7</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">Erasmus Stajı</h3>
                            <p className="text-sm text-slate-600">Erasmus kapsamında yapılan kısa süreli staj programları</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">8</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">AB / AEA veya İsviçre Vatandaşlarının Aile Üyeleri</h3>
                            <p className="text-sm text-slate-600">Özel statüye tabi başvurular</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mt-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Bu vize türleri, <strong>kısa süreli Schengen vizesi</strong> kapsamında değerlendirilir ve kalış süresi <strong>180 gün içinde en fazla 90 gün</strong> ile sınırlıdır.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Malta'da Uzun Süreli ve Diğer Vize Türleri */}
                <section 
                  id="malta-uzun-sureli-vize-turleri" 
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                    itemProp="headline"
                  >
                    Malta'da Uzun Süreli ve Diğer Vize Türleri
                  </h2>
                  
                  <div className="space-y-6" itemProp="articleBody">
                    <p className="text-base text-slate-700 leading-relaxed">
                      Malta'ya sadece kısa süreli seyahatler değil, <strong>90 günü aşan kalışlar</strong> ve belirli amaçlar için yapılan başvurular da mümkündür. Bu tür vizeler, kısa süreli Schengen vizelerinden farklı olarak <strong>ulusal (D tipi) vize kategorisine girer</strong> ve ayrı işlem süreçlerine tabidir.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              Eğitim Amaçlı Uzun Dönem Vize
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              Malta'da uzun süreli dil eğitimi, yüksek lisans/üniversite programı veya benzeri eğitim faaliyetleri için başvuru yapılır. Bu durumda <strong>Malta öğrenci vizesi</strong> gerekebilir.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              Work and Study Vizesi
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              Eğitim + yasal çalışma imkânı sağlayan programlar için başvurulan vize türüdür. <strong>Uzun dönem kalışı ve çalışma koşullarını</strong> kapsar.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              Çalışma ve İkamet Vizeleri
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              Malta'da çalışmak veya belirli bir iş sözleşmesi ile uzun süre ikamet etmek isteyenler için <strong>ayrı başvuru süreçleri</strong> vardır.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              Aile Birleşimi ve Diğer Uzun Süreli Vizeler
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              Malta'da yaşayan aile bireyleriyle birleşmek veya diğer uzun süreli amaçlar için başvurulan vize türleri de <strong>ulusal vize kapsamındadır</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mt-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Bu uzun dönem vize türleri, kısa süreli Schengen vizelerinden farklı olarak <strong>pasaport türü ve kalış süresinden bağımsız şekilde</strong>, seyahat amacına ve program süresine göre değerlendirilir. Her bir kategori için gereken şartlar ve süreçler farklıdır; bu nedenle detaylı bilgi için ilgili sayfalara bakılması önerilir.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Kaynakça */}
                <section className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Kaynak
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Malta vize türleri ve kısa süreli başvuru kategorileri, VFS Global resmî başvuru sistemi esas alınarak hazırlanmıştır.{' '}
                    <Link
                      href="https://visa.vfsglobal.com/tur/tr/mlt/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      VFS Global Malta Vize Başvuru Sistemi
                    </Link>
                  </p>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar popularPosts={popularPosts} />
                </div>
              </aside>
            </div>
          </div>
        </main>
      )}

      {/* Main Content - Sadece malta-nerede sayfası için */}
      {post.slug === 'malta-nerede' && (
        <main className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 space-y-8">
                {/* Table of Contents */}
                <section id="içindekiler" className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
                  <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">
                      İçindekiler
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        <Link
                          href="#malta-turkiye-gore-nerede"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            1
                          </span>
                          <span className="leading-relaxed">Malta Türkiye'ye Göre Nerede?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-hangi-ulkede"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            2
                          </span>
                          <span className="leading-relaxed">Malta Hangi Ülkede? Nereye Bağlı?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-avrupa-birligi"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            3
                          </span>
                          <span className="leading-relaxed">Malta Avrupa'da mı? Avrupa Birliği Üyesi mi?</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#malta-nerede-faq"
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            4
                          </span>
                          <span className="leading-relaxed">Malta Hakkında Türkiye'den Sık Sorulan Sorular 2026</span>
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </section>

                {/* TOC Featured Image */}
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <figure className="relative w-full aspect-video">
                    <Image
                      src="/malta-nerede.jpg"
                      alt="Malta nerede? Malta adası coğrafi konumu ve Avrupa'daki yeri - Akdeniz'de Malta, Gozo ve Comino adaları"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 896px"
                      priority={false}
                      itemProp="image"
                    />
                    <figcaption className="mt-3 px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Malta adası coğrafi konumu ve Avrupa'daki yeri. Malta, Akdeniz'in ortasında, İtalya'nın Sicilya Adası'nın güneyinde yer alan bağımsız bir Avrupa ülkesidir. Malta, Gozo ve Comino adalarından oluşan takım adalar ülkesidir.
                    </figcaption>
                  </figure>
                </div>

                {/* Malta Türkiye'ye Göre Nerede Bölümü */}
                <section id="malta-turkiye-gore-nerede" className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm scroll-mt-8" itemScope itemType="https://schema.org/Article">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" itemProp="headline">
                    Malta Türkiye'ye Göre Nerede?
                  </h2>
                  
                  <div className="speakable-malta-turkiye" itemProp="articleBody">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Malta, Türkiye'nin batısında yer alan ve Akdeniz'in orta bölümünde konumlanan bir ada ülkesidir. Türkiye'den bakıldığında Malta, İtalya'nın güneyi ile Kuzey Afrika'nın kuzeyi arasında bulunur. Coğrafi olarak Güney Avrupa'ya dahil edilen Malta, Türkiye'ye göre Akdeniz üzerinden batı–güneybatı yönünde konumlanmaktadır.
                    </p>

                    {/* Harita Görseli */}
                    <figure className="mb-6">
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100">
                        <Image
                          src="/malta-turkiye-gore-nerede-harita.webp"
                          alt="Malta ve Türkiye arasındaki coğrafi konum haritası - Akdeniz üzerinde Malta'nın Türkiye'ye göre batı-güneybatı konumu"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
                          itemProp="image"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-slate-600 text-center">
                        Malta ve Türkiye arasındaki coğrafi konum haritası. Malta, Türkiye'nin batısında, Akdeniz'in orta bölümünde İtalya'nın güneyi ile Kuzey Afrika'nın kuzeyi arasında yer alır. Kuş uçuşu mesafe yaklaşık 1.400–1.600 kilometredir.
                      </figcaption>
                    </figure>

                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Türkiye ile Malta arasındaki kuş uçuşu mesafe yaklaşık <strong>1.400–1.600 kilometre</strong> arasındadır. Bu mesafe, Malta'nın Türkiye'ye doğrudan komşu olmamasına rağmen ulaşım açısından erişilebilir bir noktada yer aldığını gösterir. İstanbul'dan Malta'ya yapılan direkt uçuşlar ortalama <strong>2,5–3 saat</strong> sürerken, aktarmalı uçuşlarda bu süre uzayabilmektedir.
                    </p>

                    <p className="text-lg text-slate-700 leading-relaxed">
                      Türkiye'ye göre konumu sayesinde Malta, hem <strong>Avrupa'ya yakınlığı</strong> hem de <strong>Akdeniz iklimi</strong> ile öne çıkar. Bu coğrafi avantaj, Malta'yı Türkiye'den yapılan seyahatler açısından orta mesafeli ve kolay ulaşılabilir bir Avrupa ülkesi haline getirir.
                    </p>
                  </div>
                </section>

                {/* Malta Hangi Ülkede? Nereye Bağlı? Bölümü */}
                <section id="malta-hangi-ulkede" className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm scroll-mt-8" itemScope itemType="https://schema.org/Article">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" itemProp="headline">
                    Malta Hangi Ülkede? Nereye Bağlı?
                  </h2>
                  
                  <div className="speakable-malta-ulkede" itemProp="articleBody">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Malta, <strong>bağımsız bir ülkedir</strong> ve herhangi bir ülkeye bağlı değildir. Akdeniz'de yer alan bu ada ülkesi, <strong>Güney Avrupa'da</strong> bulunur ve kendi egemenliğine sahip bir devlet olarak kabul edilir.
                    </p>

                    <p className="text-lg text-slate-700 leading-relaxed">
                      Siyasi ve idari açıdan Malta, Avrupa kıtasına dahil bir ülkedir ve <strong>Avrupa Birliği üyesidir</strong>. Coğrafi olarak İtalya'ya yakınlığı nedeniyle sıkça "İtalya'ya mı bağlı?" sorusu sorulsa da, Malta İtalya'ya veya başka bir ülkeye bağlı değildir; <strong>kendi hükümeti ve yönetim sistemi</strong> olan bağımsız bir ada devletidir.
                    </p>
                  </div>
                </section>

                {/* Malta Avrupa'da mı? Avrupa Birliği Üyesi mi? Bölümü */}
                <section id="malta-avrupa-birligi" className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm scroll-mt-8" itemScope itemType="https://schema.org/Article">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" itemProp="headline">
                    Malta Avrupa'da mı? Avrupa Birliği Üyesi mi?
                  </h2>
                  
                  <div className="speakable-malta-avrupa" itemProp="articleBody">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      Malta, <strong>Avrupa kıtasında</strong> yer alan bir ülkedir ve <strong>Güney Avrupa ülkeleri</strong> arasında kabul edilir. Akdeniz'de bulunmasına rağmen coğrafi ve siyasi olarak <strong>Avrupa'nın bir parçasıdır</strong>.
                    </p>

                    <p className="text-lg text-slate-700 leading-relaxed">
                      Malta, <strong>2004 yılında Avrupa Birliği'ne üye</strong> olmuştur ve günümüzde AB'nin tam üyesidir. Avrupa Birliği üyeliği sayesinde Malta; <strong>Avrupa hukuk sistemi</strong>, <strong>serbest dolaşım</strong> ve <strong>ortak ekonomik yapıya</strong> dahil olan bağımsız bir Avrupa ülkesidir.
                    </p>
                  </div>
                </section>

                {/* FAQ Section */}
                <FAQSection slug={post.slug} />
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <BlogSidebar popularPosts={popularPosts} />
                </div>
              </aside>
            </div>
          </div>
        </main>
      )}

      {/* Önemli Sayfalar */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Malta'da İngilizce Eğitimi İçin Önemli Sayfalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Malta Dil Okulları */}
            <Link
              href="/malta-dil-okullari"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-slate-200"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                <Image
                  src="/malta-dil-okullari-2026.webp"
                  alt="Malta dil okulları - Program türleri ve eğitim seçenekleri"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  Malta Dil Okulları
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Malta'daki dil okulları, program türleri ve eğitim seçenekleri hakkında genel bilgiler.
                </p>
              </div>
            </Link>

            {/* Malta Dil Okulu Fiyatları */}
            <Link
              href="/malta-dil-okulu-fiyatlari"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-slate-200"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                <Image
                  src="/malta-dil-okulu-fiyatlari.webp"
                  alt="Malta dil okulu fiyatları - Eğitim ücretleri ve bütçe planlama"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  Malta Dil Okulu Fiyatları
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Malta'da dil eğitimi ücretleri, program süreleri ve bütçeye göre fiyat aralıkları.
                </p>
              </div>
            </Link>

            {/* Malta Öğrenci Vizesi */}
            <Link
              href="/malta-ogrenci-vizesi"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-slate-200"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                <Image
                  src="/malta-ogrenci-vizesi.webp"
                  alt="Malta öğrenci vizesi - Vize süreci ve gereklilikler"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  Malta Öğrenci Vizesi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Malta'da dil eğitimi almak isteyen öğrenciler için vize süreci ve temel gereklilikler.
                </p>
              </div>
            </Link>

            {/* Malta Work and Study */}
            <Link
              href="/malta-work-and-study"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-slate-200"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                <Image
                  src="/malta-hizmetler/malta-work-and-study.webp"
                  alt="Malta work and study - Çalışarak İngilizce öğrenme programı"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  Malta Work and Study
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  Malta'da dil eğitimi alırken yasal olarak çalışma imkânı sunan work and study sistemi.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
