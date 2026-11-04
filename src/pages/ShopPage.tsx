import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { woocommerce } from '../services/woocommerce';
import { Product } from '../types';
import { HOMEPAGE_CATEGORIES_18 } from '../data/homepageCategories';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  categoryTitle?: string;
  categoryTitleAr?: string;
  categorySubtitle?: string;
  categorySubtitleAr?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  categoryTitle,
  categoryTitleAr,
  categorySubtitle,
  categorySubtitleAr
}) => {
  const { language, searchQuery, setSearchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // All 18 categories dynamically mapped from authentic WooCommerce store configuration
  const categories = [
    { id: 'all', name: 'All Collections', name_ar: 'جميع المنتجات' },
    ...HOMEPAGE_CATEGORIES_18.map((c) => ({
      id: c.slug,
      name: c.nameEn,
      name_ar: c.nameAr
    }))
  ];

  // Sync when initialCategory changes or navigated from category banner
  useEffect(() => {
    const saved = sessionStorage.getItem('eval_selected_category');
    if (saved) {
      setSelectedCategory(saved);
      sessionStorage.removeItem('eval_selected_category');
    } else if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const results = await woocommerce.getProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: sortBy
      });
      setProducts(results);
      setLoading(false);
    }
    fetchFiltered();
  }, [selectedCategory, searchQuery, sortBy]);

  const getPageHeading = () => {
    if (categoryTitle && language === 'en') return categoryTitle;
    if (categoryTitleAr && language === 'ar') return categoryTitleAr;

    const matched = categories.find((c) => c.id === selectedCategory);
    if (matched) {
      return language === 'ar' ? matched.name_ar : matched.name;
    }
    return language === 'ar' ? 'جميع المنتجات' : 'All Collections';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Category Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pb-4">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-medium font-mono">
          EVAL UAE · MAISON ATELIER
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-semibold text-white">
          {getPageHeading()}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          {categorySubtitle && language === 'en'
            ? categorySubtitle
            : categorySubtitleAr && language === 'ar'
            ? categorySubtitleAr
            : language === 'ar'
            ? 'مجوهرات وإكسسوارات مطلية بالذهب عيار 18 منقوشة بدقة ليزرية وفق أعلى معايير الفخامة الصامتة.'
            : 'Surgical stainless steel with 18K gold dipping, precision laser calligraphy, and lifetime tarnish warranty.'}
        </p>
      </div>

      {/* Filter & Category Controls Bar (Interactive Segmented Buttons with zero-pill discipline) */}
      <div className="space-y-4">
        {/* Category Horizontal Scroll Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1E1E1E]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer rounded-sm ${
                  isSelected
                    ? 'bg-[#C8A44D] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-[#141414] hover:bg-[#1E1E1E]'
                }`}
              >
                {language === 'ar' ? cat.name_ar : cat.name}
              </button>
            );
          })}
        </div>

        {/* Search status & Sort dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              {products.length} {language === 'ar' ? 'قطعة معروضة' : 'Creations'}
            </span>

            {searchQuery && (
              <div className="flex items-center gap-1.5 bg-[#1C1C1C] px-2.5 py-1 rounded text-xs text-neutral-300">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label className="text-xs text-neutral-400 whitespace-nowrap">
              {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141414] border border-[#2B2B2B] text-neutral-200 text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-[#C8A44D] cursor-pointer"
            >
              <option value="featured">{language === 'ar' ? 'المميز' : 'Featured'}</option>
              <option value="newest">{language === 'ar' ? 'الأحدث' : 'New Arrivals'}</option>
              <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
              <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-[#141414] animate-pulse rounded-sm" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-[#1E1E1E] rounded-sm space-y-4">
          <p className="text-sm text-neutral-300">
            {language === 'ar' ? 'لم يتم العثور على قطع تطابق بحثك.' : 'No bespoke creations found matching your query.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2 bg-[#C8A44D] text-black text-xs font-semibold uppercase tracking-wider"
          >
            {language === 'ar' ? 'عرض جميع القطع' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
