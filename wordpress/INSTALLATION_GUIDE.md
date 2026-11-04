# EVAL UAE — WordPress & WooCommerce Integration Guide

This guide provides step-by-step instructions for connecting the high-performance EVAL UAE storefront with your existing WordPress + WooCommerce + Salient Theme environment on Hostinger with LiteSpeed Cache.

---

## 1. Architecture Overview

- **Frontend Application**: Modern React + TypeScript + Tailwind CSS storefront optimized for mobile-first luxury shopping, Core Web Vitals (LCP < 2.5s, CLS < 0.1), bilingual English/Arabic (Alexandria & Cormorant Garamond), and real-time live engraving previews.
- **Backend Bridge**: `eval-woocommerce-bridge.php` plugin running inside your WordPress installation at `https://eval-uae.com`.
- **Theme Safety**: You **do not** need to overwrite Salient or install Astra. Your existing WPBakery layouts, blog posts, and media library remain 100% untouched.

---

## 2. Installation Options

### Option A: Headless Frontend with Bridge Plugin (Recommended)
1. Upload `/wordpress/eval-woocommerce-bridge.php` to your WordPress server at `wp-content/plugins/eval-woocommerce-bridge/eval-woocommerce-bridge.php` (or `wp-content/mu-plugins/`).
2. In the WordPress Admin, go to **Plugins** → **Installed Plugins** and click **Activate** on **EVAL UAE — WooCommerce Headless Storefront Bridge**.
3. Go to **WooCommerce** → **Settings** → **Advanced** → **REST API**.
4. Click **Add Key**:
   - Description: `EVAL UAE Storefront`
   - User: Select your Admin user
   - Permissions: `Read/Write`
5. Copy the generated **Consumer Key** and **Consumer Secret**.
6. In your storefront `.env` or in the in-app **WooCommerce Connection Manager**, enter:
   ```env
   WC_STORE_URL="https://eval-uae.com"
   WC_CONSUMER_KEY="ck_xxxxxxxxxxxxxxxxxxxxxxxx"
   WC_CONSUMER_SECRET="cs_xxxxxxxxxxxxxxxxxxxxxxxx"
   ```

### Option B: Salient Child Theme Integration
If you wish to apply EVAL's luxury styles directly within your WordPress theme:
1. Copy `/wordpress/eval-salient-child` into `/wp-content/themes/eval-salient-child`.
2. Go to **Appearance** → **Themes** and activate **Salient Child — EVAL UAE Luxury Storefront**.
3. All existing Salient theme options are preserved automatically.

---

## 3. LiteSpeed Cache Configuration on Hostinger

To ensure instant product stock and price synchronization:
1. In WordPress Admin, navigate to **LiteSpeed Cache** → **Cache**.
2. Ensure **Cache REST API** is set to **OFF** for `/wp-json/wc/` and `/wp-json/eval/v1/` routes.
3. Under **Purge**, verify that **Purge All on Product Update** is enabled (handled automatically by our bridge hook `purge_litespeed_cache()`).

---

## 4. Testing & Verification Checklist

- [ ] **REST API Accessibility**: Test GET `https://eval-uae.com/wp-json/wc/v3/products` returns 200 with basic auth.
- [ ] **Bridge Route**: Test GET `https://eval-uae.com/wp-json/eval/v1/store-info`.
- [ ] **Add to Cart with Engraving**: Add a personalized necklace to cart with Arabic text; verify the engraving note appears in line items.
- [ ] **Free Delivery Calculation**: Add items >= 300 AED to verify free delivery in Dubai and the UAE.
- [ ] **Coupon Verification**: Apply code `EVAL10` at checkout.
- [ ] **Order Creation**: Complete a test order; confirm order record in WooCommerce Admin with customer details and engraving metadata.
- [ ] **Mobile Responsiveness**: Verify touch targets and layout on iPhone (390px) and Samsung Galaxy (360px).
- [ ] **RTL / Arabic Mode**: Toggle language to Arabic and check alignment, typography (Alexandria), and right-to-left layout.

---

## 5. Rollback Instructions

If you ever need to revert:
1. **Deactivate Bridge Plugin**: Go to **Plugins** → Deactivate `EVAL UAE — WooCommerce Headless Storefront Bridge`.
2. **Revert Theme**: Go to **Appearance** → **Themes** → Reactivate parent `Salient` theme.
3. **Database Integrity**: Because our bridge uses standard WooCommerce meta tables (`woocommerce_order_itemmeta`), no database tables or records are modified or destroyed. All historical orders remain intact.
