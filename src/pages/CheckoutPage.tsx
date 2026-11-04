import React, { useState } from 'react';
import { useStore, trackStoreEvent } from '../context/StoreContext';
import { woocommerce } from '../services/woocommerce';
import { UAE_EMIRATES } from '../data/products';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    cart,
    cartSubtotal,
    amountLeftForFreeShipping,
    formatPrice,
    clearCart,
    setLastCreatedOrder,
    navigateTo,
    t
  } = useStore();

  const [formData, setFormData] = useState({
    firstName: 'Rashid',
    lastName: 'Al Maktoum',
    email: 'rashid@example.ae',
    phone: '+971 50 888 9999',
    emirate: 'dubai',
    address: 'Villa 28, Street 4B, Al Wasl Road',
    apartmentVilla: 'Villa 28',
    deliveryNotes: 'Please ring bell and leave with villa concierge'
  });

  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'tabby' | 'cod'>('apple_pay');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shippingCost = amountLeftForFreeShipping === 0 ? 0 : 25;
  const total = cartSubtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-neutral-400 text-sm">
          {language === 'ar' ? 'لا توجد منتجات في الحقيبة لإتمام الطلب.' : 'No items in your bag to checkout.'}
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#C8A44D] text-black text-xs font-semibold uppercase tracking-wider"
        >
          {t('shop_now')}
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
      setErrorMsg(language === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const selectedEmirateObj = UAE_EMIRATES.find((em) => em.id === formData.emirate);
      const emirateName = selectedEmirateObj?.name || 'Dubai';

      const orderPayload = {
        currency: 'AED',
        total: total,
        subtotal: cartSubtotal,
        shipping_cost: shippingCost,
        payment_method: paymentMethod,
        payment_method_title:
          paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'tabby'
            ? 'Tabby (4 Installments)'
            : 'Cash on Delivery (UAE)',
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: emirateName,
          country: 'United Arab Emirates'
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          city: emirateName,
          country: 'United Arab Emirates',
          delivery_notes: formData.deliveryNotes
        },
        items: cart,
        line_items: cart.map((item) => ({
          product_id: item.product_id,
          name: item.product.name,
          quantity: item.quantity,
          subtotal: (item.price * item.quantity).toString(),
          total: (item.price * item.quantity).toString(),
          meta_data: item.personalization
            ? [
                { key: '_eval_engraving_text', value: item.personalization.engravingText },
                { key: '_eval_calligraphy_style', value: item.personalization.fontStyle },
                { key: '_eval_metal_finish', value: item.personalization.metal }
              ]
            : []
        }))
      };

      const createdOrder = await woocommerce.createOrder(orderPayload);
      
      // Fire real Meta Pixel & GA purchase tracking
      trackStoreEvent('purchase', {
        value: total,
        currency: 'AED',
        transaction_id: createdOrder.order_number,
        num_items: cart.length
      });

      setLastCreatedOrder(createdOrder);
      clearCart();
      navigateTo('order-success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Order placement failed. Please verify network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#C8A44D] uppercase tracking-widest font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'بوابة الدفع الآمنة والمشفرة' : '256-Bit Encrypted Secure Checkout'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white">
          {language === 'ar' ? 'إتمام الطلب الفاخر' : 'Bespoke Order Checkout'}
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Form: Customer Details, UAE Delivery, Payment (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Contact Info */}
          <div className="bg-[#121212] border border-[#222222] p-5 sm:p-6 rounded-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? '1. بيانات العميل والاتصال' : '1. Customer & Contact Details'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'الاسم الأول *' : 'First Name *'}
                </label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'اسم العائلة *' : 'Last Name *'}
                </label>
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني للإشعار *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'رقم الهاتف للتوصيل (الإمارات) *' : 'Mobile Number (UAE) *'}
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+971 50 000 0000"
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: UAE Shipping Address */}
          <div className="bg-[#121212] border border-[#222222] p-5 sm:p-6 rounded-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? '2. عنوان التوصيل داخل دولة الإمارات' : '2. UAE Delivery Address'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'الإمارة *' : 'Emirate *'}
                </label>
                <select
                  name="emirate"
                  value={formData.emirate}
                  onChange={handleInputChange}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none cursor-pointer"
                >
                  {UAE_EMIRATES.map((em) => (
                    <option key={em.id} value={em.id}>
                      {language === 'ar' ? `${em.name_ar} — ${em.delivery_time}` : `${em.name} — ${em.delivery_time}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'العنوان بالتفصيل (المنطقة، الشارع، الفيلا/الشقة) *' : 'Street Address, Area & Villa/Apartment Number *'}
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={language === 'ar' ? 'مثال: فيلا 12، شارع 3، جميرا 1' : 'e.g. Villa 12, Street 3, Jumeirah 1'}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">
                  {language === 'ar' ? 'ملاحظات خاصة للمندوب (اختياري)' : 'Courier Delivery Instructions (Optional)'}
                </label>
                <textarea
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder={language === 'ar' ? 'مثال: ترك الشحنة لدى الاستقبال أو الحارس...' : 'e.g. Leave with concierge or security gate...'}
                  className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-[#121212] border border-[#222222] p-5 sm:p-6 rounded-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? '3. طريقة الدفع' : '3. Payment Method'}
            </h2>

            <div className="space-y-3">
              {/* Apple Pay */}
              <label
                onClick={() => setPaymentMethod('apple_pay')}
                className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#C8A44D] bg-[#1A1A1A]'
                    : 'border-[#262626] bg-[#141414] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center border-neutral-500">
                    {paymentMethod === 'apple_pay' && <div className="w-2.5 h-2.5 rounded-full bg-[#C8A44D]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#C8A44D]" />
                    <span className="text-xs font-semibold text-white">Apple Pay</span>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">1-Touch TouchID / FaceID</span>
              </label>

              {/* Credit / Debit Card */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#C8A44D] bg-[#1A1A1A]'
                    : 'border-[#262626] bg-[#141414] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center border-neutral-500">
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#C8A44D]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C8A44D]" />
                    <span className="text-xs font-medium text-white">
                      {language === 'ar' ? 'بطاقة ائتمان / مدى (Visa / Mastercard)' : 'Credit / Debit Card (Visa, Mastercard)'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400">3D Secure</span>
              </label>

              {/* Tabby */}
              <label
                onClick={() => setPaymentMethod('tabby')}
                className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === 'tabby'
                    ? 'border-[#C8A44D] bg-[#1A1A1A]'
                    : 'border-[#262626] bg-[#141414] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center border-neutral-500">
                    {paymentMethod === 'tabby' && <div className="w-2.5 h-2.5 rounded-full bg-[#C8A44D]" />}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white block">
                      {language === 'ar' ? 'تابي: 4 دفعات ميسرة بدون فوائد' : 'Tabby: 4 Interest-Free Monthly Payments'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {formatPrice(total / 4)} {language === 'ar' ? 'شهرياً' : '/ month'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#C8A44D] font-mono">tabby</span>
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#C8A44D] bg-[#1A1A1A]'
                    : 'border-[#262626] bg-[#141414] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center border-neutral-500">
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#C8A44D]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#C8A44D]" />
                    <span className="text-xs font-medium text-white">
                      {language === 'ar' ? 'الدفع نقدياً أو بالبطاقة عند الاستلام (داخل الإمارات)' : 'Cash / Card on Delivery (Within UAE)'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400">UAE Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'محتويات الطلب والنقش' : 'Order Recap & Engravings'}
            </h2>

            {/* Itemized Line Items */}
            <div className="divide-y divide-[#1F1F1F] max-h-72 overflow-y-auto space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded bg-neutral-900 border border-[#262626] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {language === 'ar' ? item.product.name_ar : item.product.name}
                    </p>
                    {item.personalization?.engravingText && (
                      <p className="text-[11px] text-[#C8A44D] truncate">
                        "{item.personalization.engravingText}" ({item.personalization.metal})
                      </p>
                    )}
                    <div className="flex justify-between text-neutral-400 text-[11px] mt-0.5">
                      <span>Qty: {item.quantity}</span>
                      <span className="tabular-nums font-medium text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#1F1F1F] space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-semibold tabular-nums text-white">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'ar' ? 'الشحن' : 'Delivery'}</span>
                <span className={shippingCost === 0 ? 'text-[#C8A44D] font-medium' : 'text-white'}>
                  {shippingCost === 0 ? (language === 'ar' ? 'مجاني' : 'Complimentary') : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1F1F1F] flex justify-between text-sm">
                <span className="font-semibold text-white">{language === 'ar' ? 'المجموع الإجمالي' : 'Total'}</span>
                <div className="text-right rtl:text-left">
                  <span className="text-lg font-bold tabular-nums text-[#C8A44D]">
                    {formatPrice(total)}
                  </span>
                  <span className="block text-[10px] text-neutral-400 font-mono">
                    {language === 'ar' ? 'شامل ضريبة القيمة المضافة 5%' : 'Includes 5% UAE VAT'}
                  </span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-xs text-red-300 rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Place Order Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C8A44D]/20 disabled:opacity-50"
            >
              {submitting ? (
                <span>{language === 'ar' ? 'جاري تجهيز وتأكيد الطلب...' : 'Processing Bespoke Order...'}</span>
              ) : (
                <>
                  <span>
                    {language === 'ar' ? `تأكيد الطلب (${formatPrice(total)})` : `Place Order (${formatPrice(total)})`}
                  </span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

            <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#C8A44D] shrink-0" />
                <span>{language === 'ar' ? 'يتم إرسال رقم التتبع عبر الرسائل النصية والبريد' : 'Instant SMS & Email tracking dispatch'}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#C8A44D] shrink-0" />
                <span>{language === 'ar' ? 'تغليف الهدايا الملكي بالختم الشمعي مشمول مجاناً' : 'Complimentary royal velvet seal box included'}</span>
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
