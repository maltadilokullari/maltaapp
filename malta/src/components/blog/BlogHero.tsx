'use client';

import Input from '../ui/Input';
import { BlogCategory } from '@/lib/blog/mockPosts';

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: BlogCategory | null;
  onCategorySelect: (category: BlogCategory | null) => void;
  sortBy: 'newest' | 'popular';
  onSortChange: (sort: 'newest' | 'popular') => void;
}

const categories: BlogCategory[] = ['Vize', 'Konaklama', 'Program', 'Yaşam', 'Hazırlık'];

export default function BlogHero({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
}: BlogHeroProps) {
  const hasActiveFilters = selectedCategory !== null || searchQuery.trim() !== '';

  const handleClearFilters = () => {
    onCategorySelect(null);
    onSearchChange('');
  };

  return (
    <header className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title & Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Blog | Malta Dil Okulları
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Malta'da dil okulu planlayan öğrenciler için hazırladığımız blog yazılarında; vize süreci, konaklama, fiyatlar, ulaşım ve öğrenci yaşamına dair güncel bilgileri paylaşıyoruz. Gerçek öğrenci deneyimleri, pratik ipuçları ve sık sorulan sorularla Malta'ya daha hazırlıklı gidin.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <Input
            type="search"
            placeholder="Rehberlerde ara..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Chips & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <button
              onClick={() => onCategorySelect(null)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
              >
                {category}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 transition-colors"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'popular')}
              className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="newest">Yeni</option>
              <option value="popular">Popüler</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
