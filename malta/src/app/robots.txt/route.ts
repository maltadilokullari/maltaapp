import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/sitemap/robots.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Robots.txt fetch failed');
    }

    const text = await response.text();

    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1 saat
      },
    });
  } catch (error) {
    console.error('Robots.txt error:', error);
    // Fallback robots.txt
    return new NextResponse(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /panel
Disallow: /preview
Disallow: /*?*
Disallow: /*&*

Sitemap: https://maltadilokuluingilizce.com/sitemap.xml
`, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}
