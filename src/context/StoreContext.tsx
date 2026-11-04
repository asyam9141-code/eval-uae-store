import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Currency, PageView, CartItem, Product, Order } from '../types';
import { CURRENCY_RATES, UAE_EMIRATES } from '../data/products';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (priceInAED: number) => string;
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  selectedProductSlug: string | null;
  navigateTo: (view: PageView, productSlug?: string) => void;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  freeShippingProgress: number; // 0 to 100 percentage toward 300 AED threshold
  amountLeftForFreeShipping: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (order: Order | null) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  t: (key: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const TRANSLATIONS: Record<string, { en: string; ar: string }> = {
  announcement: {
    en: 'COMPLIMENTARY UAE WHITE-GLOVE DELIVERY ON ORDERS OVER 300 AED · SAME-DAY DUBAI DISPATCH',
    ar: 'توصيل مجاني فاخر لجميع أنحاء الإمارات للطلبات أكثر من 300 د.إ · شحن فوري في نفس اليوم بدبي'
  },
  shop_now: { en: 'Explore Collection', ar: 'تسوق الآن' },
  search_placeholder: { en: 'Search bespoke jewelry, cufflinks, car accessories...', ar: 'ابحث عن قطع بالاسم، قلائد بالخط العربي، أزرار أكمام...' },
  cart: { en: 'Bag', ar: 'حقيبة التسوق' },
  wishlist: { en: 'Wishlist', ar: 'المفضلة' },
  account: { en: 'Account', ar: 'حسابي' },
  best_sellers: { en: 'Signature Pieces', ar: 'الأكثر مبيعاً' },
  new_arrivals: { en: 'Latest Creations', ar: 'وصل حديثاً' },
  eval_picks: { en: 'EVAL Curations', ar: 'اختيارات إيڤال' },
  meaningful_gifts: { en: 'Gifts with Meaning', ar: 'هدايا تحمل معنى' },
  eval_experience: { en: 'The EVAL Experience', ar: 'تجربة إيڤال' },
  discover_collection: { en: 'Discover Our Collection', ar: 'اكتشف مجموعتنا' },
  categories: { en: 'Curated Categories', ar: 'التشكيلات المختارة' },
  add_to_cart: { en: 'Add to Bag', ar: 'أضف إلى الحقيبة' },
  buy_now: { en: 'Instant Purchase', ar: 'شراء فوري' },
  free_shipping_unlocked: { en: 'You qualify for Free UAE Delivery', ar: 'لقد حصلت على توصيل مجاني داخل الإمارات' },
  away_from_free_shipping: { en: 'away from Complimentary Delivery', ar: 'للحصول على التوصيل المجاني' },
  checkout: { en: 'Proceed to Secure Checkout', ar: 'إتمام الطلب بأمان' },
  secure_payment: { en: 'Encrypted & Secure', ar: 'دفع مشفر وآمن 100%' },
  uae_craftsmanship: { en: 'Handcrafted in Dubai Atelier', ar: 'صياغة يدوية في ورشة دبي' },
  view_cart: { en: 'View Shopping Bag', ar: 'معاينة الحقيبة' },
  track_order: { en: 'Track Your Order', ar: 'تتبع طلبك' },
  all_rights: { en: 'EVAL UAE. All Rights Reserved. Luxury Accessories & Personalized Gifts.', ar: 'إيڤال الإمارات. جميع الحقوق محفوظة. إكسسوارات فاخرة وهدايا مخصصة.' }
};

// Analytics helper to fire real Meta Pixel and Google Analytics events
export const trackStoreEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, params);
      }
      if ((window as any).fbq) {
        if (eventName === 'add_to_cart') {
          (window as any).fbq('track', 'AddToCart', {
            content_name: params.item_name,
            content_ids: [params.item_id],
            value: params.value,
            currency: params.currency || 'AED'
          });
        } else if (eventName === 'begin_checkout') {
          (window as any).fbq('track', 'InitiateCheckout', {
            value: params.value,
            currency: params.currency || 'AED',
            num_items: params.num_items
          });
        } else if (eventName === 'purchase') {
          (window as any).fbq('track', 'Purchase', {
            value: params.value,
            currency: params.currency || 'AED'
          });
        }
      }
    }
  } catch {
    // Ignore analytics block
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ARABIC IS DEFAULT LANGUAGE ACROSS THE ENTIRE APPLICATION
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('eval_uae_lang') as Language) || 'ar';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('eval_uae_curr') as Currency) || 'AED';
  });

  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eval_uae_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('eval_uae_wishlist_v1');
      return saved ? JSON.parse(saved) : [101, 102];
    } catch {
      return [101, 102];
    }
  });

  // Sync language with HTML dir and lang attributes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eval_uae_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    localStorage.setItem('eval_uae_curr', cur);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('eval_uae_cart_v1', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('eval_uae_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Price formatting helper
  const formatPrice = (priceInAED: number): string => {
    const rateData = CURRENCY_RATES[currency] || CURRENCY_RATES['AED'];
    const converted = priceInAED * rateData.rate;
    const symbol = language === 'ar' ? rateData.symbol_ar : rateData.symbol;
    
    // Formatting with tabular decimals or clean integers
    const formattedNum = new Intl.NumberFormat(language === 'ar' ? 'ar-AE' : 'en-AE', {
      minimumFractionDigits: currency === 'KWD' ? 3 : 0,
      maximumFractionDigits: currency === 'KWD' ? 3 : 0
    }).format(converted);

    return language === 'ar' ? `${formattedNum} ${symbol}` : `${symbol} ${formattedNum}`;
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const freeShippingThreshold = 300;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    // Generate unique ID based on product, metal, and engraving text
    const customKey = `${newItem.product_id}-${newItem.personalization?.metal || 'default'}-${newItem.personalization?.engravingText || ''}-${newItem.personalization?.arabicEngravingText || ''}-${newItem.personalization?.fontStyle || ''}`;
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === customKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, { ...newItem, id: customKey }];
      }
    });

    // Fire real tracking event
    trackStoreEvent('add_to_cart', {
      item_id: newItem.product_id,
      item_name: newItem.product.name_ar || newItem.product.name,
      value: newItem.price * newItem.quantity,
      currency: 'AED'
    });

    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const navigateTo = (view: PageView, productSlug?: string) => {
    if (productSlug) {
      setSelectedProductSlug(productSlug);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return language === 'ar' ? entry.ar : entry.en;
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        currentView,
        setCurrentView,
        selectedProductSlug,
        navigateTo,
        cart,
        cartCount,
        cartSubtotal,
        freeShippingProgress,
        amountLeftForFreeShipping,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        lastCreatedOrder,
        setLastCreatedOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,
        t
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
