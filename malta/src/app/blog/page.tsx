'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockPosts, BlogPost, BlogCategory } from '@/lib/blog/mockPosts';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Pagination from '@/components/blog/Pagination';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read from URL params
  const urlPage = parseInt(searchParams.get('page') || '1', 10);
  const urlCategory = searchParams.get('category') as BlogCategory | null;
  const urlQuery = searchParams.get('q') || '';
  const urlSort = (searchParams.get('sort') as 'newest' | 'popular') || 'newest';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(urlCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>(urlSort);
  const [currentPage, setCurrentPage] = useState(urlPage);

  // Sync state with URL on mount
  useEffect(() => {
    setSearchQuery(urlQuery);
    setSelectedCategory(urlCategory);
    setSortBy(urlSort);
    setCurrentPage(urlPage);
  }, [urlQuery, urlCategory, urlSort, urlPage]);

  // Update URL when filters change
  const updateURL = (updates: {
    page?: number;
    category?: BlogCategory | null;
    q?: string;
    sort?: 'newest' | 'popular';
  }) => {
    const params = new URLSearchParams();
    
    const newPage = updates.page !== undefined ? updates.page : currentPage;
    const newCategory = updates.category !== undefined ? updates.category : selectedCategory;
    const newQuery = updates.q !== undefined ? updates.q : searchQuery;
    const newSort = updates.sort !== undefined ? updates.sort : sortBy;

    if (newPage > 1) params.set('page', newPage.toString());
    if (newCategory) params.set('category', newCategory);
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newSort !== 'newest') params.set('sort', newSort);

    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...mockPosts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Separate featured and regular posts
  const featuredPosts = useMemo(() => {
    return filteredAndSortedPosts.filter((post) => post.isFeatured).slice(0, 3);
  }, [filteredAndSortedPosts]);

  const regularPosts = useMemo(() => {
    return filteredAndSortedPosts.filter((post) => !post.isFeatured);
  }, [filteredAndSortedPosts]);

  // Pagination
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return regularPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [regularPosts, currentPage]);

  // Popular posts for sidebar (top 5 by popularity)
  const popularPosts = useMemo(() => {
    return [...mockPosts]
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 5);
  }, []);

  // Reset to page 1 when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURL({ q: query, page: 1 });
  };

  const handleCategorySelect = (category: BlogCategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({ category, page: 1 });
  };

  const handleSortChange = (sort: 'newest' | 'popular') => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL({ sort, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page });
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors">
                Anasayfa
              </Link>
            </li>
            <li className="text-slate-400" aria-hidden="true">
              ›
            </li>
            <li>
              <span className="text-slate-900 font-medium">Blog</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

      {/* Main Content */}
      <main className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              {paginatedPosts.length > 0 ? (
                <>
                  <BlogGrid posts={paginatedPosts} />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      queryParams={{
                        ...(selectedCategory && { category: selectedCategory }),
                        ...(searchQuery.trim() && { q: searchQuery.trim() }),
                        ...(sortBy !== 'newest' && { sort: sortBy }),
                      }}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <p className="text-slate-600 text-lg mb-2">Aradığınız kriterlere uygun içerik bulunamadı.</p>
                  <p className="text-slate-500 text-sm">
                    Farklı bir arama terimi veya kategori deneyebilirsiniz.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar popularPosts={popularPosts} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
