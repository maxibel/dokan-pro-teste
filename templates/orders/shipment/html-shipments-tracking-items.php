<table>
    <?php if ( $item_qty ) : ?>
        <tbody>
            <?php foreach ( $item_qty as $item_id => $item ) : ?>
                <?php
                $item_details = new WC_Order_Item_Product( $item_id );
                $_product     = $item_details->get_product();
                ?>
                <tr>
                    <td class="thumb">
                        <?php if ( $_product ) : ?>
                            <?php echo $_product->get_image( 'shop_thumbnail', array( 'title' => '' ) ); ?>
                        <?php else : ?>
                            <?php echo wc_placeholder_img( 'shop_thumbnail' ); ?>
                        <?php endif; ?>
                    </td>
                    <td>
                        <?php if ( $_product ) : ?>
                            <a target="_blank" href="<?php echo esc_url( get_permalink( absint( $_product->get_id() ) ) ); ?>">
                                <?php echo esc_html( $item_details['name'] ); ?>

                                <?php
                                /**
                                 * Filter to modify the display name of the shippable product in the order details.
                                 *
                                 * @since 3.13.0
                                 *
                                 * @param WC_Order_Item_Product $item_details The name of the product.
                                 * @param WC_Product            $_product     The product object.
                                 */
                                do_action( 'dokan_order_after_shippable_product_name', $_product, $item_details );
                                ?>
                            </a>
                        <?php else : ?>
                            <?php echo esc_html( $item_details['name'] ); ?>
                        <?php endif; ?>
                    </td>
                    <td><strong><?php echo esc_html( $item ); ?> (<?php esc_html_e( 'Qty', 'dokan' ); ?>)</strong></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    <?php endif; ?>
</table>
