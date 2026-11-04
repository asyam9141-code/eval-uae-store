import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { PageView } from '../types';

export const Header: React.FC = () => {
  const {
    language,
    currentView,
    navigateTo,
    cartCount,
    openCartDrawer,
    wishlist,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; label_ar: string; view: PageView }[] = [
    { label: 'Shop All', label_ar: 'جميع المنتجات', view: 'shop' },
    { label: "Women's Accessories", label_ar: 'إكسسوارات نسائية', view: 'category-womens' },
    { label: "Men's Accessories", label_ar: 'إكسسوارات رجالية', view: 'category-mens' },
    { label: 'Car Accessories', label_ar: 'إكسسوارات السيارات', view: 'category-car' },
    { label: 'Personalized Gifts', label_ar: 'هدايا شخصية', view: 'category-personalized' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigateTo('shop');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#090909]/95 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-neutral-300 hover:text-[#C8A44D] transition-colors cursor-pointer"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="group text-left rtl:text-right cursor-pointer flex items-baseline gap-2"
            >
              <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-white group-hover:text-[#C8A44D] transition-colors uppercase whitespace-nowrap">
                EVAL
              </span>
              <span className="font-arabic text-xs sm:text-sm text-[#C8A44D] tracking-normal font-light">
                إيڤال
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wider uppercase text-neutral-300">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  className={`hover:text-[#C8A44D] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-2 ${
                    isActive ? 'text-[#C8A44D]' : ''
                  }`}
                >
                  <span>{language === 'ar' ? item.label_ar : item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A44D]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & User Utility Cluster */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-300 hover:text-[#C8A44D] transition-colors cursor-pointer"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex p-2 text-neutral-300 hover:text-[#C8A44D] transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8A44D]" />
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={() => navigateTo('account')}
              className="p-2 text-neutral-300 hover:text-[#C8A44D] transition-colors cursor-pointer"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag with Real-time Count */}
            <button
              onClick={openCartDrawer}
              className="flex items-center gap-2 px-3 py-2 bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#C8A44D]/50 text-white transition-all cursor-pointer rounded-sm"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C8A44D]" />
              <span className="text-xs font-semibold tabular-nums text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar Drawer Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#1F1F1F] bg-[#0E0E0E] py-4 px-4 sm:px-8">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#C8A44D] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث عن مجوهرات، قلائد الخط العربي، أزرار أكمام...' : 'Search bespoke name jewelry, calligraphy bar necklaces, cufflinks...'}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#C8A44D] text-black text-xs font-medium uppercase tracking-wider hover:bg-[#D6B866] transition-colors shrink-0"
              >
                {language === 'ar' ? 'بحث' : 'Search'}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 max-w-xs w-full bg-[#0E0E0E] border-r rtl:border-r-0 rtl:border-l border-[#222222] p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1F1F1F]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white">
                    EVAL
                  </span>
                  <span className="font-arabic text-xs text-[#C8A44D]">
                    إيڤال
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      navigateTo(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left rtl:text-right py-2 text-sm uppercase tracking-wider text-neutral-200 hover:text-[#C8A44D] transition-colors border-b border-[#1A1A1A]"
                  >
                    {language === 'ar' ? item.label_ar : item.label}
                  </button>
                ))}
                
                {/* Secondary navigation items */}
                <button
                  onClick={() => {
                    navigateTo('category-necklaces');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-neutral-400 hover:text-[#C8A44D]"
                >
                  {language === 'ar' ? 'القلائد والميداليات' : 'Necklaces & Pendants'}
                </button>
                <button
                  onClick={() => {
                    navigateTo('category-bracelets');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-neutral-400 hover:text-[#C8A44D]"
                >
                  {language === 'ar' ? 'الأساور والبناجر' : 'Bracelets & Bangles'}
                </button>
                <button
                  onClick={() => {
                    navigateTo('category-cufflinks');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-neutral-400 hover:text-[#C8A44D]"
                >
                  {language === 'ar' ? 'أزرار الأكمام' : 'Cufflinks'}
                </button>
                <button
                  onClick={() => {
                    navigateTo('category-keychains');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-neutral-400 hover:text-[#C8A44D]"
                >
                  {language === 'ar' ? 'ميداليات المفاتيح' : 'Keychains'}
                </button>
                <button
                  onClick={() => {
                    navigateTo('tracking');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-[#C8A44D] hover:underline"
                >
                  {language === 'ar' ? 'تتبع حالة طلبك' : 'Track Your Order'}
                </button>
                <button
                  onClick={() => {
                    navigateTo('woocommerce-sync');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left rtl:text-right py-1.5 text-xs text-neutral-500 hover:text-[#C8A44D]"
                >
                  WooCommerce Bridge Settings
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#1F1F1F] text-xs text-neutral-400 space-y-2">
              <p>{language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}</p>
              <p className="text-[#C8A44D] font-mono">WhatsApp: +971 4 800 EVAL</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
