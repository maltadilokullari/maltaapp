import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getSEOByPage, SEOData } from './api';

export function useSEO() {
  const pathname = usePathname();
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSEO = async () => {
      setLoading(true);
      // Normalize pathname for SEO lookup
      const page = pathname === '/' ? '/' : pathname;
      const data = await getSEOByPage(page);
      setSeoData(data);
      setLoading(false);
    };

    fetchSEO();
  }, [pathname]);

  return { seoData, loading };
}
