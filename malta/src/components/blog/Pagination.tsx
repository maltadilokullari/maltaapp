import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  baseUrl?: string;
  queryParams?: Record<string, string>;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  baseUrl = '/blog',
  queryParams = {},
}: PaginationProps) {
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    
    // Add existing query params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    
    // Add page number (skip if page 1)
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
  };
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Sayfa numaraları" className="flex justify-center items-center gap-2 py-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildPageUrl(currentPage - 1)}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Önceki sayfa"
        >
          ←
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed">
          ←
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildPageUrl(pageNum)}
              onClick={() => onPageChange(pageNum)}
              className={`
                min-w-[40px] px-4 py-2 rounded-lg font-medium transition-colors text-center
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
                }
              `}
              aria-label={`Sayfa ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildPageUrl(currentPage + 1)}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Sonraki sayfa"
        >
          →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed">
          →
        </span>
      )}
    </nav>
  );
}
