import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { woocommerce } from '../services/woocommerce';
import { ProductCard } from '../components/ProductCard';
import { EVAL_PRODUCTS } from '../data/products';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  Sparkles,
  ChevronRight,
  LogOut,
  Clock
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { language, wishlist, navigateTo, setActiveTrackingOrder, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'preferences'>('orders');

  const orders = woocommerce.getLocalOrders();
  const wishlistProducts = EVAL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleTrackClick = (order: any) => {
    setActiveTrackingOrder(order);
    navigateTo('tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Account Hero Banner */}
      <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1C1C1C] border border-[#C8A44D] flex items-center justify-center text-[#C8A44D]">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif-luxury font-semibold text-white">
                Sultan Al Nuaimi
              </h1>
              <span className="text-[10px] text-[#C8A44D] bg-[#1E1E1E] px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                EVAL VIP Member
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              sultan.nuaimi@example.ae · Dubai, UAE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-neutral-400">
          <span className="font-mono text-[#C8A44D]">{orders.length}</span> {language === 'ar' ? 'طلبات منجزة' : 'Orders'}
          <span>·</span>
          <span className="font-mono text-[#C8A44D]">{wishlist.length}</span> {language === 'ar' ? 'في المفضلة' : 'Saved'}
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#1E1E1E] pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`p-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'bg-[#141414] text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{language === 'ar' ? 'طلباتي السابقة' : 'Order History'}</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`p-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'wishlist'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'bg-[#141414] text-neutral-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{language === 'ar' ? 'قائمة الأمنيات' : 'My Wishlist'}</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`p-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'bg-[#141414] text-neutral-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{language === 'ar' ? 'عناوين التوصيل' : 'Saved Addresses'}</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`p-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-[#C8A44D] text-black shadow-sm'
              : 'bg-[#141414] text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{language === 'ar' ? 'تفضيلات النقش' : 'Engraving Style'}</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-white font-serif-luxury">
            {language === 'ar' ? 'سجل الطلبات والتتبع الفوري' : 'Recent Bespoke Commissions'}
          </h2>

          {orders.length === 0 ? (
            <p className="text-xs text-neutral-400 py-8 text-center bg-[#121212] rounded-sm">
              {language === 'ar' ? 'لا توجد طلبات سابقة بعد.' : 'No previous orders found.'}
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 bg-[#121212] border border-[#1E1E1E] rounded-sm space-y-4 hover:border-[#C8A44D]/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1A1A1A]">
                  <div>
                    <span className="text-xs font-bold text-white font-mono">{order.order_number}</span>
                    <span className="text-neutral-500 text-xs mx-2">·</span>
                    <span className="text-xs text-neutral-400">
                      {new Date(order.date_created).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#C8A44D] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#C8A44D]/20 uppercase">
                      {order.status}
                    </span>
                    <button
                      onClick={() => handleTrackClick(order)}
                      className="text-xs text-[#C8A44D] hover:underline font-medium cursor-pointer"
                    >
                      {language === 'ar' ? 'تتبع الشحنة' : 'Track Order'}
                    </button>
                  </div>
                </div>

                {/* Items preview */}
                <div className="divide-y divide-[#1A1A1A]">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded bg-neutral-900 border border-[#222222]"
                        />
                        <div>
                          <p className="font-medium text-white">{item.product.name}</p>
                          {item.personalization?.engravingText && (
                            <p className="text-[11px] text-[#C8A44D]">
                              "{item.personalization.engravingText}" ({item.personalization.metal})
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-neutral-300">
                        Qty: {item.quantity} · {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs border-t border-[#1A1A1A]">
                  <span className="text-neutral-400">
                    {language === 'ar' ? 'العنوان:' : 'Delivered to:'} {order.shipping.city}, UAE
                  </span>
                  <span className="font-semibold tabular-nums text-[#C8A44D]">
                    Total: {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-white font-serif-luxury">
            {language === 'ar' ? 'المقتنيات المحفوظة' : 'Saved Creations'} ({wishlistProducts.length})
          </h2>

          {wishlistProducts.length === 0 ? (
            <p className="text-xs text-neutral-400 py-12 text-center bg-[#121212] rounded-sm">
              {language === 'ar' ? 'قائمة أمنياتك فارغة حالياً.' : 'Your wishlist is currently empty.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-[#121212] border border-[#C8A44D] rounded-sm space-y-2 relative">
            <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[10px] text-[#C8A44D] uppercase font-mono font-bold bg-[#1C1C1C] px-2 py-0.5 rounded">
              Primary UAE Residence
            </span>
            <h3 className="text-sm font-semibold text-white">Sultan Al Nuaimi</h3>
            <p className="text-xs text-neutral-300">Villa 14, Al Safa 2, Jumeirah</p>
            <p className="text-xs text-neutral-300">Dubai, United Arab Emirates</p>
            <p className="text-xs text-neutral-400 font-mono pt-1">+971 50 123 4567</p>
          </div>

          <div className="p-5 bg-[#121212] border border-[#222222] rounded-sm space-y-2">
            <h3 className="text-sm font-semibold text-white">Office / DIFC</h3>
            <p className="text-xs text-neutral-300">Gate Precinct Building 4, Level 6</p>
            <p className="text-xs text-neutral-300">Dubai International Financial Centre</p>
            <p className="text-xs text-neutral-400 font-mono pt-1">+971 4 400 9000</p>
          </div>
        </div>
      )}

      {/* Tab 4: Engraving Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-6 max-w-2xl">
          <h2 className="text-base font-semibold text-white font-serif-luxury">
            {language === 'ar' ? 'تفضيلات النقش بالخط العربي' : 'Default Inscription Settings'}
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 mb-1 font-medium">
                {language === 'ar' ? 'المعدن المفضل:' : 'Preferred Precious Metal Finish:'}
              </label>
              <select className="w-full bg-[#181818] border border-[#2A2A2A] text-white p-2.5 rounded-sm focus:outline-none">
                <option>18K Royal Gold (Default)</option>
                <option>Rose Gold</option>
                <option>Platinum Silver</option>
                <option>Obsidian Matte Black</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 mb-1 font-medium">
                {language === 'ar' ? 'خط الخط العربي المعتمد لديك:' : 'Preferred Arabic Calligraphy Script:'}
              </label>
              <select className="w-full bg-[#181818] border border-[#2A2A2A] text-white p-2.5 rounded-sm focus:outline-none">
                <option>Diwani Calligraphy (الخط الديواني الملكي)</option>
                <option>Ruqaa Classic (خط الرقعة التراثي)</option>
                <option>Thuluth Majestic (خط الثلث الجليل)</option>
                <option>Modern Minimalist (الخط الحديث)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-6 py-2.5 bg-[#C8A44D] text-black text-xs font-semibold uppercase tracking-wider rounded-sm"
              >
                {language === 'ar' ? 'حفظ التفضيلات' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
