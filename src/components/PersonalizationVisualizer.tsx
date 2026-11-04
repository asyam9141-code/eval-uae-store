import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, MetalOption, FontOption } from '../types';
import { Sparkles, Check, Gift } from 'lucide-react';

interface PersonalizationVisualizerProps {
  product: Product;
  onPersonalizationChange: (details: {
    engravingText: string;
    arabicEngravingText: string;
    fontStyle: string;
    metal: string;
    includeGiftBox: boolean;
  }) => void;
}

export const PersonalizationVisualizer: React.FC<PersonalizationVisualizerProps> = ({
  product,
  onPersonalizationChange
}) => {
  const { language } = useStore();
  const options = product.personalization_options;

  const defaultMetal = options?.metals?.[0] || {
    id: '18k-gold',
    name: '18K Royal Gold',
    name_ar: 'ذهب ملكي عيار 18',
    color: 'Gold',
    hex: '#C8A44D'
  };

  const defaultFont = options?.fonts?.[0] || {
    id: 'diwani',
    name: 'Diwani Calligraphy',
    name_ar: 'الخط الديواني الملكي',
    fontClass: 'font-calligraphy italic',
    previewSample: 'إيڤال'
  };

  const [selectedMetal, setSelectedMetal] = useState<MetalOption>(defaultMetal);
  const [selectedFont, setSelectedFont] = useState<FontOption>(defaultFont);
  const [text, setText] = useState(options?.defaultArabicText || 'نورا');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);

  const handleTextChange = (val: string) => {
    setText(val);
    emitChange(val, selectedMetal, selectedFont, includeGiftBox);
  };

  const handleMetalSelect = (m: MetalOption) => {
    setSelectedMetal(m);
    emitChange(text, m, selectedFont, includeGiftBox);
  };

  const handleFontSelect = (f: FontOption) => {
    setSelectedFont(f);
    emitChange(text, selectedMetal, f, includeGiftBox);
  };

  const handleGiftBoxToggle = (box: boolean) => {
    setIncludeGiftBox(box);
    emitChange(text, selectedMetal, selectedFont, box);
  };

  const emitChange = (
    currentText: string,
    currentMetal: MetalOption,
    currentFont: FontOption,
    giftBox: boolean
  ) => {
    onPersonalizationChange({
      engravingText: currentText,
      arabicEngravingText: currentText,
      fontStyle: currentFont.name,
      metal: currentMetal.name,
      includeGiftBox: giftBox
    });
  };

  // Determine metal gradient
  const getMetalGradient = () => {
    if (selectedMetal.id === 'rose-gold') {
      return 'linear-gradient(135deg, #F3C5BA 0%, #E0A899 50%, #B87868 100%)';
    }
    if (selectedMetal.id === 'silver-rhodium') {
      return 'linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 50%, #9CA3AF 100%)';
    }
    if (selectedMetal.id === 'matte-black') {
      return 'linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 50%, #0F0F0F 100%)';
    }
    // 18K Royal Gold default
    return 'linear-gradient(135deg, #F5DF9E 0%, #C8A44D 45%, #9E7D2B 100%)';
  };

  const getTextColor = () => {
    if (selectedMetal.id === 'matte-black') {
      return '#C8A44D'; // Gold engraving on black metal
    }
    return '#5A4612'; // Deep burnished engraved gold tone
  };

  return (
    <div className="bg-[#121212] border border-[#222222] rounded-sm p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C8A44D]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-serif-luxury">
            {language === 'ar' ? 'استوديو التخصيص والنقش المباشر' : 'Live Personalization Studio'}
          </h3>
        </div>
        <span className="text-[11px] text-[#C8A44D] font-medium tracking-wide">
          {language === 'ar' ? 'معاينة حية في دبي' : 'Real-time Dubai Atelier Preview'}
        </span>
      </div>

      {/* Realistic Interactive 3D/Metallic Canvas Preview */}
      <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#0A0A0A] to-[#141414] rounded border border-[#262626] flex items-center justify-center p-6 overflow-hidden shadow-inner">
        {/* Subtle background slate texture lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8A44D_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Delicate luxury jewelry chain graphic */}
        <div className="absolute top-2 w-36 h-8 border-t border-dashed border-[#C8A44D]/30 rounded-t-full pointer-events-none" />

        {/* The Bar / Pendant / Cufflink Physical Mockup */}
        <div
          className="relative max-w-sm w-full py-4 px-6 rounded shadow-2xl flex items-center justify-center transition-all duration-300 border border-white/20"
          style={{
            background: getMetalGradient(),
            boxShadow:
              selectedMetal.id === 'matte-black'
                ? '0 10px 25px -5px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
                : '0 15px 35px -5px rgba(200,164,77,0.3), inset 0 1px 2px rgba(255,255,255,0.6)'
          }}
        >
          {/* Subtle light sweep reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rounded opacity-60 pointer-events-none" />

          {/* Engraved Inscription */}
          <span
            className={`text-xl sm:text-2xl text-center select-none truncate transition-all duration-200 drop-shadow-sm ${selectedFont.fontClass}`}
            style={{
              color: getTextColor(),
              textShadow:
                selectedMetal.id === 'matte-black'
                  ? '0px 1px 2px rgba(0,0,0,0.9)'
                  : '0px 1px 1px rgba(255,255,255,0.4), inset 0px 1px 1px rgba(0,0,0,0.6)',
              letterSpacing: '0.02em'
            }}
          >
            {text || (language === 'ar' ? 'اكتب اسمك هنا' : 'Your Custom Name')}
          </span>
        </div>

        {/* Small metal watermark badge */}
        <div className="absolute bottom-2.5 right-3 text-[10px] uppercase font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
          {selectedMetal.name} · {selectedFont.name}
        </div>
      </div>

      {/* Input Field for Custom Name/Text */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-neutral-300 tracking-wide">
          {language === 'ar'
            ? 'الاسم أو العبارة المراد نقشها (عربي أو إنجليزي):'
            : 'Name or Inscription to Engrave (Arabic or English):'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={text}
            maxLength={options?.max_chars || 18}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={language === 'ar' ? 'مثال: نورا، عبدالله، Zayed، Sara...' : 'e.g. Noora, Abdullah, Zayed, Sara...'}
            className="w-full bg-[#1A1A1A] border border-[#2D2D2D] focus:border-[#C8A44D] text-white text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors"
          />
          <span className="absolute right-3 rtl:right-auto rtl:left-3 top-3 text-[10px] font-mono text-neutral-400">
            {text.length}/{options?.max_chars || 18}
          </span>
        </div>
        <p className="text-[11px] text-neutral-400">
          {language === 'ar'
            ? 'ملاحظة: يمكنك إدخال الاسم بالحروف العربية أو الإنجليزية وسيقوم خطاط إيڤال بتنسيقها بأعلى دقة.'
            : 'Our master calligraphers verify letter proportion before precision laser engraving.'}
        </p>
      </div>

      {/* Metal Finish Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-neutral-300 tracking-wide">
          {language === 'ar' ? 'اختر المعدن والطلاء:' : 'Select Metal & Finish:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(options?.metals || [defaultMetal]).map((metal) => {
            const isSelected = selectedMetal.id === metal.id;
            return (
              <button
                key={metal.id}
                type="button"
                onClick={() => handleMetalSelect(metal)}
                className={`p-2 rounded-sm border text-left rtl:text-right flex items-center gap-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#C8A44D] bg-[#1E1E1E]'
                    : 'border-[#262626] bg-[#161616] hover:border-neutral-600'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                  style={{ backgroundColor: metal.hex }}
                />
                <span className="text-[11px] text-white truncate font-medium">
                  {language === 'ar' ? metal.name_ar : metal.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calligraphy Font Style Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-neutral-300 tracking-wide">
          {language === 'ar' ? 'اختر أسلوب الخط العربي:' : 'Select Calligraphy Script Style:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(options?.fonts || [defaultFont]).map((font) => {
            const isSelected = selectedFont.id === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => handleFontSelect(font)}
                className={`p-2.5 rounded-sm border text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#C8A44D] bg-[#1E1E1E]'
                    : 'border-[#262626] bg-[#161616] hover:border-neutral-600'
                }`}
              >
                <div className={`text-base text-[#C8A44D] mb-1 ${font.fontClass}`}>
                  {font.previewSample}
                </div>
                <div className="text-[10px] text-neutral-300 truncate font-medium">
                  {language === 'ar' ? font.name_ar : font.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Luxury Velvet Gift Packaging Option */}
      <div
        onClick={() => handleGiftBoxToggle(!includeGiftBox)}
        className="p-3 bg-[#161616] border border-[#262626] hover:border-[#C8A44D]/50 rounded-sm flex items-center justify-between cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#202020] flex items-center justify-center text-[#C8A44D] shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">
              {language === 'ar' ? 'تغليف الهدايا المخملي الفاخر بختم الشمع الذهبي' : 'Luxury Velvet Gift Box with Wax Seal'}
            </p>
            <p className="text-[10px] text-neutral-400">
              {language === 'ar' ? 'يشمل بطاقة تهنئة فاخرة وكيس إيڤال المخملي (مجاني)' : 'Includes personalized greeting card and silk ribbon (Complimentary)'}
            </p>
          </div>
        </div>
        <div
          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
            includeGiftBox ? 'bg-[#C8A44D] border-[#C8A44D] text-black' : 'border-neutral-600'
          }`}
        >
          {includeGiftBox && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
};
