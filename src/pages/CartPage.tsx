import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { woocommerce } from '../services/woocommerce';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Truck, ShieldCheck, Tag, Check, AlertCircle } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    language,
    cart,
    cartSubtotal,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    freeShippingProgress,
    amountLeftForFreeShipping,
    formatPrice,
    navigateTo,
    t
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number; message: string; message_ar: string } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [giftNotes, setGiftNotes] = useState('');

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = await woocommerce.validateCoupon(couponCode);
    if (res.valid) {
      setAppliedCoupon({
        code: res.code,
        percent: res.discountPercent,
        message: res.message,
        message_ar: res.message_ar
      });
      setCouponCode('');
    } else {
      setCouponError(language === 'ar' ? res.message_ar : res.message);
    }
  };

  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.percent) / 100 : 0;
  const shippingCost = amountLeftForFreeShipping === 0 ? 0 : 25;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#161616] border border-[#262626] rounded-full flex items-center justify-center mx-auto text-[#C8A44D]">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white">
          {language === 'ar' ? 'حقيبة التسوق فارغة' : 'Your Shopping Bag is Empty'}
        </h1>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          {language === 'ar'
            ? 'ابدأ باكتشاف تشكيلاتنا الفاخرة من القلائد المنقوشة بالاسم وأزرار الأكمام ومعلقات السيارات.'
            : 'Explore our bespoke 18K gold engraved accessories and personalized luxury gifts.'}
        </p>
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            {t('shop_now')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Title */}
      <div className="flex items-baseline justify-between border-b border-[#1E1E1E] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white">
            {language === 'ar' ? 'حقيبة التسوق' : 'Shopping Bag'}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {cartCount} {language === 'ar' ? 'قطع مختارة' : 'curated items'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
        >
          {language === 'ar' ? 'إفراغ الحقيبة' : 'Clear Bag'}
        </button>
      </div>

      {/* Free Shipping Progress Alert */}
      <div className="bg-[#141414] border border-[#222222] p-4 rounded-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-neutral-300 font-medium">
            <Truck className="w-4 h-4 text-[#C8A44D]" />
            {amountLeftForFreeShipping === 0 ? (
              <span className="text-[#C8A44D]">{t('free_shipping_unlocked')}</span>
            ) : (
              <span>
                {language === 'ar' ? (
                  <>أضف <strong className="text-white">{formatPrice(amountLeftForFreeShipping)}</strong> {t('away_from_free_shipping')}</>
                ) : (
                  <>Add <strong className="text-white">{formatPrice(amountLeftForFreeShipping)}</strong> {t('away_from_free_shipping')}</>
                )}
              </span>
            )}
          </span>
          <span className="text-xs font-mono text-neutral-400">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-[#242424] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#C8A44D] h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Items Left, Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Items List (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 bg-[#121212] border border-[#1E1E1E] rounded-sm flex flex-col sm:flex-row gap-4 justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-sm border border-[#222222] bg-neutral-900 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white font-serif-luxury">
                    {language === 'ar' ? item.product.name_ar : item.product.name}
                  </h3>

                  {/* Personalization Meta */}
                  {item.personalization && (
                    <div className="text-xs text-neutral-400 space-y-0.5 pt-1">
                      {item.personalization.engravingText && (
                        <p className="flex items-center gap-1.5">
                          <span className="text-[#C8A44D] font-medium">
                            {language === 'ar' ? 'النقش المخصص:' : 'Engraving:'}
                          </span>
                          <span className="text-white font-medium italic">
                            "{item.personalization.engravingText}"
                          </span>
                        </p>
                      )}
                      {item.personalization.metal && (
                        <p className="text-[11px] text-neutral-400">
                          {item.personalization.metal} · {item.personalization.fontStyle}
                        </p>
                      )}
                      {item.personalization.includeGiftBox && (
                        <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{language === 'ar' ? 'تغليف الهدايا المخملي المجاني بختم الشمع' : 'Complimentary Velvet Seal Box'}</span>
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-xs font-semibold tabular-nums text-[#C8A44D] pt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1C1C1C]">
                <div className="flex items-center border border-[#2A2A2A] bg-[#181818] rounded-sm">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-neutral-400 hover:text-white"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-mono text-white tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-neutral-400 hover:text-white"
                    aria-label="Increase"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Complimentary Handwritten Card Message */}
          <div className="p-4 bg-[#121212] border border-[#1E1E1E] rounded-sm space-y-2">
            <label className="block text-xs font-medium text-neutral-300">
              {language === 'ar'
                ? 'رسالة إهداء خاصة مكتوبة بخط اليد داخل صندوق الهدية (مجاناً):'
                : 'Complimentary Handwritten Gift Card Note:'}
            </label>
            <textarea
              value={giftNotes}
              onChange={(e) => setGiftNotes(e.target.value)}
              rows={2}
              placeholder={language === 'ar' ? 'اكتب رسالتك الجميلة لمن تحب...' : 'Add your warm personal message to the recipient...'}
              className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-3 text-white placeholder-neutral-500 rounded-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column: Order Summary (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'ملخص الحقيبة' : 'Order Summary'}
            </h2>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <span>{language === 'ar' ? 'المجموع الفرعي' : 'Bag Subtotal'}</span>
              <span className="font-semibold tabular-nums text-white">{formatPrice(cartSubtotal)}</span>
            </div>

            {/* Discount */}
            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>{language === 'ar' ? `الخصم (${appliedCoupon.code})` : `Discount (${appliedCoupon.code})`}</span>
                <span className="font-semibold tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <span>{language === 'ar' ? 'الشحن والتوصيل' : 'UAE Courier Delivery'}</span>
              <span className={shippingCost === 0 ? 'text-[#C8A44D] font-medium' : 'text-white'}>
                {shippingCost === 0
                  ? (language === 'ar' ? 'مجاني' : 'Complimentary')
                  : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="border-t border-[#1F1F1F] pt-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <div className="text-right rtl:text-left">
                <span className="text-lg font-bold tabular-nums text-[#C8A44D]">{formatPrice(finalTotal)}</span>
                <span className="block text-[10px] text-neutral-400 font-mono">
                  {language === 'ar' ? 'شامل ضريبة القيمة المضافة' : 'Includes 5% UAE VAT'}
                </span>
              </div>
            </div>

            {/* Coupon Input Form */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 rtl:left-auto rtl:right-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={language === 'ar' ? 'رمز القسيمة (EVAL10)' : 'Promo Code (EVAL10)'}
                    className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#C8A44D] text-xs pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-white placeholder-neutral-500 rounded-sm focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E1E1E] hover:bg-[#C8A44D] text-white hover:text-black border border-[#2E2E2E] hover:border-[#C8A44D] text-xs font-medium uppercase tracking-wider transition-colors rounded-sm cursor-pointer shrink-0"
                >
                  {language === 'ar' ? 'تطبيق' : 'Apply'}
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? appliedCoupon.message_ar : appliedCoupon.message}</span>
                </div>
              )}
              {couponError && (
                <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponError}</span>
                </div>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C8A44D]/20 mt-4"
            >
              <span>{t('checkout')}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Security Badges */}
            <div className="pt-2 border-t border-[#1C1C1C] text-[11px] text-neutral-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A44D] shrink-0" />
                <span>{language === 'ar' ? 'دفع آمن بالبطاقات، أبل باي، أو الدفع عند الاستلام' : 'Apple Pay, Cards, Tabby, or Cash on Delivery'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C8A44D] shrink-0" />
                <span>{language === 'ar' ? 'شحن فوري بالسيارات المكيفة لجميع إمارات الدولة' : 'Climate-controlled courier delivery across all 7 Emirates'}</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
