<?php
/**
 * Plugin Name: CoCart - Cart Callback Example
 * Plugin URI:  https://cocartapi.com
 * Description: An example of registering a callback that can be triggered when updating the cart with CoCart.
 * Author:      CoCart Headless, LLC
 * Author URI:  https://cocartapi.com
 * Version:     1.0.0
 * Text Domain: cocart-cart-callback-example
 * Domain Path: /languages/
 * Requires at least: 5.6
 * Requires PHP: 7.4
 * CoCart requires at least: 4.0
 * CoCart tested up to: 4.3
 *
 * Copyright:   CoCart Headless, LLC
 * License:     GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package CoCart - Cart Callback Example
 */

if ( ! defined( 'COCART_CART_CALLBACK_EXAMPLE_FILE' ) ) {
	define( 'COCART_CART_CALLBACK_EXAMPLE_FILE', __FILE__ );
}

// Include the main CoCart - Cart Callback Example class.
if ( ! class_exists( 'CoCart_Cart_Callback_Example', false ) ) {
	include_once untrailingslashit( plugin_dir_path( COCART_CART_CALLBACK_EXAMPLE_FILE ) ) . '/includes/class-cocart-cart-callback-example.php';
}

/**
 * Returns the main instance of CoCart_Cart_Callback_Example and only runs if it does not already exists.
 *
 * @return CoCart_Cart_Callback_Example
 */
if ( ! function_exists( 'CoCart_Cart_Callback_Example' ) ) {
	function CoCart_Cart_Callback_Example() {
		return CoCart_Cart_Callback_Example::init();
	}

	CoCart_Cart_Callback_Example();
}
