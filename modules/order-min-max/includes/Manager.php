<?php

namespace WeDevs\DokanPro\Modules\OrderMinMax;

defined( 'ABSPATH' ) || exit;

/**
 * OrderMinMax Class.
 *
 * @since 3.5.0
 */
class Manager {
	/**
	 * Min max meta save.
	 *
	 * @since 3.5.0
	 *
	 * @param int $product_id Product ID
	 *
	 * @return void
	 */
	public static function save_min_max_meta( int $product_id ): void {
		if ( ! isset( $_POST['min_max_product_wise_activation_field'] ) || ! wp_verify_nonce( sanitize_key( $_POST['min_max_product_wise_activation_field'] ), 'min_max_product_wise_activation_action' ) ) {
			return;
		}

		$product = wc_get_product( $product_id );
		if ( ! $product instanceof \WC_Product ) {
			return;
		}

		$min_max_meta = array();
		if ( ! empty( $_POST['product_wise_activation'] ) && 'yes' === $_POST['product_wise_activation'] ) {
			$min_max_meta = self::get_meta_from_post( $_POST );
		}

		if ( ! self::save_meta_validation( $product_id ) ) {
			$min_max_meta = array();
		}

		$product->update_meta_data( '_dokan_min_max_meta', $min_max_meta );
		$product->save();
	}

	/**
	 * Save meta validation.
	 *
	 * @since 3.5.0
	 *
	 * @param int $product_id Product ID
	 *
	 * @return bool
	 */
	public static function save_meta_validation( int $product_id ): bool {
		$supported_product_types = array( 'simple', 'variable' );
		$terms                   = wp_get_object_terms( $product_id, 'product_type' );

		if ( $terms ) {
			$product_type = sanitize_title( current( $terms )->name );
		} else {
			$product_type = 'simple';
		}

		if ( in_array( $product_type, $supported_product_types, true ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Min max meta save.
	 *
	 * @since 3.5.0
	 *
	 * @param int $product_id Product ID
	 * @param int $loop Loop index
	 *
	 * @return void
	 */
	public static function save_min_max_variation_meta( int $product_id, int $loop ): void {
		if ( ! isset( $_POST['min_max_product_variation_wise_activation_field'] ) || ! wp_verify_nonce( sanitize_key( $_POST['min_max_product_variation_wise_activation_field'] ), 'min_max_product_variation_wise_activation_action' ) ) {
			return;
		}

		$product = wc_get_product( $product_id );
		if ( ! $product instanceof \WC_Product ) {
			return;
		}

		// If it's a parent product then, return.
		if ( ! empty( $product->get_children() ) ) {
			return;
		}

		$min_max_meta = array();
		// If variation itself has no product level data, then make it product wise global.
		if ( ! empty( $_POST['product_wise_activation'] ) && 'yes' === $_POST['product_wise_activation'] ) {
			$min_max_meta = self::get_meta_from_post( $_POST );
		}

		if ( ! empty( $_POST['variable_product_wise_activation'][ $loop ] ) && 'yes' === $_POST['variable_product_wise_activation'][ $loop ] ) {
			$min_max_meta['product_wise_activation'] = wc_clean( wp_unslash( $_POST['variable_product_wise_activation'][ $loop ] ) );
			$min_max_meta['min_quantity']            = isset( $_POST['variable_min_quantity'][ $loop ] ) && $_POST['variable_min_quantity'][ $loop ] > 0 ? absint( wp_unslash( $_POST['variable_min_quantity'][ $loop ] ) ) : 0;
			$min_max_meta['max_quantity']            = isset( $_POST['variable_max_quantity'][ $loop ] ) && $_POST['variable_max_quantity'][ $loop ] > 0 ? absint( wp_unslash( $_POST['variable_max_quantity'][ $loop ] ) ) : 0;
		}

		if ( ! self::save_meta_validation( $product_id ) ) {
			$min_max_meta = array();
		}

		$product->update_meta_data( '_dokan_min_max_meta', $min_max_meta );
		$product->save();
	}

	/**
	 * Get meta from post.
	 *
	 * @since 3.5.0
	 *
	 * @param array $post Post data from $_POST
	 *
	 * @return array
	 */
	public static function get_meta_from_post( array $post ): array {
		$min_max_meta['product_wise_activation'] = wc_clean( wp_unslash( $post['product_wise_activation'] ) );
		$min_max_meta['min_quantity']            = isset( $post['min_quantity'] ) && $post['min_quantity'] > 0 ? absint( wp_unslash( $post['min_quantity'] ) ) : 0;
		$min_max_meta['max_quantity']            = isset( $post['max_quantity'] ) && $post['max_quantity'] > 0 ? absint( wp_unslash( $post['max_quantity'] ) ) : 0;

		return $min_max_meta;
	}
}
