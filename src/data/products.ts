import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/eval_hero_campaign_1793755238154.jpg';
export const CAT_PERSONALIZED_IMAGE = '/src/assets/images/cat_personalized_gifts_1793755239175.jpg';
export const CAT_MENS_IMAGE = '/src/assets/images/cat_mens_cufflinks_1793755239946.jpg';
export const CAT_CAR_IMAGE = '/src/assets/images/cat_car_accessories_1793755254846.jpg';
export const ATELIER_IMAGE = '/src/assets/images/craftsmanship_atelier_1793755240323.jpg';

export const METALS = [
  { id: '18k-gold', name: '18K Royal Gold', name_ar: 'ذهب ملكي عيار 18', color: 'Gold', hex: '#C8A44D' },
  { id: 'rose-gold', name: 'Rose Gold', name_ar: 'ذهب وردي', color: 'Rose Gold', hex: '#E0A899' },
  { id: 'silver-rhodium', name: 'Platinum Silver', name_ar: 'فضة بلاتينية', color: 'Silver', hex: '#E5E7EB' },
  { id: 'matte-black', name: 'Matte Obsidian Black', name_ar: 'أسود أوبسيديان مات', color: 'Black', hex: '#1C1C1E' }
];

export const CALLIGRAPHY_FONTS = [
  { id: 'diwani', name: 'Diwani Calligraphy', name_ar: 'الخط الديواني الملكي', fontClass: 'font-calligraphy italic', previewSample: 'إيڤال' },
  { id: 'ruqaa', name: 'Ruqaa Classic', name_ar: 'خط الرقعة التراثي', fontClass: 'font-ruqaa', previewSample: 'نورا' },
  { id: 'modern-serif', name: 'Modern Minimalist', name_ar: 'خط عربي حديث', fontClass: 'font-arabic font-semibold', previewSample: 'زايد' },
  { id: 'thuluth', name: 'Thuluth Majestic', name_ar: 'خط الثلث الجليل', fontClass: 'font-calligraphy font-bold', previewSample: 'عبدالله' }
];

