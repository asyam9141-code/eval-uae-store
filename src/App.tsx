/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { WooCommerceSyncModal } from './pages/WooCommerceSyncModal';

const AppContent: React.FC = () => {
  const { currentView, selectedProductSlug } = useStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;

      case 'shop':
        return <ShopPage initialCategory="all" />;

      case 'category-womens':
        return (
          <ShopPage
            initialCategory="womens"
            categoryTitle="Women's Accessories"
            categoryTitleAr="إكسسوارات نسائية"
            categorySubtitle="Bespoke 18K gold plated name necklaces, delicate bangles, and personalized jewelry."
            categorySubtitleAr="قلائد الاسم المطلية بالذهب عيار 18، الأساور الرقيقة والمجوهرات المخصصة."
          />
        );

      case 'category-mens':
        return (
          <ShopPage
            initialCategory="mens"
            categoryTitle="Men's Accessories"
            categoryTitleAr="إكسسوارات رجالية"
            categorySubtitle="Architectural cufflinks, titanium steel bracelets, and monogrammed leather keychains."
            categorySubtitleAr="أزرار أكمام هندسية، أساور التيتانيوم الصلبة وميداليات جلد السافيانو بالختم الحراري."
          />
        );

      case 'category-car':
        return (
          <ShopPage
            initialCategory="car"
            categoryTitle="Car Accessories"
            categoryTitleAr="إكسسوارات السيارات"
            categorySubtitle="Custom engraved rear-view mirror hanging medallions and sun-visor clips with Arabic calligraphy."
            categorySubtitleAr="معلقات مرايا السيارات بالاسم ودعاء السفر مع شرابات حريرية تناسب أفخم المقصورات."
          />
        );

      case 'category-personalized':
        return (
          <ShopPage
            initialCategory="personalized"
            categoryTitle="Personalized Gifts"
            categoryTitleAr="هدايا شخصية"
            categorySubtitle="Custom laser-engraved names, monograms, and significant dates on solid 18K gold dipped metals."
            categorySubtitleAr="نقش ليزري ميكروني للأسماء، التواريخ، والخط العربي الملكي على معادن مطلية بذهب عيار 18."
          />
        );

      case 'category-necklaces':
        return (
          <ShopPage
            initialCategory="necklaces"
            categoryTitle="Necklaces & Chains"
            categoryTitleAr="القلائد والسلاسل"
            categorySubtitle="Horizontal bar necklaces, Ayat Al-Kursi geometric medallions, and Arabic calligraphy."
            categorySubtitleAr="قلائد البار الأيقونية وسلاسل الخط العربي وميداليات آية الكرسي المنقوشة بالذهب."
          />
        );

      case 'category-bracelets':
        return (
          <ShopPage
            initialCategory="bracelets"
            categoryTitle="Bracelets & Bangles"
            categoryTitleAr="الأساور"
            categorySubtitle="Aerospace titanium cuffs and adjustable 18K gold link bracelets with custom engraving."
            categorySubtitleAr="أساور التيتانيوم المقاومة للخدش والبناجر المطلية بالذهب القابلة للتعديل."
          />
        );

      case 'category-keychains':
        return (
          <ShopPage
            initialCategory="keychains"
            categoryTitle="Luxury Keychains"
            categoryTitleAr="سلاسل المفاتيح"
            categorySubtitle="Full-grain calfskin leather and heavy brass gold rings with custom initials."
            categorySubtitleAr="سلاسل وميداليات مفاتيح مصنوعة من جلد السافيانو الإيطالي وحلقات مذهبة."
          />
        );

      case 'category-cufflinks':
        return (
          <ShopPage
            initialCategory="cufflinks"
            categoryTitle="Men's Cufflinks"
            categoryTitleAr="أزرار الأكمام"
            categorySubtitle="Satin-brushed 18K gold and obsidian cufflinks for bespoke kanduras and formal attire."
            categorySubtitleAr="أزرار أكمام مصقولة بذهب عيار 18 والأوبسيديان للكندورة الإماراتية والبدلات الرسمية."
          />
        );

      case 'product-detail':
        return <ProductDetailPage slug={selectedProductSlug || 'royal-arabic-name-bar-necklace'} />;

      case 'cart':
        return <CartPage />;

      case 'checkout':
        return <CheckoutPage />;

      case 'order-success':
        return <OrderSuccessPage />;

      case 'account':
        return <AccountPage />;

      case 'tracking':
        return <OrderTrackingPage />;

      case 'contact':
        return <ContactPage />;

      case 'about':
        return <AboutPage />;

      case 'privacy':
        return <PoliciesPage initialTab="privacy" />;

      case 'returns':
        return <PoliciesPage initialTab="returns" />;

      case 'shipping-policy':
        return <PoliciesPage initialTab="shipping" />;

      case 'woocommerce-sync':
        return <WooCommerceSyncModal />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-between selection:bg-[#C8A44D] selection:text-black">
      <div>
        <AnnouncementBar />
        <Header />
        <main className="min-h-[70vh]">
          {renderCurrentView()}
        </main>
      </div>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
