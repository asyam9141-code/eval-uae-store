export type Language = 'en' | 'ar';

export type Currency = 'AED' | 'SAR' | 'QAR' | 'KWD' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  rate: number;
  symbol: string;
  symbol_ar: string;
}

export interface MetalOption {
  id: string;
  name: string;
  name_ar: string;
  color: string;
  hex: string;
}

export interface FontOption {
  id: string;
  name: string;
  name_ar: string;
  fontClass: string;
  previewSample: string;
}

export interface PersonalizationOptions {
  max_chars: number;
  scripts: ('arabic' | 'english' | 'both')[];
  metals: MetalOption[];
  fonts: FontOption[];
  hasGiftBox: boolean;
  defaultText?: string;
  defaultArabicText?: string;
}

export interface ProductVariation {
  id: number;
  name: string;
  name_ar: string;
  price: number;
  regular_price?: number;
  attributes: Record<string, string>;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  comment_ar: string;
  verified: boolean;
}

export interface ProductSpecification {
  label: string;
  label_ar: string;
  value: string;
  value_ar: string;
}

export interface Product {
  id: number;
  name: string;
  name_ar: string;
  slug: string;
  price: number; // in AED
  regular_price?: number;
  sale_price?: number;
  on_sale: boolean;
  category_id: string;
  category_name: string;
  category_name_ar: string;
  images: string[];
  short_description: string;
  short_description_ar: string;
  description: string;
  description_ar: string;
  stock_status: 'instock' | 'outofstock';
  stock_quantity?: number;
  rating: number;
  rating_count: number;
  is_best_seller?: boolean;
  is_new_arrival?: boolean;
  personalization_supported: boolean;
  personalization_options?: PersonalizationOptions;
  variations?: ProductVariation[];
  specifications?: ProductSpecification[];
  reviews?: ProductReview[];
  sku?: string;
}

export interface PersonalizationDetails {
  engravingText?: string;
  arabicEngravingText?: string;
  fontStyle?: string;
  metal?: string;
  includeGiftBox?: boolean;
  giftMessage?: string;
}

export interface CartItem {
  id: string; // unique item id including personalization
  product_id: number;
  product: Product;
  quantity: number;
  price: number;
  personalization?: PersonalizationDetails;
  selected_variation?: ProductVariation;
}

export interface OrderStage {
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  date_created: string;
  status: 'processing' | 'crafting' | 'quality_check' | 'shipped' | 'delivered';
  currency: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping_cost: number;
  coupon_code?: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string; // Emirate
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    country: string;
    delivery_notes?: string;
  };
  items: CartItem[];
  tracking_number: string;
  courier: string;
  estimated_delivery: string;
  stages: OrderStage[];
}

export type PageView =
  | 'home'
  | 'shop'
  | 'category-womens'
  | 'category-mens'
  | 'category-car'
  | 'category-personalized'
  | 'category-necklaces'
  | 'category-bracelets'
  | 'category-keychains'
  | 'category-cufflinks'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'tracking'
  | 'contact'
  | 'about'
  | 'privacy'
  | 'returns'
  | 'shipping-policy'
  | 'woocommerce-sync';
