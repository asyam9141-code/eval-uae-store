<?php
/**
 * Salient Child Theme Functions for EVAL UAE
 *
 * Keeps Salient theme completely safe, preserves WPBakery content,
 * and seamlessly loads EVAL UAE fonts, styling, and WooCommerce enhancements.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', 'eval_salient_enqueue_styles', 20);
function eval_salient_enqueue_styles() {
    // Enqueue Parent Salient stylesheet
    wp_enqueue_style('salient-parent-style', get_template_directory_uri() . '/style.css');

    // Enqueue Child Theme stylesheet
    wp_enqueue_style('eval-child-style', get_stylesheet_directory_uri() . '/style.css', ['salient-parent-style'], '1.0.0');

    // Enqueue Google Fonts: Cormorant Garamond, Inter, Alexandria
    wp_enqueue_style('eval-google-fonts', 'https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap', [], null);
}

// Ensure WooCommerce HPOS compatibility in child theme
add_action('before_woocommerce_init', function() {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
});

// Auto-include the EVAL WooCommerce Bridge plugin file if not active as a standalone plugin
if (!class_exists('EVAL_WooCommerce_Bridge') && file_exists(dirname(__DIR__) . '/eval-woocommerce-bridge.php')) {
    require_once dirname(__DIR__) . '/eval-woocommerce-bridge.php';
}