export const EVAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Royal Arabic Name Bar Necklace — 18K Gold',
    name_ar: 'قلادة البار الملكية بالاسم بالخط العربي — ذهب عيار 18',
    slug: 'royal-arabic-name-bar-necklace',
    price: 380,
    regular_price: 450,
    sale_price: 380,
    on_sale: true,
    category_id: 'personalized-gifts',
    category_name: 'Personalized Gifts',
    category_name_ar: 'هدايا مخصصة',
    images: [
      CAT_PERSONALIZED_IMAGE,
      HERO_IMAGE,
      ATELIER_IMAGE
    ],
    short_description: 'Precision laser-engraved with your chosen name in bespoke Arabic calligraphy on heavy 18K gold-plated stainless core. Never fades, shower-safe.',
    short_description_ar: 'محفورة بدقة ليزرية بالاسم الذي تختاره بالخط العربي الملكي، مطلية بالذهب عيار 18 مقاومة للماء وتغير اللون.',
    description: 'The signature piece of EVAL UAE. Designed in our Dubai atelier, this horizontal bar necklace harmonizes modern geometric lines with the timeless grace of classic Arabic calligraphy. Master craftsmen carefully polish every beveled edge to an opulent mirror sheen. Delivered in EVAL luxury velvet presentation box.',
    description_ar: 'القطعة الأيقونية من إيڤال الإمارات. صُممت في ورشتنا الفاخرة بدبي، وتجمع بين النقاء الهندسي الحديث وأصالة الخط العربي التراثي. مصقولة يدوياً بحواف ناعمة ولمعان فاخر، تأتي في صندوق مخملي يحمل ختم الشمع الذهبي.',
    stock_status: 'instock',
    stock_quantity: 42,
    rating: 4.9,
    rating_count: 128,
    is_best_seller: true,
    is_new_arrival: false,
    personalization_supported: true,
    personalization_options: {
      max_chars: 16,
      scripts: ['arabic', 'english', 'both'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'Noora',
      defaultArabicText: 'نورا'
    },
    specifications: [
      { label: 'Material', label_ar: 'المعدن', value: '316L Surgical Stainless Steel with 2.5 Micron 18K Gold PVD', value_ar: 'فولاذ مقاوم للصدأ مطلي بذهب 18 قيراط بتقنية PVD' },
      { label: 'Pendant Dimensions', label_ar: 'أبعاد القلادة', value: '35mm x 7mm x 1.8mm', value_ar: '35 ملم × 7 ملم × 1.8 ملم' },
      { label: 'Chain Length', label_ar: 'طول السلسلة', value: '45cm + 5cm extension adjustable', value_ar: '45 سم + 5 سم وصلة تمديد قابلة للتعديل' },
      { label: 'Origin', label_ar: 'بلد الصنع', value: 'Hand-assembled and engraved in Dubai, UAE', value_ar: 'تم التجميع والنقش يدوياً في دبي، الإمارات' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Fatima Al Mansoori',
        city: 'Abu Dhabi',
        rating: 5,
        date: '2026-10-24',
        comment: 'The calligraphy precision is breathtaking. The weight feels genuinely luxurious, not light or cheap. Packaging was like receiving high jewelry.',
        comment_ar: 'دقة الخط العربي خيالية! وزن القطعة فاخر جداً وملمسها ناعم، والتغليف راقي كأنها من أفخم دور المجوهرات العالمية.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Rashid K.',
        city: 'Dubai',
        rating: 5,
        date: '2026-10-18',
        comment: 'Ordered as an anniversary gift with my wife’s name in Diwani script. She absolutely loved it. Same-day delivery in Dubai was flawless.',
        comment_ar: 'طلبتها كهدية لزوجتي بالخط الديواني، التوصيل في نفس اليوم بدبي والنتيجة أجمل من الصور بمراحل.',
        verified: true
      }
    ],
    sku: 'EV-NK-101-GLD'
  },
  {
    id: 102,
    name: 'Custom Calligraphy Luxury Car Hanging Medallion',
    name_ar: 'معلقة السيارة الفاخرة بالاسم والخط العربي الملكي',
    slug: 'custom-calligraphy-luxury-car-hanging-medallion',
    price: 320,
    regular_price: 360,
    sale_price: 320,
    on_sale: true,
    category_id: 'car-accessories',
    category_name: 'Car Accessories',
    category_name_ar: 'إكسسوارات السيارات',
    images: [
      CAT_CAR_IMAGE,
      HERO_IMAGE,
      ATELIER_IMAGE
    ],
    short_description: 'Double-sided mirror engraved luxury emblem suspended with hand-braided silk cord and rich black tassel. Featuring customized names or Duaa Al-Safar.',
    short_description_ar: 'شعار مزدوج الوجهين محفور بالليزر مع حبل حريري مجدول وشرابة سوداء أنيقة. تخصيص بالاسم أو دعاء السفر.',
    description: 'Elevate your vehicle interior with EVAL’s bespoke car medallion. Crafted to complement ultra-luxury vehicle interiors from Rolls Royce to Bentley, Porsche, and Mercedes-Benz. Double-sided 18K gold and obsidian finish catches ambient sunset rays without creating hazardous glare.',
    description_ar: 'ارتقِ بتصميم مقصورة سيارتك مع معلقة إيڤال الملكية. صممت لتتناغم مع أرقى مقصورات السيارات الفارهة. طبقات من الذهب عيار 18 والأوبسيديان المقاوم للشمس والحرارة العالية مع شرابة حريرية سوداء فاخرة.',
    stock_status: 'instock',
    stock_quantity: 35,
    rating: 5.0,
    rating_count: 94,
    is_best_seller: true,
    is_new_arrival: false,
    personalization_supported: true,
    personalization_options: {
      max_chars: 24,
      scripts: ['arabic', 'english', 'both'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'Abdullah & Sara',
      defaultArabicText: 'عبدالله وسارة'
    },
    specifications: [
      { label: 'Diameter', label_ar: 'القطر', value: '62mm', value_ar: '62 ملم' },
      { label: 'Cord Length', label_ar: 'طول التعليقة', value: '180mm braided silk with magnetic lock', value_ar: '180 ملم حرير مجدول مع قفل مغناطيسي' },
      { label: 'Heat Resistance', label_ar: 'مقاومة الحرارة', value: 'Tested up to 85°C UV & Gulf direct heat exposure', value_ar: 'مقاومة لحرارة شمس الخليج حتى 85 درجة مئوية' }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Sultan Al Qasimi',
        city: 'Sharjah',
        rating: 5,
        date: '2026-10-29',
        comment: 'Matches my Bentley interior flawlessly. High heat in UAE parking has not affected the gold finish at all after 3 months.',
        comment_ar: 'تناسبت بشكل مذهل مع سيارتي، والذهب ثابت ولم يتأثر إطلاقاً بحرارة الصيف ومواقف السيارات.',
        verified: true
      }
    ],
    sku: 'EV-CAR-102-GLD'
  },
  {
    id: 103,
    name: 'Royal Monogram Brushed Gold & Obsidian Cufflinks',
    name_ar: 'أزرار أكمام ملكية منقوشة بالذهب المصقول والأوبسيديان',
    slug: 'royal-monogram-brushed-gold-obsidian-cufflinks',
    price: 340,
    regular_price: 390,
    sale_price: 340,
    on_sale: true,
    category_id: 'cufflinks',
    category_name: 'Cufflinks & Men',
    category_name_ar: 'أزرار الأكمام وإكسسوارات رجالية',
    images: [
      CAT_MENS_IMAGE,
      HERO_IMAGE,
      ATELIER_IMAGE
    ],
    short_description: 'Architectural beveled cufflinks featuring custom laser-engraved initials. Weighted brass core coated with rich 18K gold and satin-brushed face.',
    short_description_ar: 'أزرار أكمام بهندسة عصرية محفورة بالحروف المخصصة. قلب من النحاس الثقيل مطلي بالذهب عيار 18 مع سطح مصقول ساتان.',
    description: 'Understated masculine elegance. Designed for bespoke kanduras and tailored tuxedo cuffs. The custom engraved initials are executed with microscopic precision, capturing the spirit of quiet luxury.',
    description_ar: 'أناقة رجالية هادئة وفخمة، مصممة خصيصاً للكندورة الإماراتية الأنيقة والبدلات الرسمية. يتم حفر الحروف الأولى بدقة فائقة لتعكس الفخامة الصامتة.',
    stock_status: 'instock',
    stock_quantity: 28,
    rating: 4.8,
    rating_count: 73,
    is_best_seller: true,
    is_new_arrival: false,
    personalization_supported: true,
    personalization_options: {
      max_chars: 4,
      scripts: ['english', 'arabic'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'AGL',
      defaultArabicText: 'م.ع'
    },
    specifications: [
      { label: 'Closure Mechanism', label_ar: 'نوع القفل', value: 'Whaleback Swivel Hinge', value_ar: 'مفصل متحرك عالي الجودة' },
      { label: 'Weight', label_ar: 'الوزن', value: '18.4g per pair (Solid weighted feel)', value_ar: '18.4 غرام للزوج (ملمس صلب وثقيل)' }
    ],
    sku: 'EV-MN-103-GLD'
  },
  {
    id: 104,
    name: 'Titanium Steel & 18K Gold Engraved ID Bracelet',
    name_ar: 'سوار التيتانيوم الأنيق بالاسم والذهب عيار 18',
    slug: 'titanium-steel-gold-engraved-id-bracelet',
    price: 360,
    regular_price: 420,
    sale_price: 360,
    on_sale: true,
    category_id: 'bracelets',
    category_name: 'Bracelets',
    category_name_ar: 'الأساور',
    images: [
      CAT_MENS_IMAGE,
      HERO_IMAGE
    ],
    short_description: 'Sleek architectural link bracelet in matte aerospace titanium with a solid 18K gold centerplate engraved with your signature coordinates or name.',
    short_description_ar: 'سوار مصفح بتصميم هندسي من التيتانيوم المات ولوحة مركزية من الذهب عيار 18 محفورة باسمك أو إحداثياتك المفضلة.',
    description: 'Engineered for durability and understated presence. Crafted from aircraft-grade titanium with an 18K gold inlay plaque that can be engraved with Arabic or English typography.',
    description_ar: 'صنع من تيتانيوم الطائرات المقاوم للخدوش مع صفيحة ذهبية عيار 18 جاهزة للنقش المخصص لتعبر عن شخصيتك وتفردك.',
    stock_status: 'instock',
    stock_quantity: 19,
    rating: 4.9,
    rating_count: 51,
    is_best_seller: false,
    is_new_arrival: true,
    personalization_supported: true,
    personalization_options: {
      max_chars: 14,
      scripts: ['arabic', 'english'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'DUBAI 25.2048°N',
      defaultArabicText: 'دبي ٢٥.٢٠٤٨'
    },
    sku: 'EV-BR-104-TTN'
  },
  {
    id: 105,
    name: 'Handcrafted Italian Saffiano Leather & Gold Keyring',
    name_ar: 'ميدالية مفاتيح من جلد السافيانو الإيطالي والذهب عيار 18',
    slug: 'handcrafted-italian-saffiano-leather-gold-keyring',
    price: 260,
    regular_price: 290,
    sale_price: 260,
    on_sale: false,
    category_id: 'keychains',
    category_name: 'Keychains & Gifts',
    category_name_ar: 'الميداليات والهدايا',
    images: [
      CAT_MENS_IMAGE,
      HERO_IMAGE
    ],
    short_description: 'Full-grain Italian Saffiano leather case with snap fastener and heavy 18K gold brass ring with deep hot-foil monogram stamping.',
    short_description_ar: 'جلد سافيانو إيطالي أصلي فاخر مع حلقة نحاسية سميكة مطلية بالذهب وختم حراري بالحروف الأولى.',
    description: 'The definitive daily accessory for luxury car fobs and home keys. Scratch-resistant textured calfskin paired with solid gold-toned brass hardware.',
    description_ar: 'الإكسسوار اليومي المثالي لمفاتيح السيارات الفارهة والمنازل. جلد عجل إيطالي معالج مقاوم للخدش مع حلقة معدنية مذهبة فاخرة.',
    stock_status: 'instock',
    stock_quantity: 50,
    rating: 4.9,
    rating_count: 82,
    is_best_seller: true,
    is_new_arrival: false,
    personalization_supported: true,
    personalization_options: {
      max_chars: 6,
      scripts: ['english', 'arabic'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'A.G.L',
      defaultArabicText: 'إيڤال'
    },
    sku: 'EV-KC-105-LTR'
  },
  {
    id: 106,
    name: 'Ayat Al-Kursi Sacred Geometry Gold Medallion Pendant',
    name_ar: 'ميدالية آية الكرسي المطلية بالذهب عيار 18 بتصميم هندسي إسلامي',
    slug: 'ayat-al-kursi-sacred-geometry-gold-medallion',
    price: 440,
    regular_price: 520,
    sale_price: 440,
    on_sale: true,
    category_id: 'necklaces',
    category_name: 'Necklaces & Pendants',
    category_name_ar: 'القلائد والميداليات',
    images: [
      ATELIER_IMAGE,
      CAT_PERSONALIZED_IMAGE,
      HERO_IMAGE
    ],
    short_description: 'Sacred Thuluth calligraphy intricately sculpted on a raised 18K gold disc surrounded by traditional Islamic octagonal arabesque frame.',
    short_description_ar: 'خط الثلث القرآني البديع محفور بنتوء بارز على قرص من الذهب عيار 18 محاط بإطار أرابيسك إسلامي ثماني الأضلاع.',
    description: 'A masterpiece of Islamic art and contemporary craftsmanship. Complete Ayat Al-Kursi engraved in concentric calligraphic rings with extreme legibility and reverence.',
    description_ar: 'تحفة فنية تجمع بين التراث الإسلامي الروحي ودقة الصياغة العصرية. آية الكرسي كاملة بخط متناهي الصغر والدقة يجسد البركة والجمال.',
    stock_status: 'instock',
    stock_quantity: 15,
    rating: 5.0,
    rating_count: 147,
    is_best_seller: true,
    is_new_arrival: true,
    personalization_supported: true,
    personalization_options: {
      max_chars: 12,
      scripts: ['arabic', 'english'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'Protection',
      defaultArabicText: 'حفظكم الله'
    },
    sku: 'EV-NK-106-ISL'
  },
  {
    id: 107,
    name: 'Bespoke Octagonal Royal Initial Cufflinks',
    name_ar: 'أزرار أكمام ملكية ثمانية الأضلاع بالحرف الشخصي',
    slug: 'bespoke-octagonal-royal-initial-cufflinks',
    price: 360,
    regular_price: 410,
    sale_price: 360,
    on_sale: false,
    category_id: 'cufflinks',
    category_name: 'Cufflinks & Men',
    category_name_ar: 'أزرار الأكمام وإكسسوارات رجالية',
    images: [
      CAT_MENS_IMAGE,
      HERO_IMAGE
    ],
    short_description: 'Distinctive octagonal geometry inspired by Arabian royal architecture. Deep relief engraving with personal family crest or letters.',
    short_description_ar: 'هندسة ثمانية مستوحاة من العمارة الملكية العربية. نقش بارز بالحرف أو الشعار العائلي الخاص.',
    description: 'Precision cut from solid jewelers brass with heavy micron 18K gold dipping. A timeless staple for formal UAE gatherings and milestone celebrations.',
    description_ar: 'قطعة فنية مقطوعة بدقة من النحاس الخالص ومطلية بطبقات مكثفة من الذهب عيار 18 لترافقك في كافة المناسبات الرسمية وحفلات الزفاف.',
    stock_status: 'instock',
    stock_quantity: 22,
    rating: 4.9,
    rating_count: 39,
    is_best_seller: false,
    is_new_arrival: true,
    personalization_supported: true,
    personalization_options: {
      max_chars: 2,
      scripts: ['arabic', 'english'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'E',
      defaultArabicText: 'إ'
    },
    sku: 'EV-CL-107-OCT'
  },
  {
    id: 108,
    name: 'Personalized Saffiano Leather Travel Jewelry Case',
    name_ar: 'حقيبة مجوهرات السفر الجلدية الفاخرة بالاسم والذهب',
    slug: 'personalized-saffiano-leather-travel-jewelry-case',
    price: 290,
    regular_price: 350,
    sale_price: 290,
    on_sale: true,
    category_id: 'personalized-gifts',
    category_name: 'Personalized Gifts',
    category_name_ar: 'هدايا مخصصة',
    images: [
      CAT_PERSONALIZED_IMAGE,
      HERO_IMAGE
    ],
    short_description: 'Plush velvet interior compartments with zip-around gold closure. Hot-stamped in 24K gold foil with your name in Arabic calligraphy.',
    short_description_ar: 'جيوب ومقصورات داخلية مبطنة بالمخمل الفاخر مع سحاب ذهبي متين وختم ذهبي باسمك بالخط العربي.',
    description: 'Compact yet spacious travel companion designed to safeguard delicate rings, necklaces, and watches. Monogrammed in Dubai with foil pressure heat.',
    description_ar: 'حقيبة سفر أنيقة وعملية لحفظ الخواتم والأساور والساعات الثمينة أثناء السفر، منقوشة بالختم الحراري الذهبي باسم صاحبتها.',
    stock_status: 'instock',
    stock_quantity: 30,
    rating: 4.8,
    rating_count: 67,
    is_best_seller: false,
    is_new_arrival: true,
    personalization_supported: true,
    personalization_options: {
      max_chars: 18,
      scripts: ['arabic', 'english'],
      metals: METALS,
      fonts: CALLIGRAPHY_FONTS,
      hasGiftBox: true,
      defaultText: 'Maryam',
      defaultArabicText: 'مريم'
    },
    sku: 'EV-JW-108-CSE'
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Products',
    name_ar: 'جميع المنتجات',
    image: HERO_IMAGE,
    count: 8,
    description: 'Explore the complete luxury collection of EVAL UAE bespoke jewelry and accessories.',
    description_ar: 'استكشف التشكيلة الكاملة من مجوهرات وإكسسوارات إيڤال الإمارات الفاخرة.'
  },
  {
    id: 'womens',
    slug: 'womens-accessories',
    name: "Women's Accessories",
    name_ar: 'إكسسوارات نسائية',
    image: CAT_PERSONALIZED_IMAGE,
    count: 4,
    description: 'Delicate 18K gold dipped bar necklaces, calligraphy pendants, and luxury bangles.',
    description_ar: 'قلائد ناعمة مطلية بذهب عيار 18، سلاسل بالاسم، وأساور نسائية راقية.'
  },
  {
    id: 'mens',
    slug: 'mens-accessories',
    name: "Men's Accessories",
    name_ar: 'إكسسوارات رجالية',
    image: CAT_MENS_IMAGE,
    count: 4,
    description: 'Architectural cufflinks, titanium steel bracelets, and monogrammed leather keyrings.',
    description_ar: 'أزرار أكمام هندسية، أساور التيتانيوم الصلبة، وميداليات جلدية منقوشة بالحروف.'
  },
  {
    id: 'car-accessories',
    slug: 'car-accessories',
    name: 'Car Accessories',
    name_ar: 'إكسسوارات السيارات',
    image: CAT_CAR_IMAGE,
    count: 2,
    description: 'Bespoke vehicle medallions and interior visor clips with Arabic calligraphy tassels.',
    description_ar: 'معلقات مرايا السيارات الفاخرة بالاسم ودعاء السفر متوافقة مع أرقى المقصورات.'
  },
  {
    id: 'personalized-gifts',
    slug: 'personalized-gifts',
    name: 'Personalized Gifts',
    name_ar: 'هدايا شخصية',
    image: CAT_PERSONALIZED_IMAGE,
    count: 5,
    description: 'Tailored jewelry and accessories laser-engraved with Arabic and English calligraphy.',
    description_ar: 'مجوهرات وإكسسوارات محفورة بالليزر بالخط العربي والإنجليزية لتخليد أسعد اللحظات.'
  },
  {
    id: 'necklaces',
    slug: 'necklaces',
    name: 'Necklaces & Chains',
    name_ar: 'القلائد والسلاسل',
    image: CAT_PERSONALIZED_IMAGE,
    count: 3,
    description: '18K gold plated name bars, medallions, and timeless Arabic calligraphy pendants.',
    description_ar: 'قلائد الاسم الأيقونية بالذهب عيار 18 وسلاسل الخط العربي المتألقة.'
  },
  {
    id: 'bracelets',
    slug: 'bracelets',
    name: 'Bracelets & Bangles',
    name_ar: 'الأساور',
    image: CAT_MENS_IMAGE,
    count: 2,
    description: 'Titanium steel cuffs and 18K gold bangles engraved with personal coordinates and signatures.',
    description_ar: 'أساور التيتانيوم والذهب عيار 18 المنقوشة بأسماء وتواريخ مميزة.'
  },
  {
    id: 'keychains',
    slug: 'keychains',
    name: 'Luxury Keychains',
    name_ar: 'سلاسل المفاتيح',
    image: CAT_MENS_IMAGE,
    count: 2,
    description: 'Handcrafted Italian Saffiano leather key fobs stamped with gold monograms.',
    description_ar: 'سلاسل وميداليات مفاتيح مصنوعة من جلد السافيانو الإيطالي وحلقات مذهبة.'
  },
  {
    id: 'cufflinks',
    slug: 'cufflinks',
    name: "Men's Cufflinks",
    name_ar: 'أزرار الأكمام',
    image: CAT_MENS_IMAGE,
    count: 3,
    description: 'Quiet luxury cufflinks and accoutrements engineered for the discerning modern gentleman.',
    description_ar: 'أزرار أكمام ملكية فاخرة مصممة خصيصاً للكندورة الإماراتية والبدلات الرسمية.'
  }
];

export const CURRENCY_RATES: Record<string, { rate: number; symbol: string; symbol_ar: string }> = {
  AED: { rate: 1.0, symbol: 'AED', symbol_ar: 'د.إ' },
  SAR: { rate: 1.02, symbol: 'SAR', symbol_ar: 'ر.س' },
  QAR: { rate: 0.99, symbol: 'QAR', symbol_ar: 'ر.ق' },
  KWD: { rate: 0.084, symbol: 'KWD', symbol_ar: 'د.ك' },
  USD: { rate: 0.272, symbol: '$', symbol_ar: '$' },
  EUR: { rate: 0.252, symbol: '€', symbol_ar: '€' },
  GBP: { rate: 0.216, symbol: '£', symbol_ar: '£' }
};

export const UAE_EMIRATES = [
  { id: 'dubai', name: 'Dubai', name_ar: 'دبي', delivery_time: 'Same-Day (Order before 2 PM) / Next-Day', fee: 0 },
  { id: 'abu-dhabi', name: 'Abu Dhabi', name_ar: 'أبوظبي', delivery_time: 'Next-Day Delivery', fee: 0 },
  { id: 'sharjah', name: 'Sharjah', name_ar: 'الشارقة', delivery_time: 'Next-Day Delivery', fee: 0 },
  { id: 'ajman', name: 'Ajman', name_ar: 'عجمان', delivery_time: 'Next-Day Delivery', fee: 0 },
  { id: 'ras-al-khaimah', name: 'Ras Al Khaimah', name_ar: 'رأس الخيمة', delivery_time: '1-2 Business Days', fee: 0 },
  { id: 'fujairah', name: 'Fujairah', name_ar: 'الفجيرة', delivery_time: '1-2 Business Days', fee: 0 },
  { id: 'umm-al-quwain', name: 'Umm Al Quwain', name_ar: 'أم القيوين', delivery_time: '1-2 Business Days', fee: 0 }
];
