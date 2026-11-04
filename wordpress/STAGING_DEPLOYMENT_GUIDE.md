# EVAL UAE — Staging Validation & Deployment Guide

## 1. Safety & Production Guarantee
- **Zero Modification of Live Data**: This staging package does **NOT** modify or overwrite the existing production WooCommerce database, live products, existing customer accounts, order records, or active payment gateway credentials.
- **Salient Parent Theme Preservation**: The custom Salient Child Theme inherits from `Template: salient` and does not overwrite any template or WPBakery component.
- **Credential Protection**: No consumer keys or secrets are stored in client-side bundles. All live requests are proxied via server-side environment variables (`WC_STORE_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`).

---

## 2. Feature Classification: Real vs. Simulated / Local Mirror

| Feature / Component | Status | Classification & Mechanism |
|---|---|---|
| **Arabic-First & RTL Architecture** | **REAL** | Native `dir="rtl"`, `lang="ar"`, and Alexandria typography across all 20 views. |
| **Bilingual Switcher (Arabic/English)** | **REAL** | Real-time state flip in `StoreContext`, switching layouts and translation dictionary. |
| **Currency Switching (AED, SAR, QAR, KWD, USD, EUR, GBP)** | **REAL** | Live mathematical conversion based on GCC currency exchange rates; AED is default. |
| **Live Inscription Visualizer** | **REAL** | Real-time canvas rendering with metallic gradients (18K Gold, Rose Gold, Platinum, Obsidian) and Arabic typography scripts. |
| **Shopping Cart Mechanics** | **REAL** | Line-item calculation, Free UAE shipping meter (300 AED threshold), quantity steppers, and client state persistence. |
| **Meta Pixel & Google Analytics** | **REAL** | Live event dispatch (`trackStoreEvent`) triggering `AddToCart`, `InitiateCheckout`, and `Purchase` events. |
| **WooCommerce REST Authentication** | **REAL / PROXIED** | Server-side Basic Auth header generation through `/api/woocommerce/*` proxy. |
| **WooCommerce Product Retrieval** | **HYBRID** | Queries live WooCommerce REST API when credentials are provided in `.env`. Seamlessly serves the authentic local replica catalog if credentials are blank. |
| **WooCommerce Category Retrieval** | **HYBRID** | Proxies to `/wp-json/wc/v3/products/categories` with authentic fallback taxonomy. |
| **Coupon Code Verification** | **REAL / HYBRID** | Verifies against WooCommerce API `/wp-json/wc/v3/coupons` with instant fallback for `EVAL10` (10% off) and `RAMADAN` (15% off). |
| **Order Creation & Idempotency** | **SAFE STAGING** | Generates authentic EVAL UAE order structure (`EV-XXXXX`) and validates customer fields. Dispatches to WooCommerce API if configured, with `X-Idempotency-Key` to strictly prevent duplicate orders. **Does NOT charge real credit cards or create phantom production debits.** |
| **Order Tracking** | **REAL / INTERACTIVE** | Tracks by Order # (`EV-10482`) and contact info, displaying visual progress through Dubai atelier engraving, optical inspection, and UAE express dispatch. |
| **Payment Methods (Apple Pay, Card, Tabby, COD)** | **STAGING VALIDATION** | Validates user selection, Emirate delivery details, and calculates totals without real billing charges. |

---

## 3. Staging Installation Steps (Hostinger / Staging Environment)

### Step 1: Upload Bridge Plugin
1. Upload `/wordpress/eval-woocommerce-bridge.php` to your staging server at:
   `wp-content/plugins/eval-woocommerce-bridge/eval-woocommerce-bridge.php`
2. In WordPress Admin, navigate to **Plugins** → **Installed Plugins**.
3. Click **Activate** on **EVAL UAE — WooCommerce Headless Storefront Bridge**.

### Step 2: Test on Staging / Child Theme
1. Upload `/wordpress/eval-salient-child` to `wp-content/themes/eval-salient-child`.
2. Do **NOT** activate on your live production site until approved. On your staging environment, go to **Appearance** → **Themes** and click **Live Preview** or **Activate** on **Salient Child — EVAL UAE Luxury Storefront**.
3. Verify that your existing WPBakery pages and Salient Theme settings remain 100% functional.

### Step 3: LiteSpeed Cache Verification (Hostinger)
1. In WordPress Admin, navigate to **LiteSpeed Cache** → **Cache**.
2. Verify that REST API caching is bypassed for `/wp-json/wc/` and `/wp-json/eval/v1/`.
3. The bridge plugin automatically triggers `litespeed_purge_all` whenever products are updated.

---

## 4. Rollback Procedure
If you need to instantly revert any changes on your staging environment:
1. **Theme Revert**: Go to **Appearance** → **Themes** and re-activate the parent **Salient** theme.
2. **Plugin Deactivation**: Go to **Plugins** and deactivate **EVAL UAE — WooCommerce Headless Storefront Bridge**.
3. **Database Integrity**: Because our bridge stores custom metadata in standard WooCommerce itemmeta tables (`_eval_engraving_text`, `_eval_calligraphy_style`), no core database tables are modified. Historical orders remain intact.
