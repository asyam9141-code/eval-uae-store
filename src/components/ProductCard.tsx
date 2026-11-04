import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    formatPrice,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', product.slug);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product_id: product.id,
      product: product,
      quantity: 1,
      price: product.price,
      personalization: product.personalization_supported
        ? {
            engravingText: product.personalization_options?.defaultText || 'EVAL',
            arabicEngravingText: product.personalization_options?.defaultArabicText || 'إيڤال',
            fontStyle: 'Diwani Calligraphy',
            metal: '18K Royal Gold',
            includeGiftBox: true
          }
        : undefined
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#121212] border border-[#1E1E1E] hover:border-[#C8A44D]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-sm overflow-hidden hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-[#C8A44D]/5"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Minimal Tags (Zero-Pill discipline: clean quiet text badge) */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-1 pointer-events-none">
          {product.on_sale && product.regular_price && (
            <span className="text-[10px] tracking-widest uppercase bg-[#C8A44D] text-black font-bold px-2 py-0.5 shadow-sm">
              {language === 'ar' ? 'عرض خاص' : 'Privilege Sale'}
            </span>
          )}
          {product.is_best_seller && (
            <span className="text-[10px] tracking-widest uppercase bg-[#181818]/90 text-white font-medium px-2 py-0.5 border border-white/10 backdrop-blur-sm">
              {language === 'ar' ? 'الأكثر طلباً' : 'Signature'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-[#C8A44D] transition-colors cursor-pointer"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorited ? 'fill-[#C8A44D] text-[#C8A44D]' : 'text-white'
            }`}
          />
        </button>

        {/* Quick Personalize hover indicator */}
        {product.personalization_supported && (
          <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1.5 text-[10px] text-[#C8A44D] bg-black/75 backdrop-blur-md px-2.5 py-1 border border-[#C8A44D]/30 pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#C8A44D]" />
            <span className="font-medium">
              {language === 'ar' ? 'نقش مخصص بالخط العربي' : 'Custom Engraving Available'}
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category */}
          <p className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-1">
            {language === 'ar' ? product.category_name_ar : product.category_name}
          </p>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#C8A44D] transition-colors line-clamp-1 font-serif-luxury">
            {language === 'ar' ? product.name_ar : product.name}
          </h3>

          {/* Quiet Rating */}
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
            <div className="flex text-[#C8A44D]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#C8A44D] text-[#C8A44D]'
                      : 'text-neutral-600'
                  }`}
                />
              ))}
            </div>
            <span className="tabular-nums font-mono">({product.rating_count})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold tabular-nums text-[#C8A44D]">
              {formatPrice(product.price)}
            </span>
            {product.regular_price && product.regular_price > product.price && (
              <span className="text-xs tabular-nums text-neutral-500 line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2 bg-[#1A1A1A] hover:bg-[#C8A44D] text-white hover:text-black border border-[#2D2D2D] hover:border-[#C8A44D] transition-all rounded-sm flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={language === 'ar' ? 'أضف للحقيبة' : 'Add to Bag'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">
              {language === 'ar' ? 'أضف' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
