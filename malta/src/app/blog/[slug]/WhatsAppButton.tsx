'use client';

import Button from '@/components/ui/Button';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Merhaba, Malta dil okulları hakkında bilgi almak istiyorum.');
    window.open(`https://api.whatsapp.com/send/?phone=35699143066&text=${message}&type=phone_number&app_absent=0`, '_blank');
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
      onClick={handleWhatsApp}
    >
      WhatsApp ile İletişim
    </Button>
  );
}
