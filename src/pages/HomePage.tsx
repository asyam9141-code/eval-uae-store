import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CategoryProductSection } from '../components/CategoryProductSection';
import { HOMEPAGE_CATEGORIES_18 } from '../data/homepageCategories';
import { HERO_IMAGE, ATELIER_IMAGE } from '../data/products';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  Gem,
  CheckCircle2,
  Star,
  Award,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, navigateTo } = useStore();
  const [activeQuickTab, setActiveQuickTab] = useState<number | null>(null);
  const isRtl = language === 'ar';

  const handleNavigateToCategory = (
    slug: string,
    nameAr: string,
    nameEn: string,
    wcId: number
  ) => {
    // Navigate to shop page filtered by this specific category
    navigateTo('shop');
    // Save selected category in session storage or URL hash for seamless continuity
    sessionStorage.setItem('eval_selected_category', slug);
  };

  const scrollToCategorySection = (order: number) => {
    setActiveQuickTab(order);
    const element = document.getElementById(`eval-category-${order}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16">
      {/* 1. HERO SECTION — البانر الافتتاحي الفاخر */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#090909] overflow-hidden">
        {/* Full-width campaign background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="EVAL UAE Luxury Accessories & Jewelry"
            className="w-full h-full object-cover object-center brightness-[0.55]"
            loading="eager"
            fetchPriority="high"
          />
          {/* Gradients for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-transparent rtl:bg-gradient-to-l rtl:from-black/95 rtl:via-black/65 rtl:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/40" />
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-medium bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-[#C8A44D]/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A44D]" />
              <span className="font-arabic font-semibold">
                {isRtl ? 'الفخامة الصامتة · ورشة دبي' : 'Quiet Luxury · Dubai Atelier'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight font-arabic">
              {isRtl ? (
                <>
                  أصالة الخط العربي، <br />
                  <span className="bg-gradient-to-r from-[#C8A44D] via-[#E8D48E] to-[#C8A44D] bg-clip-text text-transparent">
                    بصياغة ملكية فاخرة.
                  </span>
                </>
              ) : (
                <>
                  Timeless Arabic Calligraphy, <br />
                  <span className="bg-gradient-to-r from-[#C8A44D] via-[#E8D48E] to-[#C8A44D] bg-clip-text text-transparent">
                    Crafted in Pure 18K Gold.
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light font-arabic">
              {isRtl
                ? 'استكشف روائع إيڤال الإمارات عبر 18 تصنيفاً حصرياً من الإكسسوارات الرجالية، السبح الملكية، أقلام الاسم، إكسسوارات الأطفال، ومعلقات السيارات الفاخرة.'
                : 'Discover EVAL UAE through 18 exclusive collections of bespoke men’s accessories, royal rosaries, personalized pens, children’s heirlooms, and luxury automotive charms.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToCategorySection(1)}
                className="px-7 py-3.5 bg-gradient-to-r from-[#C8A44D] to-[#D6B866] hover:brightness-110 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-xl shadow-[#C8A44D]/15 flex items-center gap-2 font-arabic transform hover:-translate-y-0.5"
              >
                <span>{isRtl ? 'استكشف التصنيفات الـ18' : 'Explore All 18 Collections'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="px-7 py-3.5 bg-black/60 hover:bg-white/10 border border-[#C8A44D]/50 text-white font-medium text-xs uppercase tracking-wider rounded-lg transition-all duration-300 backdrop-blur-md font-arabic"
              >
                {isRtl ? 'تسوق المتجر بالكامل' : 'Shop Complete Store'}
              </button>
            </div>

            {/* Quick UAE Delivery reassurance */}
            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-neutral-300 font-arabic">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A44D]" />
                {isRtl ? 'توصيل مجاني للطلبات فوق 300 د.إ' : 'Free UAE Delivery over 300 AED'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A44D]" />
                {isRtl ? 'شحن فوري بدبي خلال 24 ساعة' : 'Same-Day Dubai Dispatch'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A44D]" />
                {isRtl ? 'تغليف مخملي فاخر بختم شمعي' : 'Royal Velvet Box Included'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK CATEGORY JUMP-BAR — شريط التصفح السريع للتصنيفات الـ18 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] border border-[#222222] rounded-xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3 border-b border-[#202020] pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C8A44D]" />
              <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-arabic">
                {isRtl ? 'تصفح سريع لتصنيفات المتجر (18 تصنيف)' : 'Quick Jump by Collection (18 Categories)'}
              </h3>
            </div>
            <span className="text-[11px] text-[#C8A44D] font-mono hidden sm:inline-block">
              {isRtl ? 'انقر للانتقال الفوري' : 'Click to jump'}
            </span>
          </div>

          {/* Horizontal scrollable pills */}
          <div
            className="flex gap-2 overflow-x-auto pb-1 touch-pan-x scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {HOMEPAGE_CATEGORIES_18.map((cat) => (
              <button
                key={cat.order}
                onClick={() => scrollToCategorySection(cat.order)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-arabic transition-all duration-200 border flex items-center gap-1.5 ${
                  activeQuickTab === cat.order
                    ? 'bg-[#C8A44D] text-black border-[#C8A44D] font-semibold shadow-md'
                    : 'bg-[#181818] text-neutral-300 border-[#2A2A2A] hover:border-[#C8A44D]/50 hover:text-white'
                }`}
              >
                <span className="text-[10px] opacity-60 font-mono">#{cat.order}</span>
                <span>{isRtl ? cat.nameAr : cat.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 18 INDEPENDENT CATEGORY SECTIONS — التصنيفات الـ18 كاملة ومستقلة */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {HOMEPAGE_CATEGORIES_18.map((catSection, index) => (
          <div key={catSection.wcId || catSection.order} id={`eval-category-${catSection.order}`}>
            <CategoryProductSection
              section={catSection}
              isFirst={index === 0}
              onNavigateToCategory={handleNavigateToCategory}
            />
          </div>
        ))}
      </div>

      {/* 4. DUBAI ATELIER CRAFTSMANSHIP STORY — قصة ورشة دبي */}
      <section className="bg-[#0D0D0D] border-y border-[#1C1C1C] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Atelier Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#262626] shadow-2xl">
              <img
                src={ATELIER_IMAGE}
                alt="Dubai Master Jewelry Atelier"
                loading="lazy"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-black/85 backdrop-blur-md px-4 py-2 border border-[#C8A44D]/30 text-xs text-[#C8A44D] rounded-lg font-arabic font-medium">
                <span>{isRtl ? 'دبي، حي دبي للتصميم d3' : 'Dubai Design District Atelier'}</span>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C8A44D] font-medium font-arabic">
                <Gem className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تجربة إيڤال الإمارات' : 'The EVAL Experience'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-arabic">
                {isRtl ? (
                  <>
                    كل قطعة تُروى كقصة شخصية، <br />
                    <span className="bg-gradient-to-r from-[#C8A44D] to-[#D6B866] bg-clip-text text-transparent">
                      بحبر الذهب وأصالة دبي.
                    </span>
                  </>
                ) : (
                  <>
                    Where Precision Engineering <br />
                    <span className="bg-gradient-to-r from-[#C8A44D] to-[#D6B866] bg-clip-text text-transparent">
                      Meets Ancient Calligraphy.
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed font-light font-arabic">
                {isRtl
                  ? 'في إيڤال، نؤمن بأن الهدية الحقيقية ليست مجرد إكسسوار، بل شعور بالانتماء والفخامة الصامتة. نقوم بطلاء الفولاذ المقاوم للصدأ بطبقات سميكة من الذهب الملكي عيار 18، ثم يتولى خطاطونا صياغة الاسم بالخط الديواني أو الثلث قبل تنفيذه بتقنية الليزر الميكروني.'
                  : 'Founded in Dubai, EVAL UAE represents a modern renaissance in bespoke luxury gifts. We merge surgical-grade resilient metals with high-micron 18K gold dipping and hand-finished Arabic calligraphy scripts. Waterproof, scratch-resistant, and created to be cherished across generations.'}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#1F1F1F]">
                <div>
                  <p className="text-2xl font-bold text-white tabular-nums font-arabic">
                    18K PVD
                  </p>
                  <p className="text-xs text-neutral-400 mt-1 font-arabic">
                    {isRtl ? 'طلاء ذهبي لا يتغير لونه' : 'Tarnish-Proof Gold Finish'}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white tabular-nums font-arabic">
                    &lt; 24h
                  </p>
                  <p className="text-xs text-neutral-400 mt-1 font-arabic">
                    {isRtl ? 'صياغة ونقش فوري بدبي' : 'Engraving & Dispatch'}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateTo('about')}
                  className="px-6 py-3 bg-transparent hover:bg-[#C8A44D]/10 border border-[#C8A44D] text-[#C8A44D] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer font-arabic"
                >
                  {isRtl ? 'اقرأ قصة إيڤال' : 'Read Our Story'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST PILLARS SECTION — ركائز الثقة والضمان */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#C8A44D] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white font-arabic">
                {isRtl ? 'توصيل سريع بالإمارات' : 'Complimentary UAE Delivery'}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-arabic">
                {isRtl
                  ? 'شحن في نفس اليوم بدبي واليوم التالي لبقية الإمارات للطلبات فوق 300 د.إ.'
                  : 'Same-day delivery across Dubai and next-day for all Emirates for orders over 300 AED.'}
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#C8A44D] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white font-arabic">
                {isRtl ? 'ضمان الذهب عيار 18' : '18K Gold PVD Guarantee'}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-arabic">
                {isRtl
                  ? 'مقاوم للماء، العطور، وتغير اللون مع بطاقة فحص الجودة المرفقة.'
                  : 'Shower-safe, perfume-resistant, and engineered never to fade or discolour.'}
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#C8A44D] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white font-arabic">
                {isRtl ? 'خطاطون معتمدون' : 'Master Calligraphers'}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-arabic">
                {isRtl
                  ? 'كتابة الأسماء بالخط الديواني والثلث بأيدي خطاطين محترفين بدبي.'
                  : 'Every custom name is composed by master Arabic calligraphers before engraving.'}
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#C8A44D] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white font-arabic">
                {isRtl ? 'تغليف الهدايا الفاخر' : 'Luxury Gift Packaging'}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-arabic">
                {isRtl
                  ? 'صندوق مخملي أنيق مختوم بالشمع الذهبي جاهز للإهداء مباشرة.'
                  : 'Delivered in signature EVAL velvet gift box sealed with wax emblem.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS — آراء عملاء إيڤال */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#C8A44D] font-mono font-medium">
            {isRtl ? 'تجارب عملائنا' : 'CLIENT REVIEWS'}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-arabic">
            {isRtl ? 'ماذا يقول عملاؤنا في الإمارات' : 'Words of Appreciation'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl space-y-4">
            <div className="flex text-[#C8A44D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-arabic">
              {isRtl
                ? '«طلبت سبحة بالاسم ومعلقة سيارة بالخط الديواني لزوجي، الجودة تفوق الوصف والتغليف الملكي يشرف جداً. التوصيل في نفس اليوم بدبي!»'
                : '“The calligraphy precision on the car medallion is breathtaking. Delivered the same afternoon in Dubai.”'}
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white font-arabic">
                  {isRtl ? 'مريم الشامسي' : 'Mariam Al Shamsi'}
                </p>
                <p className="text-[11px] text-[#C8A44D]">
                  {isRtl ? 'أبوظبي، الإمارات' : 'Abu Dhabi, UAE'}
                </p>
              </div>
              <span className="text-[10px] bg-green-950/40 text-green-400 border border-green-800/50 px-2 py-0.5 rounded font-arabic">
                {isRtl ? 'مشتري مؤكد' : 'Verified'}
              </span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl space-y-4">
            <div className="flex text-[#C8A44D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-arabic">
              {isRtl
                ? '«كبك وأقلام بالاسم بلمسة ذهبية فخمة جداً، أهديتها لوالدي في العيد وكانت أجمل هدية. شكراً لفريق إيڤال على الاهتمام بأدق التفاصيل.»'
                : '“Cufflinks and personalized pen with royal gold plating. Highest craftsmanship standards in the Emirates.”'}
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white font-arabic">
                  {isRtl ? 'سلطان القاسمي' : 'Sultan Al Qasimi'}
                </p>
                <p className="text-[11px] text-[#C8A44D]">
                  {isRtl ? 'الشارقة، الإمارات' : 'Sharjah, UAE'}
                </p>
              </div>
              <span className="text-[10px] bg-green-950/40 text-green-400 border border-green-800/50 px-2 py-0.5 rounded font-arabic">
                {isRtl ? 'مشتري مؤكد' : 'Verified'}
              </span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl space-y-4">
            <div className="flex text-[#C8A44D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-arabic">
              {isRtl
                ? '«سلسلة الذهب عيار 18 بالاسم بالخط الكوفي.. أرتديها يومياً ولا يتغير بريقها حتى مع العطور والماء. تستحق كل درهم!»'
                : '“The 18K gold dipped name necklace never fades even in daily shower and perfume wear. Truly quiet luxury.”'}
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white font-arabic">
                  {isRtl ? 'نورة الهاشمي' : 'Noora Al Hashemi'}
                </p>
                <p className="text-[11px] text-[#C8A44D]">
                  {isRtl ? 'دبي، الإمارات' : 'Dubai, UAE'}
                </p>
              </div>
              <span className="text-[10px] bg-green-950/40 text-green-400 border border-green-800/50 px-2 py-0.5 rounded font-arabic">
                {isRtl ? 'مشتري مؤكد' : 'Verified'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
