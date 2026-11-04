import React from 'react';
import { useStore } from '../context/StoreContext';
import { ATELIER_IMAGE, HERO_IMAGE } from '../data/products';
import { Sparkles, Gem, ShieldCheck, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      
      {/* Editorial Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C8A44D] font-mono">
          EVAL UAE · MAISON MANIFESTO
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-medium text-white leading-tight">
          {language === 'ar' ? (
            <>
              الفخامة الصامتة، <br />
              <span className="text-gold-gradient">المستلهمة من روح الإمارات.</span>
            </>
          ) : (
            <>
              Quiet Luxury, Reimagined <br />
              <span className="text-gold-gradient">Through Contemporary Arabian Heritage.</span>
            </>
          )}
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          {language === 'ar'
            ? 'تأسست دار إيڤال في دبي لتقدم مفهوماً استثنائياً للهدايا الشخصية والإكسسوارات الراقية التي تمزج بين دقة التصنيع الحديثة وسحر الخط العربي الأصيل.'
            : 'EVAL was born in Dubai to celebrate the art of personal legacy. We forge meaningful gifts that merge surgical precision engineering with classical Arabic calligraphic beauty.'}
        </p>
      </div>

      {/* Hero Atmosphere Image */}
      <div className="relative aspect-[16/9] max-h-[480px] w-full rounded-sm overflow-hidden border border-[#222222] shadow-2xl">
        <img
          src={ATELIER_IMAGE}
          alt="EVAL Dubai Atelier"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-white space-y-1">
          <p className="text-xs uppercase tracking-widest text-[#C8A44D] font-mono">The Dubai Design District Atelier</p>
          <p className="text-sm font-serif-luxury font-light">Where each monogram is hand-drawn and laser-engraved to microscopic perfection.</p>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="p-6 bg-[#121212] border border-[#222222] rounded-sm space-y-3">
          <Gem className="w-6 h-6 text-[#C8A44D]" />
          <h3 className="text-base font-serif-luxury font-semibold text-white">
            {language === 'ar' ? 'ذهب ملكي عيار 18 PVD' : '18K Royal Gold PVD'}
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {language === 'ar'
              ? 'نستخدم تقنية الطلاء الفراغي عالي الكثافة (PVD) المعتمدة في أرقى الساعات الفاخرة، مما يجعل القطع مقاومة للماء والعرق وتغير اللون مدى الحياة.'
              : 'Our physical vapor deposition method deposits thick 18K gold layers onto surgical steel cores, creating lifelong shower-safe and tarnish-resistant resilience.'}
          </p>
        </div>

        <div className="p-6 bg-[#121212] border border-[#222222] rounded-sm space-y-3">
          <Sparkles className="w-6 h-6 text-[#C8A44D]" />
          <h3 className="text-base font-serif-luxury font-semibold text-white">
            {language === 'ar' ? 'فن الخط العربي المتقن' : 'Sacred Calligraphy Heritage'}
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {language === 'ar'
              ? 'كل اسم يُكتب بعناية فائقة بواسطة خطاطين محترفين بأنماط الديواني، الرقعة، والثلث، ليتحول كل إكسسوار إلى تحفة فنية فريدة.'
              : 'Every commission is drafted by skilled calligraphers, respecting centuries-old proportions of Diwani, Ruqaa, and Thuluth Arabic typography.'}
          </p>
        </div>

        <div className="p-6 bg-[#121212] border border-[#222222] rounded-sm space-y-3">
          <ShieldCheck className="w-6 h-6 text-[#C8A44D]" />
          <h3 className="text-base font-serif-luxury font-semibold text-white">
            {language === 'ar' ? 'سرعة التوصيل الإماراتي' : 'UAE White-Glove Dispatch'}
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {language === 'ar'
              ? 'نحن نفتخر بصياغة القطع محلياً في دبي، مما يتيح لنا تسليم الطلبات المخصصة في نفس اليوم داخل دبي واليوم التالي لكافة الإمارات.'
              : 'Because our atelier operates locally in Dubai, customized gifts are crafted and delivered same-day in Dubai and next-day across the UAE.'}
          </p>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="text-center py-12 border-y border-[#1E1E1E] max-w-2xl mx-auto space-y-3">
        <p className="text-lg sm:text-xl font-serif-luxury italic text-white leading-relaxed">
          "True luxury speaks softly. It is the weight of solid gold against the skin, the quiet elegance of your name carved in Arabic script, and a gift remembered forever."
        </p>
        <span className="text-xs uppercase tracking-widest text-[#C8A44D] font-mono block">
          — EVAL Founders, Dubai, UAE
        </span>
      </div>

    </div>
  );
};
