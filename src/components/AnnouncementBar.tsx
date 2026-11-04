import React from 'react';
import { useStore } from '../context/StoreContext';
import { Currency, Language } from '../types';
import { Globe, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language, setLanguage, currency, setCurrency, t, navigateTo } = useStore();

  const currencies: Currency[] = ['AED', 'SAR', 'QAR', 'KWD', 'USD', 'EUR', 'GBP'];

  return (
    <div className="bg-[#090909] border-b border-[#222222] text-[11px] sm:text-xs text-neutral-300 py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Trust note */}
        <div className="hidden lg:flex items-center gap-4 text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#C8A44D]" />
            {language === 'ar' ? 'توصيل مجاني لجميع إمارات الدولة' : 'Complimentary UAE Express Delivery'}
          </span>
          <span className="text-neutral-700">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A44D]" />
            {language === 'ar' ? 'ضمان الذهب عيار 18 مدى الحياة' : 'Lifetime 18K Gold PVD Warranty'}
          </span>
        </div>

        {/* Center: Brand Promo message */}
        <div className="text-center font-medium tracking-wider text-[#C8A44D] flex items-center justify-center gap-2">
          <span>{t('announcement')}</span>
        </div>

        {/* Right: Currency, Language & WooCommerce Sync Status */}
        <div className="flex items-center gap-4 text-neutral-300">
          {/* Order Tracking quick link */}
          <button
            onClick={() => navigateTo('tracking')}
            className="hover:text-[#C8A44D] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t('track_order')}
          </button>

          <span className="text-neutral-700">·</span>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-neutral-300 hover:text-white border-0 py-0.5 px-1 rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8A44D] text-[11px]"
              aria-label="Currency"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr} className="bg-[#121212] text-white">
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <span className="text-neutral-700">·</span>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="hover:text-[#C8A44D] transition-colors font-medium flex items-center gap-1 cursor-pointer"
            aria-label="Toggle Language"
          >
            <Globe className="w-3 h-3 text-[#C8A44D]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* WooCommerce Integration Quick Button */}
          <button
            onClick={() => navigateTo('woocommerce-sync')}
            title="WooCommerce Store Integration Console"
            className="hidden sm:flex items-center gap-1 text-neutral-400 hover:text-[#C8A44D] transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
          >
            <RefreshCw className="w-2.5 h-2.5 text-[#C8A44D]" />
            <span>WC Bridge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
