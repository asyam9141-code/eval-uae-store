import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, Truck, RotateCcw, Lock } from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: 'privacy' | 'returns' | 'shipping';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab = 'shipping' }) => {
  const { language } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'returns' | 'shipping'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C8A44D] font-mono">
          EVAL UAE · LEGAL & CLIENT TERMS
        </p>
        <h1 className="text-3xl font-serif-luxury font-semibold text-white">
          {language === 'ar' ? 'السياسات والشروط الرسمية' : 'Official Policies & Client Terms'}
        </h1>
      </div>

      {/* Segmented policy tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-[#1E1E1E] pb-3">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'shipping'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'text-neutral-400 hover:text-white bg-[#141414]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'سياسة الشحن والتوصيل' : 'Shipping Policy'}</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'returns'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'text-neutral-400 hover:text-white bg-[#141414]'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'سياسة الاسترجاع والاستبدال' : 'Returns & Refunds'}</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'text-neutral-400 hover:text-white bg-[#141414]'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-[#121212] border border-[#222222] p-6 sm:p-10 rounded-sm text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-6 font-light">
        
        {/* Tab 1: Shipping Policy */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif-luxury font-semibold text-white border-b border-[#1E1E1E] pb-3">
              {language === 'ar' ? 'سياسة الشحن والتوصيل داخل الإمارات ودول الخليج' : 'UAE & GCC Shipping & Delivery Policy'}
            </h2>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">1. UAE Domestic Delivery Times</h3>
              <p>
                All orders are dispatched directly from our atelier in Dubai Design District. Orders confirmed before 2:00 PM GST qualify for <strong>Same-Day Dubai Delivery</strong>. Deliveries to Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain are delivered within <strong>24 to 48 hours</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">2. Delivery Rates & Thresholds</h3>
              <p>
                - <strong>Complimentary UAE Delivery</strong>: Applicable on all orders exceeding 300 AED.<br />
                - <strong>Standard Express Delivery</strong>: A flat fee of 25 AED is applied on orders below 300 AED across the UAE.<br />
                - <strong>GCC Express (Saudi Arabia, Kuwait, Qatar, Oman, Bahrain)</strong>: 50 AED standard express (3-5 business days via DHL/Aramex).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">3. Packaging & Courier Handling</h3>
              <p>
                Every EVAL item is individually inspected and sealed in our protective velvet presentation jewelry box, secured with gold wax seals, and transported in climate-controlled courier vehicles to preserve metal luster and presentation box perfection.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Returns & Refunds Policy */}
        {activeTab === 'returns' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif-luxury font-semibold text-white border-b border-[#1E1E1E] pb-3">
              {language === 'ar' ? 'سياسة الاستبدال والاسترجاع والضمان' : 'Returns, Exchanges & Lifetime Warranty Policy'}
            </h2>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">1. Personalized & Custom Engraved Creations</h3>
              <p>
                Because bespoke engraved items (such as custom Arabic name bar necklaces, initial cufflinks, and personalized car hanging medallions) are manufactured uniquely according to client specifications, they cannot be returned or resold. However, if there is any typographical discrepancy caused on our part, we will craft a replacement free of charge immediately.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">2. Non-Personalized Items</h3>
              <p>
                Non-personalized items may be exchanged or returned within 14 calendar days from the date of delivery, provided the item is in pristine, unworn condition with all original security seals, velvet presentation boxes, and certificates intact.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">3. 18K Gold PVD Lifetime Color Guarantee</h3>
              <p>
                Every EVAL creation is backed by our signature warranty against rust, tarnishing, and plating degradation under normal daily wear. If your piece experiences plating failure, our Dubai atelier will re-finish or replace it.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif-luxury font-semibold text-white border-b border-[#1E1E1E] pb-3">
              {language === 'ar' ? 'سياسة الخصوصية وحماية البيانات الشخصية' : 'Data Protection & Privacy Policy'}
            </h2>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">1. Compliance with UAE Federal Law</h3>
              <p>
                EVAL UAE strictly adheres to UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL). We treat your contact information, delivery addresses, and custom inscription requests with supreme discretion.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">2. Payment Processing & Tokenization</h3>
              <p>
                We do not store or retain your complete credit or debit card details on our servers. All digital transactions are processed through level-1 PCI-DSS certified UAE payment gateways with 3D Secure verification and Apple Pay tokenization.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#C8A44D]">3. Inscription Privacy</h3>
              <p>
                Personal names, wedding dates, coordinates, and family monograms submitted for engraving are retained solely for the fulfillment and verification of your order and are never sold or shared with external advertising entities.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
