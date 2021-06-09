<?php
/**
 * CoCart - A custom callback triggered when updating the cart.
 *
 * @author   Sébastien Dumont
 * @category Callbacks
 * @package  CoCart\Callback
 * @license  GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Callback test class.
 */
class CoCart_Callback_Test extends CoCart_Cart_Extension_Callback {

	/**
	 * Callback name.
	 *
	 * @access protected
	 * @var    string
	 */
	protected $name = 'test';

	/**
	 * Callback to update the cart.
	 *
	 * @access public
	 * @param  WP_REST_Request $request Full details about the request.
	 */
	public function callback( $request ) {
		$data = $request['data']; // Use this to access additional passed data if any.

		// Place your callback here.

		return true;
	}

} // END class

return new CoCart_Callback_Test();