import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { HomepageCategorySection } from '../data/homepageCategories';
import { woocommerce } from '../services/woocommerce';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface CategoryProductSectionProps {
  section: HomepageCategorySection;
  isFirst?: boolean;
  onNavigateToCategory: (slug: string, nameAr: string, nameEn: string, wcId: number) => void;
}

export const CategoryProductSection: React.FC<CategoryProductSectionProps> = ({
  section,
  isFirst = false,
  onNavigateToCategory
}) => {
  const { language } = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>(section.products || []);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isRtl = language === 'ar';

  // Fetch latest products from live WooCommerce Store API for this category
  useEffect(() => {
    let isMounted = true;
    async function loadLiveProducts() {
      try {
        const liveProducts = await woocommerce.getStoreProductsByCategory(section.wcId, 10);
        if (isMounted && liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      } catch (err) {
        // Retain initial seeded products
      }
    }

    loadLiveProducts();
    return () => {
      isMounted = false;
    };
  }, [section.wcId]);

  // Update arrow states
  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
    // In RTL, scrollLeft can be 0 or negative depending on browser
    const maxScroll = scrollWidth - clientWidth;
    const absScroll = Math.abs(scrollLeft);
    
    setCanScrollLeft(absScroll > 10);
    setCanScrollRight(absScroll < maxScroll - 10);
  };

  const handleScroll = (direction: 'next' | 'prev') => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    
    // In RTL: scrolling "next" visually moves left (content from right to left)
    let delta = direction === 'next' ? scrollAmount : -scrollAmount;
    if (isRtl) {
      // In RTL browsers, negative scroll moves left
      delta = direction === 'next' ? -scrollAmount : scrollAmount;
    }

    sliderRef.current.scrollBy({
      left: delta,
      behavior: 'smooth'
    });
  };

  const handleShopNow = () => {
    onNavigateToCategory(section.slug, section.nameAr, section.nameEn, section.wcId);
  };

  return (
    <section className="relative w-full py-6 sm:py-8 border-b border-[#1A1A1A] last:border-b-0">
      {/* 1. Independent Category Banner */}
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] overflow-hidden rounded-2xl border border-[#C8A44D]/20 shadow-2xl group mb-6 bg-[#0E0E0E]">
        {/* Banner Image */}
        <img
          src={section.banner}
          alt={isRtl ? section.nameAr : section.nameEn}
          loading={isFirst ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-85"
          onError={(e) => {
            // Elegant fallback to primary atelier image if remote asset experiences timeout
            (e.target as HTMLImageElement).src = '/src/assets/images/eval_hero_campaign_1793755238154.jpg';
          }}
        />

        {/* Sophisticated Luxury Gradients for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent rtl:bg-gradient-to-l rtl:from-black/90 rtl:via-black/50 rtl:to-transparent" />

        {/* Banner Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 z-10">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3">
            {/* Elegant Tag / Collection Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#C8A44D]/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#C8A44D]" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#D6B866] font-mono">
                {isRtl ? `تشكيلة إيڤال الفاخرة #${section.order}` : `EVAL UAE COLLECTION #${section.order}`}
              </span>
            </div>

            {/* Category Name in Alexandria */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide font-arabic drop-shadow-md">
              {isRtl ? section.nameAr : section.nameEn}
            </h2>

            {/* Category Subtitle / Description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-medium line-clamp-2 max-w-xl font-arabic">
              {section.description}
            </p>

            {/* Shop Now CTA Button on Banner */}
            <div className="pt-2 sm:pt-3">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#C8A44D] via-[#D6B866] to-[#C8A44D] hover:brightness-110 text-black font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group/btn font-arabic"
              >
                <span>{isRtl ? 'تسوق الآن' : 'Shop Now'}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Subtle Gold Corner Glow */}
        <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-[#C8A44D]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Slider Header Toolbar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-[#C8A44D] rounded-full" />
          <h3 className="text-base sm:text-lg font-semibold text-white font-arabic">
            {isRtl ? `منتجات ${section.nameAr}` : `${section.nameEn} Selection`}
          </h3>
          <span className="text-xs text-[#C8A44D] font-mono px-2 py-0.5 rounded bg-[#C8A44D]/10 border border-[#C8A44D]/30">
            {products.length} {isRtl ? 'منتج' : 'items'}
          </span>
        </div>

        {/* Controls: Desktop Navigation Arrows + View All Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleShopNow}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#D6B866] hover:text-white transition-colors font-medium font-arabic px-3 py-1.5 rounded hover:bg-white/5"
          >
            <span>{isRtl ? 'عرض جميع المنتجات' : 'View All'}</span>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {/* Desktop Arrow Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('prev')}
              aria-label={isRtl ? 'السابق' : 'Previous'}
              className="w-8 h-8 rounded-full bg-[#141414] border border-white/10 hover:border-[#C8A44D] text-[#D6B866] hover:text-white hover:bg-[#C8A44D]/20 transition-all flex items-center justify-center active:scale-95 shadow-md"
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleScroll('next')}
              aria-label={isRtl ? 'التالي' : 'Next'}
              className="w-8 h-8 rounded-full bg-[#141414] border border-white/10 hover:border-[#C8A44D] text-[#D6B866] hover:text-white hover:bg-[#C8A44D]/20 transition-all flex items-center justify-center active:scale-95 shadow-md"
            >
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Smooth Product Slider (Touch Swipe on Mobile & Arrow Scroll on Desktop) */}
      <div className="relative group/slider">
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[220px] sm:w-[250px] md:w-[270px] lg:w-[290px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* End of Slider: "View All Products" Card */}
          <div className="flex-shrink-0 w-[180px] sm:w-[220px] snap-start flex items-stretch">
            <button
              onClick={handleShopNow}
              className="w-full h-full min-h-[300px] rounded-sm bg-[#121212] border border-dashed border-[#C8A44D]/30 hover:border-[#C8A44D] hover:bg-[#C8A44D]/10 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center space-y-3 group/end"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8A44D]/20 border border-[#C8A44D]/40 flex items-center justify-center text-[#D6B866] group-hover/end:scale-110 group-hover/end:bg-[#C8A44D] group-hover/end:text-black transition-all">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-white font-arabic">
                {isRtl ? 'عرض جميع المنتجات' : 'View All Products'}
              </p>
              <span className="text-xs text-[#D6B866] flex items-center gap-1 font-arabic">
                <span>{isRtl ? 'المزيد في هذا القسم' : 'Explore more'}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Bottom Link for Convenience */}
      <div className="mt-3 sm:hidden text-center">
        <button
          onClick={handleShopNow}
          className="inline-flex items-center gap-1.5 text-xs text-[#D6B866] font-medium py-1.5 font-arabic hover:underline"
        >
          <span>{isRtl ? `عرض كل منتجات ${section.nameAr}` : `View all in ${section.nameEn}`}</span>
          {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
};
