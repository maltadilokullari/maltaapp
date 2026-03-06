import React from 'react';
import HighlightCard from '@/components/blog/HighlightCard';

export default function VisaFreeDaysSection() {
  return (
    <section 
      id="malta-vizesiz-kac-gun" 
      className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200"
      itemScope 
      itemType="https://schema.org/Article"
    >
      <h2 
        className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
        itemProp="headline"
      >
        Malta'ya Vizesiz Kaç Gün Gidilebilir?
      </h2>
      
      <div className="space-y-6 speakable-vizesiz-gun" itemProp="articleBody">
        <p className="text-base text-slate-700 leading-relaxed">
          <strong>Yeşil (hususi) pasaport</strong> sahipleri, Malta'ya kısa süreli seyahatlerde <strong>vizesiz gidebilir</strong>. Ancak bu vizesiz giriş, <strong>Schengen bölgesinde geçerli olan "180 günde 90 gün" kuralına tabidir</strong>. Yani Malta'da (ve Schengen ülkelerinde) vizesiz kalış süresi, tek seferde alınan bir "90 gün" hakkı değil; <strong>son 180 gün içindeki toplam kalış günlerinin hesabıdır</strong>.
        </p>

        <p className="text-base text-slate-700 leading-relaxed">
          Malta'ya sık gidip gelenler için önemli nokta şudur: Malta'da vizesiz kalabileceğiniz gün sayısı, <strong>önceki Schengen giriş-çıkışlarınıza göre azalabilir veya artabilir</strong>. Bu nedenle seyahat planı yaparken, yalnızca bilet tarihine değil <strong>son 180 gündeki toplam kalış süresine göre</strong> hareket edilmelidir.
        </p>

        <HighlightCard 
          text="Malta'da vizesiz kalış hakkı 90 gün diye sabit değildir. Son 180 gün içinde toplam 90 gün kuralına göre hesaplanır."
          variant="warning"
        />
      </div>
    </section>
  );
}
