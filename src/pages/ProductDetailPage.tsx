import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { woocommerce } from '../services/woocommerce';
import { Product, ProductReview } from '../types';
import { PersonalizationVisualizer } from '../components/PersonalizationVisualizer';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Share2,
  Check,
  CheckCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    language,
    formatPrice,
    addToCart,
    navigateTo,
    toggleWishlist,
    isInWishlist,
    t
  } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [copiedLink, setCopiedLink] = useState(false);
  const [personalization, setPersonalization] = useState<{
    engravingText: string;
    arabicEngravingText: string;
    fontStyle: string;
    metal: string;
    includeGiftBox: boolean;
  }>({
    engravingText: 'Noora',
    arabicEngravingText: 'نورا',
    fontStyle: 'Diwani Calligraphy',
    metal: '18K Royal Gold',
    includeGiftBox: true
  });

  useEffect(() => {
    async function loadProduct() {
      const p = await woocommerce.getProductBySlug(slug);
      if (p) {
        setProduct(p);
        setSelectedImageIndex(0);
        // Load related items
        const related = await woocommerce.getProducts({ category: p.category_id });
        setRelatedProducts(related.filter((item) => item.id !== p.id).slice(0, 4));
      }
    }
    loadProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-2 border-[#C8A44D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400 text-sm">{language === 'ar' ? 'جاري تحميل القطعة...' : 'Loading bespoke creation...'}</p>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      product: product,
      quantity: quantity,
      price: product.price,
      personalization: product.personalization_supported ? personalization : undefined
    });
  };

  const handleBuyNow = () => {
    addToCart({
      product_id: product.id,
      product: product,
      quantity: quantity,
      price: product.price,
      personalization: product.personalization_supported ? personalization : undefined
    });
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">
          {language === 'ar' ? 'الرئيسية' : 'Home'}
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-white cursor-pointer">
          {language === 'ar' ? 'المتجر' : 'Shop'}
        </button>
        <span>/</span>
        <span className="text-[#C8A44D] truncate max-w-xs font-medium">
          {language === 'ar' ? product.name_ar : product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Gallery & Zoom (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] bg-neutral-950 rounded-sm overflow-hidden border border-[#222222] group shadow-2xl">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Sale / Tag badge */}
            {product.on_sale && product.regular_price && (
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-[#C8A44D] text-black font-bold text-[11px] uppercase tracking-widest px-2.5 py-1 shadow-md">
                {language === 'ar' ? 'خصم حصري' : 'Privilege Offer'}
              </div>
            )}

            {/* Share link button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 bg-black/70 hover:bg-black text-white hover:text-[#C8A44D] rounded-full border border-white/10 transition-colors backdrop-blur-sm cursor-pointer"
              title="Share"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#C8A44D]' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Craftsmanship Note below Gallery */}
          <div className="bg-[#121212] border border-[#222222] p-5 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C8A44D] font-medium tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#C8A44D]" />
              <span>{language === 'ar' ? 'مواصفات الفخامة الصامتة في إيڤال' : 'Quiet Luxury Standards'}</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {language === 'ar'
                ? 'مصنوعة من الفولاذ الجراحي عيار 316L ومطلية بـ 2.5 ميكرون من الذهب الملكي عيار 18 باستخدام تقنية الترسيب الفزيائي للبخار (PVD) المعتمدة لدى أرقى دور الساعات السويسرية.'
                : 'Forged from surgical 316L stainless steel with 2.5-micron 18K gold physical vapor deposition (PVD). Tarnish-proof, hypollergenic, and guaranteed safe for daily wear.'}
            </p>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
              <span>{language === 'ar' ? product.category_name_ar : product.category_name}</span>
              <span className="text-[#C8A44D]">{product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white leading-tight">
              {language === 'ar' ? product.name_ar : product.name}
            </h1>

            {/* Ratings & Reviews Count */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-[#C8A44D]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-[#C8A44D] text-[#C8A44D]' : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {product.rating} ({product.rating_count} {language === 'ar' ? 'تقييم موثق' : 'verified reviews'})
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-[#141414] border border-[#222222] rounded-sm flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold tabular-nums text-white">
                  {formatPrice(product.price)}
                </span>
                {product.regular_price && product.regular_price > product.price && (
                  <span className="text-sm tabular-nums text-neutral-500 line-through">
                    {formatPrice(product.regular_price)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {language === 'ar' ? 'شامل ضريبة القيمة المضافة والشحن المجاني' : 'Includes UAE VAT & complimentary delivery'}
              </p>
            </div>

            <div className="text-right rtl:text-left">
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                <CheckCircle className="w-3 h-3" />
                {language === 'ar' ? 'متوفر للتسليم' : 'In Stock'}
              </span>
              <p className="text-[10px] text-neutral-500 font-mono mt-1">
                {product.stock_quantity} {language === 'ar' ? 'قطعة في دبي' : 'units in Dubai'}
              </p>
            </div>
          </div>

          {/* Tabby 4 Installments Preview */}
          <div className="p-3 bg-[#111111] border border-[#262626] rounded-sm text-xs flex items-center justify-between text-neutral-300">
            <span>
              {language === 'ar'
                ? `أو قسّمها على 4 دفعات شهرية بقيمة ${formatPrice(product.price / 4)} بدون فوائد.`
                : `Or 4 interest-free payments of ${formatPrice(product.price / 4)} with Tabby.`}
            </span>
            <span className="font-bold text-[#C8A44D] font-mono uppercase tracking-wider text-[11px]">
              tabby
            </span>
          </div>

          {/* Live Personalization Visualizer Studio */}
          {product.personalization_supported && (
            <PersonalizationVisualizer
              product={product}
              onPersonalizationChange={setPersonalization}
            />
          )}

          {/* Quantity & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#2D2D2D] bg-[#161616] rounded-sm h-12 px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-neutral-400 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-mono text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-neutral-400 hover:text-white"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C8A44D]/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('add_to_cart')}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="h-12 w-12 border border-[#2D2D2D] hover:border-[#C8A44D] bg-[#161616] rounded-sm flex items-center justify-center text-white hover:text-[#C8A44D] transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#C8A44D] text-[#C8A44D]' : ''}`} />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full h-12 bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] hover:border-[#C8A44D]/60 text-white font-medium text-xs uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('buy_now')}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Delivery & Dispatch Timeline */}
          <div className="border-t border-[#1F1F1F] pt-4 space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-300">
              <Truck className="w-4 h-4 text-[#C8A44D] shrink-0" />
              <span>
                {language === 'ar'
                  ? 'التوصيل في نفس اليوم لطلبات دبي قبل 2:00 ظهراً، واليوم التالي لبقية الإمارات.'
                  : 'Same-day delivery across Dubai for orders placed before 2 PM; next-day across all Emirates.'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-4 h-4 text-[#C8A44D] shrink-0" />
              <span>
                {language === 'ar'
                  ? 'النقش والصياغة تتم فورياً في ورشتنا بدبي خلال 3-4 ساعات.'
                  : 'Precision engraving takes 3–4 hours in our Dubai Design District atelier.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details, Specs, & Customer Reviews Tabs */}
      <div className="border-t border-[#1C1C1C] pt-12">
        <div className="flex items-center gap-8 border-b border-[#1E1E1E] pb-3 text-sm font-medium uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === 'details' ? 'text-[#C8A44D]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>{language === 'ar' ? 'الوصف والقصة' : 'Description & Craft'}</span>
            {activeTab === 'details' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C8A44D]" />}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'text-[#C8A44D]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>{language === 'ar' ? 'المواصفات الفنية' : 'Specifications'}</span>
            {activeTab === 'specs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C8A44D]" />}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'text-[#C8A44D]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>
              {language === 'ar' ? `آراء العملاء (${product.reviews?.length || 0})` : `Reviews (${product.reviews?.length || 0})`}
            </span>
            {activeTab === 'reviews' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C8A44D]" />}
          </button>
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="py-8 max-w-3xl space-y-4 text-sm text-neutral-300 leading-relaxed font-light">
            <p>{language === 'ar' ? product.description_ar : product.description}</p>
            <p className="text-neutral-400 text-xs">
              {language === 'ar'
                ? 'تصلك القطعة داخل العلبة الفاخرة المميزة لعلامة إيڤال مع كيس مخملي وبطاقة ضمان الجودة والأصالة.'
                : 'Each piece arrives packaged in our signature EVAL velvet presentation box with wax seal, travel pouch, and certificate of craftsmanship.'}
            </p>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="py-8 max-w-2xl">
            <div className="border border-[#222222] rounded-sm divide-y divide-[#1F1F1F]">
              {(product.specifications || []).map((spec, i) => (
                <div key={i} className="grid grid-cols-3 p-3.5 text-xs">
                  <span className="font-medium text-neutral-400">
                    {language === 'ar' ? spec.label_ar : spec.label}
                  </span>
                  <span className="col-span-2 text-white">
                    {language === 'ar' ? spec.value_ar : spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 max-w-3xl space-y-6">
            {(product.reviews || []).map((rev) => (
              <div key={rev.id} className="p-4 bg-[#141414] border border-[#222222] rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{rev.author}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">({rev.city})</span>
                    {rev.verified && (
                      <span className="text-[10px] text-[#C8A44D] bg-[#222222] px-1.5 py-0.5 rounded">
                        {language === 'ar' ? 'مشتري موثق' : 'Verified Purchase'}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{rev.date}</span>
                </div>
                <div className="flex text-[#C8A44D]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C8A44D]" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300">
                  {language === 'ar' ? rev.comment_ar : rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#1C1C1C] pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif-luxury font-semibold text-white">
              {language === 'ar' ? 'قطع قد تنال إعجابك' : 'Complementary Creations'}
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#C8A44D] hover:underline"
            >
              {language === 'ar' ? 'عرض المزيد' : 'View More'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Buy Bar (strictly adheres to 15% mobile sticky cap rule) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-[#222222] p-3 px-4 flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <span className="text-xs font-semibold text-white tabular-nums block">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-emerald-400">
            {language === 'ar' ? 'توصيل مجاني' : 'Free Delivery'}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2.5 bg-[#C8A44D] text-black text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t('add_to_cart')}</span>
        </button>
      </div>

    </div>
  );
};
