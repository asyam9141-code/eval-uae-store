import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'bespoke',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-mono">
          EVAL UAE · VIP CLIENT SERVICES
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-semibold text-white">
          {language === 'ar' ? 'تواصل مع كونسيرج إيڤال' : 'Contact Our VIP Concierge'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          {language === 'ar'
            ? 'سواء كنت ترغب في استشارة خاصة لهدايا الشركات أو تخصيص اسم فريد، فريقنا في دبي جاهز لخدمتك.'
            : 'Whether organizing bespoke corporate gifts or seeking personal engraving advice, our team is at your disposal.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct VIP Channels (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#121212] border border-[#222222] rounded-sm space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Concierge Channels'}
            </h3>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {language === 'ar' ? 'الرقم المجاني في الإمارات' : 'Toll-Free UAE Client Line'}
                  </p>
                  <p className="font-mono text-[#C8A44D] pt-0.5">+971 4 800 EVAL (3825)</p>
                  <p className="text-[11px] text-neutral-500">{language === 'ar' ? 'يومياً: 9:00 ص – 10:00 م' : 'Daily: 9:00 AM – 10:00 PM GST'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">WhatsApp VIP Concierge</p>
                  <a
                    href="https://wa.me/97148003825"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#C8A44D] hover:underline font-mono"
                  >
                    +971 50 800 EVAL
                  </a>
                  <p className="text-[11px] text-neutral-500">{language === 'ar' ? 'استجابة فورية خلال دقائق' : 'Average response: Under 5 mins'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Inquiries</p>
                  <p className="font-mono text-neutral-300">concierge@eval-uae.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {language === 'ar' ? 'صالة العرض والورشة' : 'Atelier & Private Salon'}
                  </p>
                  <p className="text-neutral-400">Building 7, Dubai Design District (d3), Dubai, UAE</p>
                  <p className="text-[11px] text-[#C8A44D] pt-1">
                    {language === 'ar' ? 'الزيارات بحجز موعد مسبق' : 'By private appointment only'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#141414] border border-[#262626] rounded-sm text-xs text-neutral-400 space-y-1">
            <p className="font-semibold text-white">
              {language === 'ar' ? 'طلبات الشركات والمناسبات الخاصة' : 'Corporate & VIP Gifting'}
            </p>
            <p>
              {language === 'ar'
                ? 'نوفر تصاميم مخصصة لشعارات الشركات والمؤسسات الحكومية والخاصة مع علب هدايا فاخرة بكميات خاصة.'
                : 'Custom corporate monograms, government delegations, and VIP milestone gifts available with bespoke embossing.'}
            </p>
          </div>
        </div>

        {/* Right Column: Contact Message Form (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="bg-[#121212] border border-[#222222] p-6 sm:p-8 rounded-sm space-y-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
              {language === 'ar' ? 'أرسل استفسارك الخاص' : 'Send a Private Inquiry'}
            </h3>

            {submitted ? (
              <div className="p-6 bg-[#161616] border border-[#C8A44D]/50 rounded-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1F1F1F] text-[#C8A44D] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif-luxury font-semibold text-white">
                  {language === 'ar' ? 'شكراً لتواصلك معنا' : 'Inquiry Received'}
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  {language === 'ar'
                    ? 'سيقوم أحد مستشاري إيڤال بالتواصل معك خلال ساعات قليلة عبر الواتساب أو البريد الإلكتروني.'
                    : 'A dedicated EVAL client advisor will contact you within a few hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 mb-1">
                      {language === 'ar' ? 'الاسم الكريم *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] p-2.5 text-white rounded-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] p-2.5 text-white rounded-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 mb-1">
                      {language === 'ar' ? 'رقم الهاتف (الإمارات أو دولي)' : 'Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50..."
                      className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] p-2.5 text-white rounded-sm focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">
                      {language === 'ar' ? 'نوع الاستفسار' : 'Inquiry Purpose'}
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] p-2.5 text-white rounded-sm focus:outline-none cursor-pointer"
                    >
                      <option value="bespoke">{language === 'ar' ? 'طلب نقش وتخصيص خاص' : 'Bespoke Inscription Request'}</option>
                      <option value="order-status">{language === 'ar' ? 'متابعة وتعديل طلب حالي' : 'Current Order Inquiry'}</option>
                      <option value="corporate">{language === 'ar' ? 'هدايا شركات وفعاليات' : 'Corporate / Bulk Commission'}</option>
                      <option value="showroom">{language === 'ar' ? 'حجز موعد في صالة العرض' : 'Book Showroom Appointment'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1">
                    {language === 'ar' ? 'تفاصيل الرسالة أو النص المراد نقشه *' : 'Your Message or Inscription Request *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={language === 'ar' ? 'اكتب تفاصيل طلبك هنا...' : 'Describe your custom request...'}
                    className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] p-3 text-white rounded-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold uppercase tracking-wider text-xs transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
