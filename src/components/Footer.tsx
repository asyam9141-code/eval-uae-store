import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Mail, Phone, MapPin, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { language, navigateTo, t } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const navLinks: { label: string; label_ar: string; view: PageView }[] = [
    { label: 'Shop All Products', label_ar: 'جميع المنتجات', view: 'shop' },
    { label: "Women's Collection", label_ar: 'التشكيلة النسائية', view: 'category-womens' },
    { label: "Men's Cufflinks & Accs", label_ar: 'أزرار الأكمام والرجالية', view: 'category-mens' },
    { label: 'Car Accessories', label_ar: 'إكسسوارات السيارات', view: 'category-car' },
    { label: 'Personalized Gifts', label_ar: 'الهدايا المخصصة', view: 'category-personalized' }
  ];

  const policyLinks: { label: string; label_ar: string; view: PageView }[] = [
    { label: 'Privacy Policy', label_ar: 'سياسة الخصوصية', view: 'privacy' },
    { label: 'Return & Refund Policy', label_ar: 'سياسة الاستبدال والاسترجاع', view: 'returns' },
    { label: 'Shipping & Delivery', label_ar: 'الشحن والتوصيل', view: 'shipping-policy' },
    { label: 'About EVAL UAE', label_ar: 'عن إيڤال الإمارات', view: 'about' },
    { label: 'Contact VIP Concierge', label_ar: 'تواصل مع خدمة العملاء', view: 'contact' },
    { label: 'Track Order Status', label_ar: 'تتبع حالة الشحنة', view: 'tracking' }
  ];

  return (
    <footer className="bg-[#090909] text-white border-t border-[#1C1C1C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1A1A1A]">
          
          {/* Brand Manifesto Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-white">
                EVAL
              </span>
              <span className="font-arabic text-sm text-[#C8A44D]">
                إيڤال
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {language === 'ar'
                ? 'دار إيڤال الإمارات للمجوهرات والإكسسوارات الفاخرة. نقوش بالخط العربي ومواد ثمينة مطلية بذهب عيار 18 مصممة بأسلوب الفخامة الصامتة في دبي.'
                : 'EVAL UAE is a luxury accessories and personalized gifts maison. Harmonizing contemporary minimalist design with timeless Arabic calligraphy and 18K gold artistry in Dubai.'}
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A44D] shrink-0" />
                <span>Dubai Design District (d3), Dubai, UAE</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A44D] shrink-0" />
                <span>+971 4 800 EVAL (3825)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A44D] shrink-0" />
                <span>concierge@eval-uae.com</span>
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white font-serif-luxury">
              {language === 'ar' ? 'التشكيلات' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {navLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => navigateTo(link.view)}
                    className="hover:text-[#C8A44D] transition-colors cursor-pointer text-left rtl:text-right"
                  >
                    {language === 'ar' ? link.label_ar : link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white font-serif-luxury">
              {language === 'ar' ? 'خدمة العملاء' : 'Client Care'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {policyLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => navigateTo(link.view)}
                    className="hover:text-[#C8A44D] transition-colors cursor-pointer text-left rtl:text-right"
                  >
                    {language === 'ar' ? link.label_ar : link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white font-serif-luxury">
              {language === 'ar' ? 'النشرة الحصرية' : 'Private Journal'}
            </h4>
            <p className="text-xs text-neutral-400">
              {language === 'ar'
                ? 'انضم لقائمتنا الخاصة لتصلك أحدث الإبداعات ودعوات المعارض الحصرية.'
                : 'Receive private invitations to preview limited bespoke releases and seasonal collections.'}
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#161616] border border-[#C8A44D]/40 rounded-sm text-xs text-[#C8A44D] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{language === 'ar' ? 'شكراً لانضمامك إلى إيڤال' : 'Welcome to the EVAL Circle'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني...' : 'Enter your email...'}
                    className="w-full bg-[#141414] border border-[#2B2B2B] focus:border-[#C8A44D] text-xs px-3 py-2 text-white placeholder-neutral-500 focus:outline-none rounded-sm transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 rtl:right-auto rtl:left-1 top-1 bottom-1 px-3 bg-[#C8A44D] text-black text-[10px] font-semibold uppercase tracking-wider hover:bg-[#D6B866] transition-colors rounded-sm"
                  >
                    {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </form>
            )}

            {/* Social link */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/eval.uae"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#C8A44D] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@eval.uae</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{t('all_rights')}</p>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
            <span>Apple Pay</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
            <span>·</span>
            <span>Tabby / Tamara</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
