import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { woocommerce } from '../services/woocommerce';
import { Order } from '../types';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { language, activeTrackingOrder, formatPrice } = useStore();
  const [orderNumber, setOrderNumber] = useState(activeTrackingOrder?.order_number || '');
  const [emailOrPhone, setEmailOrPhone] = useState(activeTrackingOrder?.billing.email || '');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(activeTrackingOrder || null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (activeTrackingOrder) {
      setTrackedOrder(activeTrackingOrder);
      setOrderNumber(activeTrackingOrder.order_number);
    }
  }, [activeTrackingOrder]);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setSearching(true);
    setNotFound(false);

    const result = await woocommerce.trackOrder(orderNumber, emailOrPhone);
    if (result) {
      setTrackedOrder(result);
    } else {
      setNotFound(true);
      setTrackedOrder(null);
    }
    setSearching(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-mono">
          EVAL UAE · COURIER DISPATCH
        </p>
        <h1 className="text-3xl font-serif-luxury font-semibold text-white">
          {language === 'ar' ? 'تتبع حالة طلبك ونقشه' : 'Track Your Bespoke Order'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          {language === 'ar'
            ? 'أدخل رقم الطلب (مثال: EV-10482) والبريد الإلكتروني لمتابعة الصياغة والتوصيل.'
            : 'Enter your order number (e.g. EV-10482) and contact details to track live atelier progress.'}
        </p>
      </div>

      {/* Tracking Search Form */}
      <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm shadow-xl">
        <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5">
            <label className="block text-xs text-neutral-300 mb-1">
              {language === 'ar' ? 'رقم الطلب *' : 'Order Number *'}
            </label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. EV-10482"
              className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none uppercase font-mono"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs text-neutral-300 mb-1">
              {language === 'ar' ? 'البريد أو رقم الهاتف' : 'Email or Phone'}
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="e.g. +971 50... or email"
              className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={searching}
              className="w-full h-10 bg-[#C8A44D] hover:bg-[#D6B866] text-black text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{searching ? (language === 'ar' ? 'بحث...' : '...') : (language === 'ar' ? 'تتبع' : 'Track')}</span>
            </button>
          </div>
        </form>

        {notFound && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800 text-xs text-red-300 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {language === 'ar'
                ? 'لم يتم العثور على طلب بهذا الرقم. يرجى التحقق من الرسالة النصية أو تجربة EV-10482.'
                : 'No order found with these credentials. Please check your SMS or try sample order EV-10482.'}
            </span>
          </div>
        )}
      </div>

      {/* Active Tracked Order View */}
      {trackedOrder && (
        <div className="space-y-6">
          {/* Order Header Summary */}
          <div className="bg-[#141414] border border-[#222222] p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#C8A44D] uppercase tracking-wider font-mono">
                {language === 'ar' ? 'الطلب نشط' : 'Active Shipment'} · {trackedOrder.order_number}
              </span>
              <h2 className="text-xl font-serif-luxury font-semibold text-white mt-1">
                {trackedOrder.courier}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {language === 'ar' ? 'موعد التوصيل المتوقع:' : 'Estimated Delivery:'} {trackedOrder.estimated_delivery}
              </p>
            </div>
            <div className="text-right rtl:text-left">
              <span className="text-xs font-mono text-neutral-400 block">
                Tracking: {trackedOrder.tracking_number}
              </span>
              <span className="text-sm font-semibold tabular-nums text-white">
                {formatPrice(trackedOrder.total)} ({trackedOrder.items.length} {language === 'ar' ? 'قطع' : 'items'})
              </span>
            </div>
          </div>

          {/* Detailed Stage Progression Timeline */}
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-3 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'سجل مراحل الصياغة والشحن' : 'Atelier Production & Courier Log'}
            </h3>

            <div className="relative border-l rtl:border-l-0 rtl:border-r border-[#222222] ml-4 rtl:ml-0 rtl:mr-4 space-y-8 pl-6 rtl:pl-0 rtl:pr-6">
              {trackedOrder.stages.map((stage, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      stage.completed
                        ? 'bg-[#C8A44D] border-[#C8A44D]'
                        : stage.active
                        ? 'bg-black border-[#C8A44D] animate-pulse'
                        : 'bg-[#181818] border-neutral-700'
                    }`}
                  >
                    {stage.completed && <CheckCircle2 className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </div>

                  {/* Stage Content */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4
                        className={`text-xs sm:text-sm font-semibold ${
                          stage.active || stage.completed ? 'text-white' : 'text-neutral-500'
                        }`}
                      >
                        {language === 'ar' ? stage.title_ar : stage.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#C8A44D] bg-[#1E1E1E] px-2 py-0.5 rounded">
                        {stage.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light">
                      {language === 'ar' ? stage.description_ar : stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items in this Order */}
          <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'القطع المنقوشة في هذه الشحنة' : 'Custom Inscriptions in this Package'}
            </h3>
            <div className="divide-y divide-[#1E1E1E]">
              {trackedOrder.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center gap-4 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded bg-neutral-900 border border-[#222222]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {language === 'ar' ? item.product.name_ar : item.product.name}
                    </p>
                    {item.personalization?.engravingText && (
                      <p className="text-xs text-[#C8A44D] mt-0.5">
                        {language === 'ar' ? 'النقش:' : 'Engraving:'} "{item.personalization.engravingText}" · {item.personalization.fontStyle}
                      </p>
                    )}
                    <p className="text-neutral-400 text-[11px]">{item.personalization?.metal}</p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-white">
                    Qty: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
