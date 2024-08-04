<?php
/**
 * CoCart - A custom callback triggered when updating the cart.
 *
 * @author  Sébastien Dumont
 * @package CoCart\Callback
 * @license GPL-2.0+
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
	 *
	 * @var string
	 */
	protected $name = 'test';

	/**
	 * Callback to update the cart.
	 *
	 * @throws CoCart_Data_Exception Exception if invalid data is detected.
	 *
	 * @access public
	 *
	 * @param WP_REST_Request $request    The request object.
	 * @param object          $controller The cart controller.
	 *
	 * @return bool Returns true.
	 */
	public function callback( $request, $controller ) {
		try {
			if ( $controller->is_completely_empty() ) {
				throw new CoCart_Data_Exception( 'cocart_cart_empty', __( 'Cart is empty. Please add items to cart first.', 'cart-rest-api-for-woocommerce' ), 404 );
			}

			$data = isset( $request['data'] ) ? $request['data'] : array(); // Custom parameter.

			$cart_updated = false;

			if ( ! empty( $data ) ) {
				// Place your callback here.

				$cart_updated = true;
			}

			if ( $cart_updated ) {
				// $this->recalculate_totals( $request, $controller ); // Uncomment if you need to recalculate the cart totals.

				// Only returns success notice if there are no error notices. - Feel free to change the message response.
				if ( 0 === wc_notice_count( 'error' ) ) {
					wc_add_notice( __( 'Cart updated.', 'cart-rest-api-for-woocommerce' ), 'success' );
				}
			}

			return true;
		} catch ( CoCart_Data_Exception $e ) {
			return CoCart_Response::get_error_response( $e->getErrorCode(), $e->getMessage(), $e->getCode(), $e->getAdditionalData() );
		}
	}
} // END class

return new CoCart_Callback_Test();
