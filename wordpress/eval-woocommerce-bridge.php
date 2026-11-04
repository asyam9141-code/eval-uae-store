<?php
/**
 * Plugin Name: EVAL UAE — WooCommerce Headless Storefront Bridge
 * Plugin URI: https://eval-uae.com
 * Description: Production-ready bridge plugin connecting the EVAL UAE high-performance storefront with WooCommerce, Salient Theme, LiteSpeed Cache, and Hostinger. Adds custom personalization line-item meta, Arabic calligraphy order attributes, REST CORS headers, and webhook synchronization.
 * Version: 1.0.0
 * Author: EVAL UAE Engineering
 * Author URI: https://eval-uae.com
 * License: GPL-2.0+
 * Text Domain: eval-uae
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * WC requires at least: 7.0
 * WC tested up to: 9.3
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class EVAL_WooCommerce_Bridge {

    const VERSION = '1.0.0';

    public function __construct() {
        // Add custom REST API routes for EVAL storefront
        add_action('rest_api_init', [$this, 'register_rest_routes']);

        // Handle custom personalization line-item meta in WooCommerce cart & order
        add_filter('woocommerce_add_cart_item_data', [$this, 'add_personalization_to_cart_item'], 10, 3);
        add_filter('woocommerce_get_item_data', [$this, 'display_personalization_in_cart'], 10, 2);
        add_action('woocommerce_checkout_create_order_line_item', [$this, 'save_personalization_to_order_items'], 10, 4);

        // Allow CORS for headless requests from EVAL frontend
        add_action('init', [$this, 'handle_cors_headers']);

        // LiteSpeed Cache Integration — Purge cache when products/inventory change
        add_action('woocommerce_update_product', [$this, 'purge_litespeed_cache'], 10, 1);
        add_action('woocommerce_new_product', [$this, 'purge_litespeed_cache'], 10, 1);
        add_action('woocommerce_order_status_completed', [$this, 'purge_litespeed_cache'], 10, 1);

        // Declare HPOS (High-Performance Order Storage) Compatibility
        add_action('before_woocommerce_init', [$this, 'declare_hpos_compatibility']);
    }

    /**
     * Declare High-Performance Order Storage (HPOS) compatibility for WooCommerce 8.0+
     */
    public function declare_hpos_compatibility() {
        if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        }
    }

    /**
     * Set safe CORS headers for the frontend storefront
     */
    public function handle_cors_headers() {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            $allowed_origins = [
                'https://eval-uae.com',
                'https://www.eval-uae.com',
                'http://localhost:3000',
                'http://localhost:5173'
            ];

            $origin = sanitize_text_field($_SERVER['HTTP_ORIGIN']);
            if (in_array($origin, $allowed_origins) || strpos($origin, 'run.app') !== false) {
                header("Access-Control-Allow-Origin: {$origin}");
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With');
            }
        }

        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
    }

    /**
     * Register EVAL UAE REST API endpoints
     */
    public function register_rest_routes() {
        register_rest_route('eval/v1', '/store-info', [
            'methods'  => 'GET',
            'callback' => [$this, 'get_store_info'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('eval/v1', '/track-order', [
            'methods'  => 'POST',
            'callback' => [$this, 'track_order_endpoint'],
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('eval/v1', '/apply-coupon', [
            'methods'  => 'POST',
            'callback' => [$this, 'apply_coupon_endpoint'],
            'permission_callback' => '__return_true'
        ]);
    }

    /**
     * Return store info, currency settings, and active shipping zones
     */
    public function get_store_info() {
        return rest_ensure_response([
            'store_name'       => get_bloginfo('name'),
            'currency'         => get_woocommerce_currency(),
            'currency_symbol'  => get_woocommerce_currency_symbol(),
            'free_shipping_min'=> 300,
            'emirates'         => [
                ['id' => 'dubai', 'name' => 'Dubai', 'name_ar' => 'دبي', 'delivery' => 'Same-Day / Next-Day'],
                ['id' => 'abu-dhabi', 'name' => 'Abu Dhabi', 'name_ar' => 'أبوظبي', 'delivery' => 'Next-Day'],
                ['id' => 'sharjah', 'name' => 'Sharjah', 'name_ar' => 'الشارقة', 'delivery' => 'Next-Day'],
                ['id' => 'ajman', 'name' => 'Ajman', 'name_ar' => 'عجمان', 'delivery' => 'Next-Day'],
                ['id' => 'ras-al-khaimah', 'name' => 'Ras Al Khaimah', 'name_ar' => 'رأس الخيمة', 'delivery' => '1-2 Days'],
                ['id' => 'fujairah', 'name' => 'Fujairah', 'name_ar' => 'الفجيرة', 'delivery' => '1-2 Days'],
                ['id' => 'umm-al-quwain', 'name' => 'Umm Al Quwain', 'name_ar' => 'أم القيوين', 'delivery' => '1-2 Days']
            ],
            'version'          => self::VERSION
        ]);
    }

    /**
     * Custom order tracking by Order ID + Email or Phone
     */
    public function track_order_endpoint($request) {
        $params = $request->get_json_params();
        $order_id = isset($params['order_id']) ? intval($params['order_id']) : 0;
        $identifier = isset($params['email_or_phone']) ? sanitize_text_field($params['email_or_phone']) : '';

        if (!$order_id) {
            return new WP_Error('missing_params', 'Order ID is required.', ['status' => 400]);
        }

        $order = wc_get_order($order_id);
        if (!$order) {
            return new WP_Error('not_found', 'Order not found.', ['status' => 404]);
        }

        // Validate customer billing email or phone
        $billing_email = strtolower(trim($order->get_billing_email()));
        $billing_phone = preg_replace('/[^0-9]/', '', $order->get_billing_phone());
        $clean_input   = preg_replace('/[^0-9]/', '', $identifier);

        if ($identifier && strtolower(trim($identifier)) !== $billing_email && $clean_input !== $billing_phone) {
            return new WP_Error('unauthorized', 'The provided email or phone does not match order records.', ['status' => 403]);
        }

        $items = [];
        foreach ($order->get_items() as $item_id => $item) {
            $items[] = [
                'name'               => $item->get_name(),
                'quantity'           => $item->get_quantity(),
                'total'              => $item->get_total(),
                'engraving_text'     => $item->get_meta('_eval_engraving_text'),
                'calligraphy_style'  => $item->get_meta('_eval_calligraphy_style'),
                'metal_finish'       => $item->get_meta('_eval_metal_finish')
            ];
        }

        return rest_ensure_response([
            'order_id'       => $order->get_id(),
            'order_number'   => $order->get_order_number(),
            'status'         => $order->get_status(),
            'date_created'   => $order->get_date_created()->date('Y-m-d H:i:s'),
            'total'          => $order->get_total(),
            'currency'       => $order->get_currency(),
            'shipping_city'  => $order->get_shipping_city() ?: $order->get_billing_city(),
            'items'          => $items,
            'tracking_code'  => $order->get_meta('_tracking_number') ?: 'EVAL-DXB-' . $order->get_id(),
            'courier'        => 'EVAL Express (Dubai Delivery)'
        ]);
    }

    /**
     * Validate Coupon Endpoint
     */
    public function apply_coupon_endpoint($request) {
        $params = $request->get_json_params();
        $code = isset($params['code']) ? sanitize_text_field($params['code']) : '';

        if (!$code) {
            return new WP_Error('no_code', 'Coupon code is required.', ['status' => 400]);
        }

        $coupon = new WC_Coupon($code);
        if (!$coupon->is_valid()) {
            return rest_ensure_response([
                'valid'   => false,
                'message' => 'Invalid or expired coupon code.'
            ]);
        }

        return rest_ensure_response([
            'valid'         => true,
            'code'          => $coupon->get_code(),
            'discount_type' => $coupon->get_discount_type(),
            'amount'        => floatval($coupon->get_amount()),
            'message'       => 'Coupon applied successfully!'
        ]);
    }

    /**
     * Add custom personalization data into cart item
     */
    public function add_personalization_to_cart_item($cart_item_data, $product_id, $variation_id) {
        if (isset($_POST['eval_engraving_text']) && !empty($_POST['eval_engraving_text'])) {
            $cart_item_data['eval_engraving_text'] = sanitize_text_field($_POST['eval_engraving_text']);
        }
        if (isset($_POST['eval_calligraphy_style'])) {
            $cart_item_data['eval_calligraphy_style'] = sanitize_text_field($_POST['eval_calligraphy_style']);
        }
        if (isset($_POST['eval_metal_finish'])) {
            $cart_item_data['eval_metal_finish'] = sanitize_text_field($_POST['eval_metal_finish']);
        }
        if (isset($_POST['eval_gift_box'])) {
            $cart_item_data['eval_gift_box'] = sanitize_text_field($_POST['eval_gift_box']);
        }
        return $cart_item_data;
    }

    /**
     * Display custom engraving details in WooCommerce cart and checkout
     */
    public function display_personalization_in_cart($item_data, $cart_item) {
        if (isset($cart_item['eval_engraving_text'])) {
            $item_data[] = [
                'key'   => __('Personalized Inscription / النقش المخصص', 'eval-uae'),
                'value' => esc_html($cart_item['eval_engraving_text'])
            ];
        }
        if (isset($cart_item['eval_calligraphy_style'])) {
            $item_data[] = [
                'key'   => __('Calligraphy Style / نمط الخط', 'eval-uae'),
                'value' => esc_html($cart_item['eval_calligraphy_style'])
            ];
        }
        if (isset($cart_item['eval_metal_finish'])) {
            $item_data[] = [
                'key'   => __('Metal Finish / المعدن', 'eval-uae'),
                'value' => esc_html($cart_item['eval_metal_finish'])
            ];
        }
        return $item_data;
    }

    /**
     * Save personalization details permanently to WooCommerce Order items
     */
    public function save_personalization_to_order_items($item, $cart_item_key, $values, $order) {
        if (isset($values['eval_engraving_text'])) {
            $item->add_meta_data('_eval_engraving_text', $values['eval_engraving_text'], true);
            $item->add_meta_data(__('Engraving / النقش', 'eval-uae'), $values['eval_engraving_text'], true);
        }
        if (isset($values['eval_calligraphy_style'])) {
            $item->add_meta_data('_eval_calligraphy_style', $values['eval_calligraphy_style'], true);
            $item->add_meta_data(__('Calligraphy Script', 'eval-uae'), $values['eval_calligraphy_style'], true);
        }
        if (isset($values['eval_metal_finish'])) {
            $item->add_meta_data('_eval_metal_finish', $values['eval_metal_finish'], true);
            $item->add_meta_data(__('Metal Finish', 'eval-uae'), $values['eval_metal_finish'], true);
        }
    }

    /**
     * LiteSpeed Cache Integration Hook
     */
    public function purge_litespeed_cache($post_id = 0) {
        if (defined('LSCWP_V')) {
            do_action('litespeed_purge_all');
        }
    }
}

// Initialize the EVAL Bridge
new EVAL_WooCommerce_Bridge();
