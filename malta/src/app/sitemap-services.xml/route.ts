import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/sitemap/sitemap-services.xml`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Sitemap services fetch failed');
    }

    const xml = await response.text();

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=43200, s-maxage=43200',
      },
    });
  } catch (error) {
    console.error('Sitemap services error:', error);
    return new NextResponse('Sitemap oluşturulurken bir hata oluştu', {
      status: 500,
    });
  }
}
