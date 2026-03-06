'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, Drawer, Button } from 'antd';
import type { MenuProps } from 'antd';

const menuItems = [
  { key: '/malta-dil-okullari', label: 'Malta Dil Okulları' },
  { key: '/malta-dil-okulu-fiyatlari', label: 'Malta Dil Okulu Fiyatları' },
  { key: '/malta-work-and-study', label: 'Malta Work And Study' },
  { key: '/malta-ogrenci-vizesi', label: 'Malta Öğrenci Vizesi' },
  { key: '/malta-yaz-okullari', label: 'Malta Yaz Okulları' },
  { key: '/blog', label: 'Blog' },
  { key: '/biz-kimiz', label: 'Biz Kimiz?' },
  { key: '/iletisim', label: 'İletişim', type: 'contact' as const },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set selected menu item based on current pathname
  useEffect(() => {
    if (pathname === '/malta-dil-okullari' || pathname.startsWith('/malta-dil-okullari/')) {
      setSelectedKeys(['/malta-dil-okullari']);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [pathname]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const key = e.key as string;
    if (key === '/iletisim') {
      router.push('/iletisim');
    } else {
      router.push(key);
    }
    setIsMobileMenuOpen(false);
  };

  // Prepare menu items for Ant Design Menu
  const regularMenuItems: MenuProps['items'] = menuItems
    .filter((item) => item.type !== 'contact')
    .map((item) => ({
      key: item.key,
      label: item.label,
    }));

  const contactMenuItem = menuItems.find((item) => item.type === 'contact');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 min-h-[80px] items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo-header.png"
              alt="Logo"
              width={180}
              height={48}
              priority
              className="h-12 w-auto max-w-[180px]"
            />
          </Link>

          {/* Desktop Menu - Yan Yana Linkler */}
          <nav className="hidden sm:flex sm:items-center sm:gap-6">
            {menuItems
              .filter((item) => item.type !== 'contact')
              .map((item) => (
                <Link
                  key={item.key}
                  href={item.key}
                  className={`text-sm font-semibold transition-colors ${
                    selectedKeys.includes(item.key)
                      ? 'text-slate-900'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            {contactMenuItem && (
              <Link
                href="/iletisim"
                className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors ${
                  selectedKeys.includes('/iletisim')
                    ? 'bg-slate-900'
                    : 'bg-black hover:bg-slate-900'
                }`}
              >
                {contactMenuItem.label}
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button - Sadece Mobilde Görünür */}
          <Button
            type="text"
            onClick={() => setIsMobileMenuOpen(true)}
            className="sm:hidden flex-shrink-0 ml-2"
            aria-label="Toggle menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              color: '#1e293b',
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu - Ant Design Drawer */}
      <Drawer
   
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={280}
        styles={{
          body: { padding: 0 },
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          items={[
            ...regularMenuItems,
            {
              key: '/iletisim',
              label: contactMenuItem?.label || 'İletişim',
              style: {
                backgroundColor: selectedKeys.includes('/iletisim') ? '#0f172a' : '#000',
                color: '#fff',
                marginTop: '8px',
                borderRadius: '8px',
              },
            },
          ]}
          style={{
            border: 'none',
          }}
        />
      </Drawer>
    </header>
  );
}
