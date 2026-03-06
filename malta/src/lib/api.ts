const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Backend bağlantısını kontrol et
export async function checkBackendConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

export interface FormSubmissionData {
  fullName: string;
  phone: string;
  email: string;
  duration?: string;
  when?: string;
  source: 'hero' | 'contact-page' | 'blog-sidebar' | 'other';
  privacyAccepted: boolean;
  kvkkRead: boolean;
}

export interface SEOData {
  page: string;
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: {
    index: boolean;
    follow: boolean;
    maxImagePreview?: string;
    maxSnippet?: number;
    maxVideoPreview?: number;
  };
  isActive?: boolean;
}

export async function submitForm(data: FormSubmissionData): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Sunucu hatası' }));
      return {
        success: false,
        message: errorData.message || 'Form gönderilirken bir hata oluştu',
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Network hatası kontrolü
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        success: false,
        message: 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.',
      };
    }
    
    return {
      success: false,
      message: 'Form gönderilirken bir hata oluştu',
    };
  }
}

export async function getSEOByPage(page: string): Promise<SEOData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/seo/page/${encodeURIComponent(page)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 404 durumunda null döndür (SEO verisi yoksa normal)
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.warn(`SEO fetch failed for page "${page}": ${response.status}`);
      return null;
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    // Network hatası durumunda sessizce null döndür (SEO opsiyonel)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn(`SEO fetch failed for page "${page}": Backend connection error`);
      return null;
    }
    
    console.error('SEO fetch error:', error);
    return null;
  }
}

export interface VerificationData {
  google_site_verification?: string;
  bing_site_verification?: string;
  yandex_verification?: string;
  facebook_domain_verification?: string;
  pinterest_verification?: string;
  isActive?: boolean;
}

export async function getVerification(): Promise<VerificationData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Verification fetch failed: ${response.status}`);
      return null;
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    // Network hatası durumunda sessizce null döndür (verification opsiyonel)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn('Verification fetch failed: Backend connection error');
      return null;
    }
    
    console.error('Verification fetch error:', error);
    return null;
  }
}
