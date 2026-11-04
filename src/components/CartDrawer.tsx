import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    cartSubtotal,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    freeShippingProgress,
    amountLeftForFreeShipping,
    formatPrice,
    navigateTo,
    t
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigateTo('checkout');
  };

  const handleViewCartClick = () => {
    closeCartDrawer();
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-md w-full bg-[#0E0E0E] border-l rtl:border-l-0 rtl:border-r border-[#222222] shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-wide uppercase text-white font-serif-luxury">
              {language === 'ar' ? 'حقيبة التسوق' : 'Shopping Bag'}
            </h2>
            <span className="text-xs text-[#C8A44D] font-mono">({cartCount})</span>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#141414] px-5 py-3 border-b border-[#1F1F1F]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1 text-neutral-300">
              <Truck className="w-3.5 h-3.5 text-[#C8A44D]" />
              {amountLeftForFreeShipping === 0 ? (
                <span className="text-[#C8A44D] font-medium">
                  {t('free_shipping_unlocked')}
                </span>
              ) : (
                <span>
                  {language === 'ar' ? (
                    <>أضف {formatPrice(amountLeftForFreeShipping)} {t('away_from_free_shipping')}</>
                  ) : (
                    <><span className="text-white font-semibold">{formatPrice(amountLeftForFreeShipping)}</span> {t('away_from_free_shipping')}</>
                  )}
                </span>
              )}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#262626] h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#C8A44D] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-400">
              <div className="w-16 h-16 rounded-full bg-[#181818] flex items-center justify-center mb-4 text-[#C8A44D]">
                <Truck className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-white mb-2">
                {language === 'ar' ? 'حقيبتك فارغة حالياً' : 'Your Shopping Bag is Empty'}
              </p>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                {language === 'ar'
                  ? 'اكتشف مجموعتنا الحصرية من المجوهرات المطلية بالذهب والهدايا المخصصة.'
                  : 'Discover our exclusive pieces crafted in 18K gold and customized with bespoke calligraphy.'}
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigateTo('shop');
                }}
                className="px-6 py-2.5 bg-[#C8A44D] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#D6B866] transition-colors"
              >
                {t('shop_now')}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#121212] border border-[#1E1E1E] rounded-sm flex gap-3 relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover bg-neutral-900 border border-[#222222] shrink-0"
                />

                <div className="flex-1 min-w-0 pr-6 rtl:pr-0 rtl:pl-6">
                  <h4 className="text-xs sm:text-sm font-medium text-white truncate">
                    {language === 'ar' ? item.product.name_ar : item.product.name}
                  </h4>

                  {/* Personalization Meta Details */}
                  {item.personalization && (
                    <div className="mt-1 space-y-0.5 text-[11px] text-neutral-400">
                      {item.personalization.engravingText && (
                        <p className="flex items-center gap-1.5">
                          <span className="text-[#C8A44D] font-medium">
                            {language === 'ar' ? 'النقش:' : 'Engraving:'}
                          </span>
                          <span className="text-white italic">"{item.personalization.engravingText}"</span>
                        </p>
                      )}
                      {item.personalization.metal && (
                        <p className="text-[10px] text-neutral-400">
                          {item.personalization.metal}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold tabular-nums text-[#C8A44D]">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#2A2A2A] bg-[#181818] rounded-sm">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[#C8A44D] text-neutral-400"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#C8A44D] text-neutral-400"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-neutral-500 hover:text-red-400 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#1C1C1C] bg-[#121212] space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span className="text-sm font-semibold tabular-nums text-white">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-[#222222] pb-2">
              <span>{language === 'ar' ? 'الشحن في الإمارات' : 'UAE Courier Shipping'}</span>
              <span className="text-[#C8A44D]">
                {amountLeftForFreeShipping === 0
                  ? (language === 'ar' ? 'مجاني (فوق 300 درهم)' : 'Complimentary')
                  : formatPrice(25)}
              </span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>{t('checkout')}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={handleViewCartClick}
              className="w-full py-2 bg-transparent hover:bg-white/5 border border-[#2A2A2A] text-neutral-300 hover:text-white text-xs font-medium tracking-wider transition-colors cursor-pointer"
            >
              {t('view_cart')}
            </button>

            <div className="pt-2 flex items-center justify-center gap-3 text-[10px] text-neutral-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#C8A44D]" />
                {language === 'ar' ? 'دفع آمن ومشفر' : 'Secure 256-bit SSL'}
              </span>
              <span>·</span>
              <span>{language === 'ar' ? 'شحن فوري بدبي' : 'Same-Day Dubai Dispatch'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
