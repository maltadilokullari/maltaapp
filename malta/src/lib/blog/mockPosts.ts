export type BlogCategory = 'Vize' | 'Konaklama' | 'Program' | 'Yaşam' | 'Hazırlık';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  coverImage: string;
  publishedAt: string;
  readingTime: number; // dakika
  isFeatured: boolean;
  popularityScore: number; // 0-100
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Malta Nerede? Malta Adası Avrupa\'da mı, Hangi Ülkeye Bağlıdır?',
    slug: 'malta-nerede',
    excerpt: 'Malta\'nın coğrafi konumu, Avrupa\'daki yeri ve siyasi durumu hakkında bilgiler. Malta nerede, hangi ülkeye bağlı ve Avrupa\'da mı?',
    category: 'Hazırlık',
    coverImage: '/malta-nerede.jpg',
    publishedAt: '2026-01-20',
    readingTime: 5,
    isFeatured: false,
    popularityScore: 90,
  },
  {
    id: '2',
    title: 'Malta Vize İstiyor mu? 2026 Türkiye İçin Bordo–Yeşil Pasaport Farkı',
    slug: 'malta-vize-istiyor-mu',
    excerpt: 'Malta vize istiyor mu? 2026 yılı için Türkiye Cumhuriyeti vatandaşları için vize gerekliliği, bordo ve yeşil pasaport farkları, Schengen vizesi ve öğrenci vizesi hakkında bilgiler.',
    category: 'Vize',
    coverImage: '/malta-vize-istiyor-mu.webp',
    publishedAt: '2026-01-22',
    readingTime: 6,
    isFeatured: false,
    popularityScore: 95,
  },
  {
    id: '3',
    title: 'Malta Dil Okulları Havalimanı Transferi ve Karşılama Hizmeti (2026)',
    slug: 'malta-dil-okullari-havalimani-transfer',
    excerpt: 'Malta dil okulları havalimanı transfer ve karşılama hizmeti. Okul tarafından organize edilen transfer, alternatif ulaşım seçenekleri ve transfer ücretleri hakkında bilgiler.',
    category: 'Hazırlık',
    coverImage: '/malta-dil-okullari-havalimani-transfer.webp',
    publishedAt: '2026-01-25',
    readingTime: 6,
    isFeatured: false,
    popularityScore: 75,
  },
  {
    id: '4',
    title: 'Malta Dil Okuluna Gitmeden Önce Hazırlık: Yolculuk ve İlk Gün Rehberi (2026)',
    slug: 'malta-dil-okulu-gitmeden-once-hazirlik',
    excerpt: 'Malta dil okuluna gitmeden önce yapılması gereken hazırlıklar. Vize, konaklama, uçak bileti, sağlık sigortası ve diğer önemli adımlar hakkında detaylı rehber.',
    category: 'Hazırlık',
    coverImage: '/malta-dil-okulu-gitmeden-once-hazirlik.webp',
    publishedAt: '2026-01-28',
    readingTime: 8,
    isFeatured: false,
    popularityScore: 85,
  },
];
