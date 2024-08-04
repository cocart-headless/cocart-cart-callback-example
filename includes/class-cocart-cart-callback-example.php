<?php
/**
 * CoCart - Cart Callback Example core setup.
 *
 * @author  Sébastien Dumont
 * @license GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main CoCart - Cart Callback Example class.
 *
 * @class CoCart_Cart_Callback_Example
 */
final class CoCart_Cart_Callback_Example {

	/**
	 * Plugin Version
	 *
	 * @access public
	 *
	 * @static
	 */
	public static $version = '1.0.0';

	/**
	 * Initiate CoCart - Cart Callback Example.
	 *
	 * @access public
	 *
	 * @static
	 */
	public static function init() {
		// Load translation files.
		add_action( 'init', array( __CLASS__, 'load_plugin_textdomain' ), 0 );

		// Register custom callback.
		add_action( 'cocart_register_extension_callback', array( __CLASS__, 'register_extension_callback_test' ) );
	} // END init()

	/**
	 * Return the name of the package.
	 *
	 * @access public
	 *
	 * @static
	 *
	 * @return string
	 */
	public static function get_name() {
		return 'CoCart - Cart Callback Example';
	}

	/**
	 * Return the version of the package.
	 *
	 * @access public
	 *
	 * @static
	 *
	 * @return string
	 */
	public static function get_version() {
		return self::$version;
	}

	/**
	 * Return the path to the package.
	 *
	 * @access public
	 *
	 * @static
	 *
	 * @return string
	 */
	public static function get_path() {
		return dirname( __DIR__ );
	}

	/**
	 * Registers custom callback for CoCart.
	 *
	 * @access public
	 *
	 * @static
	 */
	public static function register_extension_callback_test( $callback ) {
		include_once __DIR__ . '/callback/test.php';

		$callback->register( new CoCart_Callback_Test() );
	} // END register_extension_callback_test()

	/**
	 * Load the plugin translations if any ready.
	 *
	 * Note: the first-loaded translation file overrides any following ones if the same translation is present.
	 *
	 * Locales found in:
	 *      - WP_LANG_DIR/cocart-cart-callback-example/cocart-cart-callback-example-LOCALE.mo
	 *      - WP_LANG_DIR/plugins/cocart-cart-callback-example-LOCALE.mo
	 *
	 * @access public
	 *
	 * @static
	 */
	public static function load_plugin_textdomain() {
		if ( function_exists( 'determine_locale' ) ) {
			$locale = determine_locale();
		} else {
			$locale = is_admin() ? get_user_locale() : get_locale();
		}

		$locale = apply_filters( 'plugin_locale', $locale, 'cocart-cart-callback-example' );

		unload_textdomain( 'cocart-cart-callback-example' );
		load_textdomain( 'cocart-cart-callback-example', WP_LANG_DIR . '/cocart-cart-callback-example/cocart-cart-callback-example-' . $locale . '.mo' );
		load_plugin_textdomain( 'cocart-cart-callback-example', false, plugin_basename( dirname( COCART_CART_CALLBACK_EXAMPLE_FILE ) ) . '/languages' );
	} // END load_plugin_textdomain()
} // END class
