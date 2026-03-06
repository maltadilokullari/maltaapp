'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { BlogPost } from '@/lib/blog/mockPosts';

interface BlogSidebarProps {
  popularPosts: BlogPost[];
}

export default function BlogSidebar({ popularPosts }: BlogSidebarProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    // Redirect to WhatsApp
    const message = encodeURIComponent('Merhaba, Malta dil okulları hakkında bilgi almak istiyorum.');
    window.open(`https://api.whatsapp.com/send/?phone=35699143066&text=${message}&type=phone_number&app_absent=0`, '_blank');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Merhaba, Malta dil okulları hakkında bilgi almak istiyorum.');
    window.open(`https://api.whatsapp.com/send/?phone=35699143066&text=${message}&type=phone_number&app_absent=0`, '_blank');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:sticky lg:top-24 space-y-8">
        {/* Consultation Form */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-blue-500">
          <h3 className="text-2xl font-bold text-white mb-2">
            Ücretsiz Danışmanlık
          </h3>
          <p className="text-blue-50 text-sm mb-6">
            Okul + konaklama seçeneklerini 10 dakikada çıkaralım.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white text-slate-900 placeholder-slate-400"
            />
            <Input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-white text-slate-900 placeholder-slate-400"
            />
            <Button type="submit" fullWidth size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Hemen Teklif Al
            </Button>
          </form>
          <Button
            type="button"
            variant="outline"
            fullWidth
            className="mt-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleWhatsApp}
          >
            WhatsApp ile İletişim
          </Button>
        </div>

        {/* Popular Posts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Popüler Yazılar
          </h3>
          <ul className="space-y-4">
            {popularPosts.map((post, index) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-3 hover:opacity-80 transition-opacity"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm text-slate-700 group-hover:text-blue-600 line-clamp-2">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile CTA Banner */}
      <div className="lg:hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-xl border-2 border-blue-500 mt-8">
        <h3 className="text-xl font-bold text-white mb-2">
          Ücretsiz Danışmanlık
        </h3>
        <p className="text-blue-50 text-sm mb-4">
          Okul + konaklama seçeneklerini 10 dakikada çıkaralım.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Ad Soyad"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-white text-slate-900 placeholder-slate-400"
          />
          <Input
            type="tel"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="bg-white text-slate-900 placeholder-slate-400"
          />
          <Button type="submit" fullWidth size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Hemen Teklif Al
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          fullWidth
          className="mt-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={handleWhatsApp}
        >
          WhatsApp ile İletişim
        </Button>
      </div>
    </>
  );
}
