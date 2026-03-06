export type Tempo = 'Dengeli' | 'Yoğun' | 'Orta-yoğun';
export type Region = "St. Julian's" | "Sliema" | "Pembroke" | "Swieqi" | "San Gwann" | "St. Paul's / Gozo";

export interface School {
  slug: string;
  name: string;
  logo: string;
  description: string;
  region: Region;
  tempo: Tempo;
  suitableFor: string[];
  notSuitableFor: string[];
  summary: string;
  suitableForSummary: string;
}

export const schools: School[] = [
  {
    slug: 'ese-malta',
    name: 'ESE Malta',
    logo: '/malta-dil-okullari-karsilastirma/ese-malta.png',
    description: 'ESE Malta, sosyal ortamı güçlü ve dengeli öğrenme temposu arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle karışık ve pratike dayalıdır; konuşma pratiği doğal şekilde sürecin içine girer.',
    region: "St. Julian's",
    tempo: 'Dengeli',
    suitableFor: [
      "İlk kez Malta'da dil okuluna gidecek olanlar",
      'Konuşma pratiğini önceliklendiren öğrenciler',
      'Sosyal ortamdan öğrenme motivasyonu alanlar',
    ],
    notSuitableFor: [
      'Çok kısa sürede hızlı seviye atlamak isteyenler',
      'Yoğun akademik tempo ve baskı arayanlar',
    ],
    summary: "ESE Malta, Malta'da istikrarlı ve sosyal bir öğrenme deneyimi arayan öğrenciler için dengeli bir tercih sunar.",
    suitableForSummary: 'Sosyal + dengeli öğrenme isteyenler',
  },
  {
    slug: 'ec-malta',
    name: 'EC Malta',
    logo: '/malta-dil-okullari-karsilastirma/ec-malta.png',
    description: "EC Malta, uluslararası bir dil okulu zincirinin Malta'daki temsilcisidir. EC Malta, daha sistemli bir yapı ve dengeli öğrenme temposu arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle düzenlidir; ders içeriği planlı ilerler ve uluslararası öğrenci profili belirgindir.",
    region: "St. Julian's",
    tempo: 'Dengeli',
    suitableFor: [
      "İlk kez Malta'da dil okuluna gidecek olanlar",
      'Daha kontrollü ve düzenli bir öğrenme ortamı isteyenler',
      'Farklı milliyetlerle öğrenmeyi önemseyen öğrenciler',
    ],
    notSuitableFor: [
      'Çok yoğun ve hızlı ilerleme hedefleyenler',
      'Daha serbest ve sosyal ağırlıklı bir ortam arayanlar',
    ],
    summary: "EC Malta, Malta'da dengeli tempo ve yapı arayan öğrenciler için güvenli bir başlangıç sunar.",
    suitableForSummary: "İlk kez Malta'ya gidenler",
  },
  {
    slug: 'iels-malta',
    name: 'IELS Malta',
    logo: '/malta-dil-okullari-karsilastirma/iels-malta.png',
    description: 'IELS Malta, yoğun ders temposu ve hızlı ilerleme hedefi olan öğrenciler için öne çıkan bir okuldur. Program yapısı daha disiplinlidir; ders temposu yüksektir ve kısa sürede sonuç almak isteyenlere yöneliktir.',
    region: 'Sliema',
    tempo: 'Yoğun',
    suitableFor: [
      'Kısa sürede maksimum verim almak isteyenler',
      'Yoğun ders temposuna uyum sağlayabilen öğrenciler',
      'Hızlı seviye ilerlemesini hedefleyenler',
    ],
    notSuitableFor: [
      'Daha rahat ve sosyal ağırlıklı bir öğrenme deneyimi arayanlar',
      'Düşük tempolu, esnek program isteyenler',
    ],
    summary: "IELS Malta, Malta'da öğrenme hızını ders süresiyle değil, program temposuyla artırmak isteyen öğrenciler için güçlü bir seçenektir.",
    suitableForSummary: 'Hızlı ilerlemek isteyenler',
  },
  {
    slug: 'ace-english-malta',
    name: 'ACE English Malta',
    logo: '/malta-dil-okullari-karsilastirma/ace-english-malta.png',
    description: 'ACE English Malta, modern eğitim yaklaşımı ve tempolu ders yapısıyla kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur. Programlar disiplinlidir; ders içeriği planlı ve hedef odaklı ilerler.',
    region: "St. Julian's",
    tempo: 'Orta-yoğun',
    suitableFor: [
      'Kısa sürede ilerleme hedefleyen öğrenciler',
      'Tempolu ve yapılandırılmış dersleri tercih edenler',
      'Daha modern ve akademik odaklı bir öğrenme ortamı isteyenler',
    ],
    notSuitableFor: [
      'Daha rahat ve sosyal ağırlıklı bir deneyim arayanlar',
      'Düşük tempolu, esnek program beklentisi olanlar',
    ],
    summary: "ACE English Malta, Malta'da yoğun tempolu ve planlı bir eğitim süreci arayan öğrenciler için net bir seçenek sunar.",
    suitableForSummary: 'Modern yapı + tempolu eğitim',
  },
  {
    slug: 'am-language-malta',
    name: 'AM Language Malta',
    logo: '/malta-dil-okullari-karsilastirma/am-language-malta.png',
    description: 'AM Language Malta Dil Okulu, daha odaklı bir öğrenme ortamı ve dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur. Program yapısı pratike dayalıdır; sınıflar genellikle daha kontrollü ilerler ve öğrenme süreci yakından takip edilir.',
    region: 'Sliema',
    tempo: 'Dengeli',
    suitableFor: [
      'Daha sakin ve odaklı bir sınıf ortamı arayanlar',
      'Konuşma pratiğini düzenli şekilde geliştirmek isteyenler',
      'Küçük ölçekli okul yapısını tercih eden öğrenciler',
    ],
    notSuitableFor: [
      'Çok büyük ve kalabalık okul ortamı bekleyenler',
      'Yoğun ve hızlı tempolu program arayanlar',
    ],
    summary: "AM Language Malta Dil Okulu, Malta'da daha butik ve kontrollü bir öğrenme deneyimi arayan öğrenciler için dengeli bir seçenektir.",
    suitableForSummary: 'Daha odaklı sınıf ortamı arayanlar',
  },
  {
    slug: 'clubclass-malta',
    name: 'Clubclass Malta',
    logo: '/malta-dil-okullari-karsilastirma/Clubclass-malta.png',
    description: 'Clubclass Malta, daha sakin bir öğrenme ortamı ve dengeli bir tempo arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle daha düzenlidir; programlar istikrarlı ilerler ve yoğun baskı oluşturmaz.',
    region: 'Swieqi',
    tempo: 'Dengeli',
    suitableFor: [
      'Daha sakin ve kontrollü bir sınıf ortamı isteyenler',
      'Uzun süreli, istikrarlı ilerlemeyi hedefleyen öğrenciler',
      'Beklenti–deneyim dengesini önemseyenler',
    ],
    notSuitableFor: [
      'Çok sosyal ve hareketli bir okul ortamı arayanlar',
      'Yoğun ve hızlı ilerleme hedefi olanlar',
    ],
    summary: "Clubclass Malta, Malta'da daha sade bir yapı içinde istikrarlı öğrenme arayan öğrenciler için dengeli bir seçenektir.",
    suitableForSummary: 'Uygun bütçe + temel eğitim',
  },
  {
    slug: 'gateway-malta',
    name: 'Gateway Malta',
    logo: '/malta-dil-okullari-karsilastirma/gateway-malta.png',
    description: 'Gateway Malta Dil Okulu, daha küçük ölçekli ve sakin bir okul yapısı arayan öğrenciler için öne çıkan bir okuldur. Sınıf ortamı genellikle daha sessizdir; öğrenme süreci bireysel odaklı ve dengeli ilerler.',
    region: 'San Gwann',
    tempo: 'Dengeli',
    suitableFor: [
      'Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler',
      'Kalabalık ve çok sosyal okul yapılarından hoşlanmayan öğrenciler',
      'Daha bireysel bir sınıf deneyimi arayanlar',
    ],
    notSuitableFor: [
      'Hareketli ve sosyal ağırlıklı bir okul ortamı arayanlar',
      'Yoğun tempolu ve hızlı ilerleme hedefleyenler',
    ],
    summary: "Gateway Malta Dil Okulu, Malta'da daha sade ve sakin bir öğrenme deneyimi arayan öğrenciler için istikrarlı bir alternatif sunar.",
    suitableForSummary: 'Daha ekonomik ve sakin bir ortam arayanlar',
  },
  {
    slug: 'inlingua-malta',
    name: 'inlingua Malta',
    logo: '/malta-dil-okullari-karsilastirma/inlingua-malta.png',
    description: 'inlingua Malta, daha akademik ve yapılandırılmış bir öğrenme yaklaşımı arayan öğrenciler için öne çıkan bir okuldur. Ders içerikleri sistematik ilerler; sınıf ortamı genellikle daha kontrollü ve odaklıdır.',
    region: 'Sliema',
    tempo: 'Dengeli',
    suitableFor: [
      'Daha akademik ve planlı bir öğrenme süreci isteyenler',
      'Dil bilgisini yapılandırarak ilerlemeyi tercih eden öğrenciler',
      'Daha sakin ve disiplinli sınıf ortamını önemseyenler',
    ],
    notSuitableFor: [
      'Sosyal ağırlıklı ve serbest bir okul deneyimi arayanlar',
      'Yoğun ama esnek olmayan programlardan çabuk sıkılanlar',
    ],
    summary: "inlingua Malta Dil Okulu, Malta'da daha sistemli ve disiplinli bir dil eğitimi arayan öğrenciler için odaklı bir alternatiftir.",
    suitableForSummary: 'Daha sakin + düzenli ilerleme',
  },
  {
    slug: 'atlas-malta',
    name: 'Atlas Malta',
    logo: '/malta-dil-okullari-karsilastirma/atlas-logo.webp',
    description: 'Atlas Malta Dil Okulu, daha küçük ölçekli, düzenli ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle kontrollüdür; öğrenme süreci istikrarlı ilerler ve bireysel takip ön plandadır.',
    region: 'Pembroke',
    tempo: 'Dengeli',
    suitableFor: [
      'Daha sakin ve odaklı bir sınıf ortamı isteyenler',
      'Küçük ölçekli okul yapısını tercih eden öğrenciler',
      'Düzenli ve istikrarlı ilerlemeyi önemseyenler',
    ],
    notSuitableFor: [
      'Çok sosyal ve hareketli okul ortamı arayanlar',
      'Yoğun ve hızlı ilerleme beklentisi olanlar',
    ],
    summary: "Atlas Malta Dil Okulu, Malta'da daha sade ve kontrollü bir yapı içinde istikrarlı öğrenme arayan öğrenciler için dengeli bir alternatiftir.",
    suitableForSummary: 'Butik okul isteyenler',
  },
  {
    slug: 'bels-malta',
    name: 'BELS Malta',
    logo: '/malta-dil-okullari-karsilastirma/belsmalta.png',
    description: 'BELS Malta Dil Okulu, daha küçük sınıflar ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan butik bir dil okuludur. Eğitim yaklaşımı bireysel takibe dayanır; sınıf ortamı genellikle sessiz ve odaklıdır.',
    region: "St. Paul's / Gozo",
    tempo: 'Dengeli',
    suitableFor: [
      'Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler',
      'Küçük sınıflarda birebir ilgi bekleyen öğrenciler',
      'Sosyal ortamdan çok öğrenmeye odaklanmak isteyenler',
    ],
    notSuitableFor: [
      'Büyük ve hareketli okul ortamı arayanlar',
      'Yoğun ve hızlı ilerleme hedefleyenler',
    ],
    summary: "BELS Malta Dil Okulu, Malta'da daha butik ve bireysel bir dil eğitimi deneyimi arayan öğrenciler için net bir alternatif sunar.",
    suitableForSummary: 'Butik + düşük kalabalık isteyenler',
  },
];

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find((school) => school.slug === slug);
}

export function getAllRegions(): Region[] {
  return Array.from(new Set(schools.map((school) => school.region))).sort();
}

export function getAllTempos(): Tempo[] {
  return Array.from(new Set(schools.map((school) => school.tempo))).sort();
}
