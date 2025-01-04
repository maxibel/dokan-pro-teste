<?php
/**
 * New Product Email ( plain text )
 *
 * An email sent to the admin when a new Product is created by vendor.
 *
 * @class       Dokan_Email_New_Product
 * @since       3.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WeDevs\DokanPro\Modules\RequestForQuotation\Model\Quote;

echo '= ' . esc_attr( $email_heading ) . " =\n\n";
?>

<?php esc_attr_e( 'Summary of the Quote:', 'dokan' ); ?>
<?php echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n"; ?>

<?php esc_html_e( 'Quote #: ', 'dokan' ); ?><?php echo esc_html( $quote_id ); ?>
<?php esc_html_e( 'Quote Date: ', 'dokan' ); ?><?php echo esc_attr( dokan_format_datetime() ); ?>
<?php esc_html_e( 'Quote Status: ', 'dokan' ); ?><?php echo esc_html( Quote::get_status_label( 'pending' ) ); ?>
<?php if ( 'customer' === $sending_to ) : ?>
    <?php if ( ! empty( $store_info['store_name'] ) ) : ?>
        <?php esc_html_e( 'Store: ', 'dokan' ); ?><?php echo esc_html( $store_info['store_name'] ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $store_info['store_email'] ) ) : ?>
        <?php esc_html_e( 'Store Email: ', 'dokan' ); ?><?php echo esc_html( $store_info['store_email'] ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $store_info['store_phone'] ) ) : ?>
        <?php esc_html_e( 'Store Phone: ', 'dokan' ); ?><?php echo esc_html( $store_info['store_phone'] ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $customer_info['customer_additional_msg'] ) ) : ?>
        <?php esc_html_e( 'Additional Message: ', 'dokan' ); ?><?php echo esc_html( $customer_info['customer_additional_msg'] ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $expected_date ) ) : ?>
        <?php esc_html_e( 'Expected Delivery Date: ', 'dokan' ); ?><?php echo esc_html( $expected_date ); ?>
    <?php endif; ?>
<?php else : ?>
    <?php if ( ! empty( $customer_info['name_field'] ) ) : ?>
        <?php esc_html_e( 'Customer Name: ', 'dokan' ); ?><?php echo esc_html( $customer_info['name_field'] ?? '' ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $customer_info['email_field'] ) ) : ?>
        <?php esc_html_e( 'Customer Email: ', 'dokan' ); ?><?php echo esc_html( $customer_info['email_field'] ?? '' ); ?>
    <?php endif; ?>
    <?php if ( ! empty( $customer_info['phone_field'] ) ) : ?>
        <?php esc_html_e( 'Customer Phone: ', 'dokan' ); ?><?php echo esc_html( $customer_info['phone_field'] ?? '' ); ?>
    <?php endif; ?>
<?php endif; ?>
<?php if ( ! empty( $expected_date ) ) : ?>
    <?php esc_html_e( 'Expected Delivery Date: ', 'dokan' ); ?><?php echo esc_html( $expected_date ); ?>
<?php endif; ?>
<?php if ( ! empty( $customer_info['customer_additional_msg'] ) ) : ?>
    <?php esc_html_e( 'Additional Message: ', 'dokan' ); ?><?php echo esc_html( $customer_info['customer_additional_msg'] ); ?>
<?php endif; ?>
<?php echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n"; ?>
<?php
$offered_total = 0;
foreach ( $quote_details as $quote_item ) {
    $_product    = wc_get_product( $quote_item->product_id );
    $price       = $_product->get_price();
    $offer_price = isset( $quote_item->offer_price ) ? floatval( $quote_item->offer_price ) : $price;
    $qty_display = $quote_item->quantity;
    ?>
    <?php
    // translators: %s is product name.
    echo "\n" . sprintf( esc_html__( 'Product: %s', 'dokan' ), $_product->get_name() );
    echo "\n" . esc_html__( 'SKU:', 'dokan' ) . '</strong> ' . esc_html( $_product->get_sku() );

    // translators: %s is offer price.
    echo "\n" . sprintf( esc_html__( 'Offered Price: %s', 'dokan' ), wc_price( $offer_price ) );
    ?>
    <?php
    // translators: %s is quantity.
    echo "\n" . sprintf( esc_html__( 'Quantity: %s', 'dokan' ), $qty_display );
    echo "\n";
    ?>
    <?php
    // translators: %s is price.
    echo "\n" . sprintf( esc_html__( 'Offered Subtotal: %s', 'dokan' ), wc_price( $offer_price * $qty_display ) );
    $offered_total += ( $offer_price * $qty_display );
    ?>

    <?php
    echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";
}
// translators: %s is offer price.
printf( esc_attr__( 'Total Offered Price: %s', 'dokan' ), wc_price( $offered_total ) );
echo "\n\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

esc_attr_e( 'Shipping address:', 'dokan' );
echo "\n\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n";

// translators: %s is shipment name.
echo "\n" . sprintf( esc_html__( 'Name: %s', 'dokan' ), $customer_info['name_field'] ?? '' );
// translators: %s is shipment phone.
echo "\n" . sprintf( esc_html__( 'Phone: %s', 'dokan' ), $customer_info['phone_field'] ?? '' );
// translators: %s is shipment address line 1.
echo "\n" . sprintf( esc_html__( 'Address Line 1: %s', 'dokan' ), $customer_info['addr_line_1'] ?? '' );
// translators: %s is shipment address line 2.
echo "\n" . sprintf( esc_html__( 'Address Line 2: %s', 'dokan' ), $customer_info['addr_line_2'] ?? '' );
// translators: %s is shipment city.
echo "\n" . sprintf( esc_html__( 'City: %s', 'dokan' ), $customer_info['city'] ?? '' );
// translators: %s is shipment post code.
echo "\n" . sprintf( esc_html__( 'Post Code: %s', 'dokan' ), $customer_info['post_code'] ?? '' );

echo esc_html( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
