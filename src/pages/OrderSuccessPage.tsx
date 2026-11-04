import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  Phone,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { language, lastCreatedOrder, formatPrice, navigateTo, setActiveTrackingOrder } = useStore();

  const order = lastCreatedOrder;

  const handleTrackLive = () => {
    if (order) {
      setActiveTrackingOrder(order);
      navigateTo('tracking');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Success Hero Header */}
      <div className="text-center space-y-4 bg-[#121212] border border-[#222222] p-8 rounded-sm shadow-xl">
        <div className="w-16 h-16 bg-[#1A1A1A] border border-[#C8A44D] rounded-full flex items-center justify-center mx-auto text-[#C8A44D]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-mono">
            {language === 'ar' ? 'تم تأكيد طلبك بنجاح' : 'Order Confirmed & Production Queued'}
          </p>
          <h1 className="text-3xl font-serif-luxury font-semibold text-white">
            {language === 'ar' ? 'شكراً لثقتكم في إيڤال الإمارات' : 'Thank You for Choosing EVAL UAE'}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-light">
          {language === 'ar'
            ? `رقم طلبك هو ${order?.order_number || 'EV-89210'}. تم إرسال تفاصيل الفاتورة وإشعار الشحن إلى بريدك الإلكتروني.`
            : `Your bespoke order number is ${order?.order_number || 'EV-89210'}. Our master artisan has received your engraving specifications.`}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleTrackLive}
            className="px-6 py-2.5 bg-[#C8A44D] hover:bg-[#D6B866] text-black text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
          >
            {language === 'ar' ? 'تتبع مراحل النقش والشحن' : 'Track Engraving & Delivery'}
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-transparent border border-[#2D2D2D] hover:border-[#C8A44D] text-white text-xs font-medium uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
          >
            {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
          </button>
        </div>
      </div>

      {/* Production & Delivery Timeline Tracker */}
      <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white font-serif-luxury">
              {language === 'ar' ? 'مراحل التجهيز والصياغة في دبي' : 'Atelier Crafting & Delivery Stages'}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {order?.courier || 'EVAL Express White-Glove Service'}
            </p>
          </div>
          <span className="text-xs text-[#C8A44D] font-mono">
            {order?.tracking_number || 'EVAL-DXB-9841'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#181818] border border-[#C8A44D] rounded-sm space-y-1">
            <span className="text-[10px] text-[#C8A44D] font-bold uppercase tracking-wider block">Stage 1 · Verified</span>
            <p className="text-xs font-semibold text-white">
              {language === 'ar' ? 'تم استلام وتأكيد الطلب' : 'Order Placed & Verified'}
            </p>
            <p className="text-[11px] text-neutral-400">
              {language === 'ar' ? 'تم اعتماد الدفع وتعيين كود القطعة' : 'Payment approved & SKU assigned'}
            </p>
          </div>

          <div className="p-4 bg-[#181818] border border-[#C8A44D]/50 rounded-sm space-y-1">
            <span className="text-[10px] text-[#C8A44D] font-bold uppercase tracking-wider block">Stage 2 · In Progress</span>
            <p className="text-xs font-semibold text-white">
              {language === 'ar' ? 'النقش والصياغة بالورشة' : 'Atelier Engraving'}
            </p>
            <p className="text-[11px] text-neutral-400">
              {language === 'ar' ? 'النقش الليزري على الذهب عيار 18' : 'Laser engraving on 18K gold core'}
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-[#222222] rounded-sm space-y-1 opacity-70">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Stage 3 · Next</span>
            <p className="text-xs font-semibold text-white">
              {language === 'ar' ? 'فحص الجودة والختم الشمعي' : 'Quality & Wax Seal'}
            </p>
            <p className="text-[11px] text-neutral-400">
              {language === 'ar' ? 'تلميع الحواف وتجهيز الصندوق المخملي' : 'Mirror buffing & velvet box packaging'}
            </p>
          </div>

          <div className="p-4 bg-[#141414] border border-[#222222] rounded-sm space-y-1 opacity-70">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Stage 4 · Final</span>
            <p className="text-xs font-semibold text-white">
              {language === 'ar' ? 'التسليم للمندوب والتوصيل' : 'UAE Courier Delivery'}
            </p>
            <p className="text-[11px] text-neutral-400">
              {language === 'ar' ? 'توصيل مباشر حتى باب الفيلا' : 'Direct doorstep delivery in UAE'}
            </p>
          </div>
        </div>
      </div>

      {/* Recipient & Shipping Information Recap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121212] border border-[#222222] p-5 rounded-sm space-y-3">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
            {language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
          </h4>
          <div className="text-xs text-neutral-300 space-y-1">
            <p className="font-semibold text-white">
              {order?.billing.first_name} {order?.billing.last_name}
            </p>
            <p>{order?.shipping.address || 'Villa 28, Al Wasl Road'}</p>
            <p>{order?.shipping.city || 'Dubai'}, United Arab Emirates</p>
            <p className="font-mono text-neutral-400 pt-1">{order?.billing.phone}</p>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#222222] p-5 rounded-sm space-y-3">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
            {language === 'ar' ? 'خدمة كونسيرج الهدايا الفاخرة' : 'VIP Gift Concierge'}
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {language === 'ar'
              ? 'هل تحتاج لتعديل نص النقش أو تغيير موعد التوصيل؟ تواصل مباشرة مع فريق كونسيرج إيڤال عبر الواتساب.'
              : 'Need to alter your inscription or arrange priority morning delivery? Our Dubai concierge is at your service.'}
          </p>
          <a
            href="https://wa.me/97148003825"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-xs text-[#C8A44D] hover:underline font-medium pt-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp VIP: +971 4 800 EVAL (3825)</span>
          </a>
        </div>
      </div>

    </div>
  );
};
