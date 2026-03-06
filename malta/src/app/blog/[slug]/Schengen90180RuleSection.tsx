import React from 'react';

export default function Schengen90180RuleSection() {
  return (
    <section 
      id="schengen-180-gunde-90-gun-kurali" 
      className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-slate-200"
      itemScope 
      itemType="https://schema.org/Article"
    >
      <h2 
        className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
        itemProp="headline"
      >
        Schengen Hesaplaması: 180 Günde 90 Gün Kuralı Nedir?
      </h2>
      
      <div className="space-y-6 speakable-schengen-kurali" itemProp="articleBody">
        <p className="text-base text-slate-700 leading-relaxed">
          <strong>180 günde 90 gün kuralı</strong>, Schengen bölgesinde vizesiz veya kısa süreli Schengen vizesiyle seyahat edenler için geçerli bir kalış süresi sınırıdır. Kural basittir: <strong>Bugünden geriye doğru sayılan son 180 gün içinde Schengen'de geçirdiğiniz günlerin toplamı 90 günü geçemez</strong>. <strong>Malta Schengen ülkesi olduğundan</strong>, Malta'da geçirilen günler bu hesaba dahil edilir.
        </p>

        <p className="text-base text-slate-700 leading-relaxed">
          Bu hesaplama <strong>"takvim yılı"na göre yapılmaz</strong>; her gün yeniden hesaplanan <strong>kayan (rolling) bir dönem mantığıyla</strong> çalışır. Örneğin son 180 gün içinde Schengen'de toplam 60 gün kaldıysanız, teorik olarak 30 günlük daha hakkınız vardır; ancak <strong>giriş yaptığınız her gün bu pencere güncellendiği için kalan hak da değişebilir</strong>. Bu yüzden Malta seyahatini planlarken en doğru yöntem, <strong>son 180 gün içindeki giriş-çıkış günlerini net olarak saymaktır</strong>.
        </p>
      </div>
    </section>
  );
}
