<?php
/**
 * Outputs a variation
 *
 * @var int $variation_id
 * @var WP_POST $variation
 * @var array $variation_data array of variation data
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

extract( $variation_data ); // phpcs:ignore
$now = dokan_current_datetime();
?>

<div class="dokan-product-variation-itmes">
    <h3 class="variation-topbar-heading">

        <strong>#<?php echo esc_html( $variation_id ); ?> </strong>
        <?php
        foreach ( $parent_data['attributes'] as $attribute ) {
            // Only deal with attributes that are variations
            if ( ! $attribute['is_variation'] || 'false' === $attribute['is_variation'] ) {
                continue;
            }

            // Get current value for variation (if set)
            $variation_selected_value = isset( $variation_data[ 'attribute_' . sanitize_title( $attribute['name'] ) ] ) ? $variation_data[ 'attribute_' . sanitize_title( $attribute['name'] ) ] : '';

            // Name will be something like attribute_pa_color
            echo '<select class="dokan-form-control" name="attribute_' . sanitize_title( $attribute['name'] ) . '[' . esc_attr( $loop ) . ']"><option value="">' . __( 'Any', 'dokan' ) . ' ' . esc_html( wc_attribute_label( $attribute['name'] ) ) . '&hellip;</option>';

            // Get terms for attribute taxonomy or value if its a custom attribute
            if ( $attribute['is_taxonomy'] ) {
                $post_terms = wp_get_post_terms( $parent_data['id'], $attribute['name'] );

                foreach ( $post_terms as $post_term ) {
                    echo '<option ' . selected( $variation_selected_value, $post_term->slug, false ) . ' value="' . esc_attr( $post_term->slug ) . '">' . esc_html( apply_filters( 'woocommerce_variation_option_name', $post_term->name ) ) . '</option>';
                }
            } else {
                $options = wc_get_text_attributes( $attribute['value'] );

                foreach ( $options as $option ) {
                    $selected = sanitize_title( $variation_selected_value ) === $variation_selected_value ? selected( $variation_selected_value, sanitize_title( $option ), false ) : selected( $variation_selected_value, $option, false );
                    echo '<option ' . $selected . ' value="' . esc_attr( $option ) . '">' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option ) ) . '</option>';
                }
            }

            echo '</select>';
        }
        ?>

        <input type="hidden" name="variable_post_id[<?php echo esc_attr( $loop ); ?>]" value="<?php echo esc_attr( $variation_id ); ?>" />
        <input type="hidden" class="variation_menu_order" name="variation_menu_order[<?php echo esc_attr( $loop ); ?>]" value="<?php echo isset( $menu_order ) ? absint( $menu_order ) : 0; ?>" />
        <div class="dokan-clearfix"></div>
    </h3>
    <div class="actions">
        <i class="fas fa-bars sort tips" data-title="<?php esc_attr_e( 'Drag and drop, or click to set admin variation order', 'dokan' ); ?>" aria-hidden="true" ></i>
        <i class="fas fa-sort-down fa-flip-horizointal toggle-variation-content" aria-hidden="true"></i>
        <a href="#" class="remove_variation delete" rel="<?php echo esc_attr( $variation_id ); ?>"><?php esc_html_e( 'Remove', 'dokan' ); ?></a>
    </div>

    <div class="dokan-variable-attributes woocommerce_variable_attributes wc-metabox-content" style="display: none;">
        <div class="data">
            <div class="content-half-part thumbnail-checkbox-options">
                <div class="upload_image">
                    <a href="#" class="upload_image_button tips <?php echo ( $_thumbnail_id > 0 ) ? 'dokan-img-remove' : ''; ?>" title="<?php ( $_thumbnail_id > 0 ) ? esc_attr_e( 'Remove this image', 'dokan' ) : esc_attr_e( 'Upload an image', 'dokan' ); ?>" rel="<?php echo esc_attr( $variation_id ); ?>">
                        <img alt="thumbnail" src="<?php echo ( ! empty( $image ) ? esc_attr( $image ) : esc_attr( wc_placeholder_img_src() ) ); ?>" width="130px" height="130px"/>
                        <input type="hidden" name="upload_image_id[<?php echo esc_attr( $loop ); ?>]" class="upload_image_id" value="<?php echo esc_attr( $_thumbnail_id ); ?>" />
                    </a>
                </div>
                <div class="dokan-form-group options">
                    <label><input type="checkbox" class="" name="variable_enabled[<?php echo esc_attr( $loop ); ?>]" <?php checked( $variation->post_status, 'publish' ); ?> /> <?php esc_html_e( 'Enabled', 'dokan' ); ?></label>
                    <?php if ( 'sell_physical' !== dokan_pro()->digital_product->get_selling_product_type() ) : ?>
                        <?php $sell_digital_products = 'sell_digital' === dokan_pro()->digital_product->get_selling_product_type(); ?>
                        <label><input type="checkbox" class="variable_is_downloadable" name="variable_is_downloadable[<?php echo esc_attr( $loop ); ?>]" <?php checked( ! empty( $_downloadable ) ? $_downloadable : ( $sell_digital_products ? 'yes' : '' ), 'yes' ); ?> /> <?php esc_html_e( 'Downloadable', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" title="<?php esc_attr_e( 'Enable this option if access is given to a downloadable file upon purchase of a product', 'dokan' ); ?>"></i></label>
                        <label><input type="checkbox" class="variable_is_virtual" name="variable_is_virtual[<?php echo esc_attr( $loop ); ?>]" <?php checked( ! empty( $_virtual ) ? $_virtual : ( $sell_digital_products ? 'yes' : '' ), 'yes' ); ?> /> <?php esc_html_e( 'Virtual', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" title="<?php esc_attr_e( 'Enable this option if a product is not shipped or there is no shipping cost', 'dokan' ); ?>"></i></label>
                    <?php endif; ?>
                    <?php if ( 'yes' === get_option( 'woocommerce_manage_stock' ) ) : ?>
                        <label><input type="checkbox" class="variable_manage_stock" name="variable_manage_stock[<?php echo esc_attr( $loop ); ?>]" <?php checked( isset( $_manage_stock ) ? $_manage_stock : '', 'yes' ); ?> /> <?php esc_html_e( 'Manage stock?', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Enable this option to enable stock management at variation level', 'dokan' ); ?>"></i></label>
                    <?php endif; ?>

                    <?php do_action( 'dokan_variation_options', $loop, $variation_data, $variation ); ?>

                </div>
                <div class="dokan-clearfix"></div>
            </div>

            <div class="content-half-part">
                <?php if ( wc_product_sku_enabled() ) : ?>
                    <div class="sku">
                        <label><?php esc_html_e( 'SKU', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Enter a SKU for this variation or leave blank to use the parent product SKU.', 'dokan' ); ?>"></i></label>
                        <input type="text" class="dokan-form-control" size="5" name="variable_sku[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_sku ) ) ? esc_attr( $_sku ) : ''; ?>" placeholder="<?php echo esc_attr( $parent_data['sku'] ); ?>" />
                    </div>
                <?php else : ?>
                    <input type="hidden" name="variable_sku[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_sku ) ) ? esc_attr( $_sku ) : ''; ?>" />
                <?php endif; ?>

                <div class="stock-status hide_if_variation_manage_stock">
                    <label><?php esc_html_e( 'Stock status', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Controls whether or not the product is listed as "in stock" or "out of stock" on the frontend.', 'dokan' ); ?>"></i></label>
                    <select name="variable_stock_status[<?php echo esc_attr( $loop ); ?>]" class="dokan-form-control">
                        <?php
                        foreach ( $parent_data['stock_status_options'] as $key => $value ) {
                            echo '<option value="' . esc_attr( $key === $_stock_status ? '' : $key ) . '" ' . selected( $key === $_stock_status, true, false ) . '>' . esc_html( $value ) . '</option>';
                        }
                        ?>
                    </select>
                </div>
            </div>

            <div class="dokan-clearfix"></div>
            <div class="variable_pricing show_if_variable show_if_variable-subscription">

                <?php do_action( 'dokan_regular_price_html_on_single_variation', $loop, $variation_data, $variation ); ?>

                <div class="content-half-part hide_if_variable-subscription" style="padding-right: 16px;">
                    <label><?php echo __( 'Regular price', 'dokan' ) . ' (' . get_woocommerce_currency_symbol() . ')'; ?></label>
                    <span class="vendor-earning">( <?php esc_html_e( ' You Earn : ', 'dokan' ); ?><?php echo get_woocommerce_currency_symbol(); ?><span class="vendor-price"><?php echo wp_kses_post( wc_price( dokan()->commission->get_earning_by_product( $variation->ID ), [ 'currency' => get_woocommerce_currency_symbol(), 'decimals' => wc_get_price_decimals() + 2, ] ) ); ?></span> )</span>
                    <input type="text" size="5" name="variable_regular_price[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_regular_price ) ) ? esc_attr( $_regular_price ) : ''; ?>" class="dokan-product-variable wc_input_price dokan-form-control dokan-product-regular-price-variable" placeholder="<?php esc_attr_e( 'Variation price (required)', 'dokan' ); ?>" />
                </div>
                <div class="content-half-part content-width-subscription">
                    <label><?php echo __( 'Sale price', 'dokan' ) . ' (' . get_woocommerce_currency_symbol() . ')'; ?> <a href="#" class="sale_schedule"><?php esc_html_e( 'Schedule', 'dokan' ); ?></a><a href="#" class="cancel_sale_schedule" style="display:none"><?php esc_html_e( 'Cancel schedule', 'dokan' ); ?></a></label>
                    <input type="text" size="5" name="variable_sale_price[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_sale_price ) ) ? esc_attr( $_sale_price ) : ''; ?>" class="wc_input_price dokan-form-control dokan-product-sales-price-variable" />
                </div>
                <div class="dokan-form-group dokan-clearfix product-edit-container">
                    <div class="dokan-product-less-price-alert dokan-hide">
                        <?php esc_html_e( 'Product price can\'t be less than the vendor fee!', 'dokan' ); ?>
                    </div>
                </div>
                <div class="dokan-clearfix"></div>
                <div class="sale_price_dates_fields dokan-form-group" style="display: none">
                    <div class="content-half-part">
                        <label><?php esc_html_e( 'Sale start date', 'dokan' ); ?></label>
                        <input type="text" class="dokan-form-control sale_price_dates_from datepicker" name="variable_sale_price_dates_from[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ! empty( $_sale_price_dates_from ) && is_numeric( $_sale_price_dates_from ) ? $now->setTimestamp( $_sale_price_dates_from )->format( 'Y-m-d' ) : ''; ?>" placeholder="<?php echo esc_attr_x( 'From&hellip;', 'placeholder', 'dokan' ); ?> YYYY-MM-DD" maxlength="10" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" />
                    </div>
                    <div class="content-half-part">
                        <label><?php esc_html_e( 'Sale end date', 'dokan' ); ?></label>
                        <input type="text" class="dokan-form-control sale_price_dates_to datepicker" name="variable_sale_price_dates_to[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ! empty( $_sale_price_dates_to ) && is_numeric( $_sale_price_dates_to ) ? $now->setTimestamp( $_sale_price_dates_to )->format( 'Y-m-d' ) : ''; ?>" placeholder="<?php echo esc_attr_x( 'To&hellip;', 'placeholder', 'dokan' ); ?> YYYY-MM-DD" maxlength="10" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" />
                    </div>
                    <div class="dokan-clearfix"></div>
                </div>
                <?php
                    /**
                     * Dokan_variation_options_pricing action.
                     *
                     * @since 2.6
                     *
                     * @param int     $loop
                     * @param array   $variation_data
                     * @param WP_Post $variation
                     */
                    do_action( 'dokan_variation_options_pricing', $loop, $variation_data, $variation );
                ?>
            </div>

            <?php
                /**
                 * Dokan_variation_options_pricing action.
                 *
                 * @since 2.6
                 *
                 * @param int     $loop
                 * @param array   $variation_data
                 * @param WP_Post $variation
                 */
                do_action( 'dokan_product_after_variation_pricing', $loop, $variation_data, $variation );
            ?>

            <?php if ( 'yes' === get_option( 'woocommerce_manage_stock' ) ) : ?>

                <div class="dokan-form-group show_if_variation_manage_stock" style="display: none;">
                    <div class="content-half-part">
                        <label><?php esc_html_e( 'Stock quantity', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Enter a quantity to enable stock management at variation level, or leave blank to use the parent product\'s options.', 'dokan' ); ?>"></i></label>
                        <input type="number" class="dokan-form-control" size="5" name="variable_stock[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_stock ) ) ? esc_attr( wc_stock_amount( $_stock ) ) : ''; ?>" step="any" />
                    </div>
                    <div class="content-half-part">
                        <label><?php esc_html_e( 'Allow backorders?', 'dokan' ); ?></label>
                        <select name="variable_backorders[<?php echo esc_attr( $loop ); ?>]" class="dokan-form-control">
                            <?php
                            foreach ( $parent_data['backorder_options'] as $key => $value ) {
                                echo '<option value="' . esc_attr( $key ) . '" ' . selected( $key === $_backorders, true, false ) . '>' . esc_html( $value ) . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                    <div class="dokan-clearfix"></div>
                    <div class="content-half-part">
                        <label for="variable_low_stock_amount[<?php echo esc_attr( $loop ); ?>]"><?php esc_html_e( 'Low stock threshold', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'When variation stock reaches this amount you will be notified by email.', 'dokan' ); ?>"></i></label>
                        <input type="number" class="dokan-form-control" id="variable_low_stock_amount[<?php echo esc_attr( $loop ); ?>]" name="variable_low_stock_amount[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_low_stock_amount ) ) ? esc_attr( wc_format_localized_decimal( $_low_stock_amount ) ) : ''; ?>" min="0" step="1" />
                    </div>
                    <div class="dokan-clearfix"></div>
                    <?php
                        /**
                         * Woocommerce_variation_options_inventory action.
                         *
                         * @since 2.5.0
                         *
                         * @param int     $loop
                         * @param array   $variation_data
                         * @param WP_Post $variation
                         */
                        do_action( 'dokan_variation_options_inventory', $loop, $variation_data, $variation );
                    ?>
                </div>

            <?php endif; ?>

            <?php if ( wc_product_weight_enabled() || wc_product_dimensions_enabled() ) : ?>

                <div class="weight-dimension">
                    <?php if ( wc_product_weight_enabled() ) : ?>
                        <div class="content-half-part hide_if_variation_virtual">
                            <label><?php echo __( 'Weight', 'dokan' ) . ' (' . esc_html( get_option( 'woocommerce_weight_unit' ) ) . ')'; ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Enter a weight for this variation or leave blank to use the parent product weight.', 'dokan' ); ?>"></i></label>
                            <input type="text" size="5" name="variable_weight[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_weight ) ) ? esc_attr( $_weight ) : ''; ?>" placeholder="<?php echo esc_attr( $parent_data['weight'] ); ?>" class="dokan-form-control" />
                        </div>
                    <?php else : ?>
                        <div>&nbsp;</div>
                    <?php endif; ?>

                    <?php if ( wc_product_dimensions_enabled() ) : ?>
                        <div class="content-half-part dimensions_field hide_if_variation_virtual">
                            <label for="product_length"><?php echo __( 'Dimensions (L&times;W&times;H)', 'dokan' ) . ' (' . esc_html( get_option( 'woocommerce_dimension_unit' ) ) . ')'; ?></label>
                            <div class="dokan-form-group">
                                <input id="product_length[<?php echo esc_attr( $loop ); ?>]" class="dokan-w3 dokan-form-control wc_input_decimal" size="6" type="text" name="variable_length[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_length ) ) ? esc_attr( $_length ) : ''; ?>" placeholder="<?php echo esc_attr( $parent_data['length'] ); ?>" />
                                <input class="dokan-w3 dokan-form-control wc_input_decimal" size="6" type="text" name="variable_width[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_width ) ) ? esc_attr( $_width ) : ''; ?>" placeholder="<?php echo esc_attr( $parent_data['width'] ); ?>" />
                                <input class="dokan-w3 dokan-form-control wc_input_decimal last" size="6" type="text" name="variable_height[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_height ) ) ? esc_attr( $_height ) : ''; ?>" placeholder="<?php echo esc_attr( $parent_data['height'] ); ?>" />
                            </div>
                        </div>
                    <?php else : ?>
                        <div>&nbsp;</div>
                    <?php endif; ?>

                    <div class="dokan-clearfix"></div>
                </div>
            <?php endif; ?>

            <div>
                <?php if ( 'sell_digital' !== dokan_pro()->digital_product->get_selling_product_type() ) : ?>
                    <div class="dokan-form-group hide_if_variation_virtual">
                        <label><?php esc_html_e( 'Shipping class', 'dokan' ); ?></label>
                        <?php
                        $args = array(
                            'taxonomy'          => 'product_shipping_class',
                            'hide_empty'        => 0,
                            'show_option_none'  => __( 'Same as parent', 'dokan' ),
                            'name'              => 'variable_shipping_class[' . esc_attr( $loop ) . ']',
                            'id'                => '',
                            'class'             => 'dokan-form-control',
                            'selected'          => isset( $shipping_class ) ? esc_attr( $shipping_class ) : '',
                            'echo'              => 0,
                        );

                        echo wp_dropdown_categories( $args );
                        ?>
                    </div>
                <?php endif; ?>

                <?php if ( wc_tax_enabled() ) : ?>


                <div class="dokan-form-group form-row-full">
                    <label><?php esc_html_e( 'Tax class', 'dokan' ); ?></label>
                    <select class="dokan-form-control" name="variable_tax_class[<?php echo esc_attr( $loop ); ?>]">
                        <option value="parent" <?php selected( is_null( $_tax_class ), true ); ?>><?php esc_html_e( 'Same as parent', 'dokan' ); ?></option>
                        <?php
                        foreach ( $parent_data['tax_class_options'] as $key => $value ) {
                            echo '<option value="' . esc_attr( $key ) . '" ' . selected( $key === $_tax_class, true, false ) . '>' . esc_html( $value ) . '</option>';
                        }
                        ?>
                    </select>

                </div>

                    <?php
                    /**
                     * Dokan_variation_options_tax action.
                     *
                     * @since 2.6
                     *
                     * @param int     $loop
                     * @param array   $variation_data
                     * @param WP_Post $variation
                     */
                    do_action( 'dokan_variation_options_tax', $loop, $variation_data, $variation );
                    ?>
                <?php endif; ?>

            </div>

            <div>
                <p class="dokan-form-group">
                    <label><?php esc_html_e( 'Variation description', 'dokan' ); ?></label>
                    <textarea class="dokan-form-control" name="variable_description[<?php echo esc_attr( $loop ); ?>]" rows="3" style="width:100%;"><?php echo isset( $variation_data['_variation_description'] ) ? esc_textarea( $variation_data['_variation_description'] ) : ''; ?></textarea>
                </p>
            </div>

            <div class="show_if_variation_downloadable" style="display: none;">
                <div class="dokan-form-group downloadable_files">
                    <label><?php esc_html_e( 'Downloadable files', 'dokan' ); ?></label>
                    <table class="dokan-table dokan-table-striped">
                        <thead>
                            <div>
                                <th><?php esc_html_e( 'Name', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'This is the name of the download shown to the customer.', 'dokan' ); ?>"></i></th>
                                <th colspan="2"><?php esc_html_e( 'File URL', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'This is the URL or absolute path to the file which customers will get access to. URLs entered here should already be encoded.', 'dokan' ); ?>"></i></th>
                                <th>&nbsp;</th>
                            </div>
                        </thead>
                        <tbody>
                            <?php
                            if ( $_downloadable_files ) {
                                foreach ( $_downloadable_files as $key => $file ) {
                                    if ( ! is_array( $file ) ) {
                                        $file = array(
                                            'file' => $file,
                                            'name' => '',
                                        );
                                    }
                                    dokan_get_template_part(
                                        'products/edit/html-product-variation-download',
                                        '',
                                        array(
                                            'pro'          => true,
                                            'key'          => $key,
                                            'file'         => $file,
                                            'variation_id' => $variation_id,
                                        )
                                    );
                                }
                            }
                            ?>
                        </tbody>
                        <tfoot>
                            <div>
                                <th colspan="4">
                                    <a href="#" class="dokan-btn dokan-btn-default insert-file-row" data-row="
                                    <?php
                                    $key  = '';
                                    $file = array(
                                        'file' => '',
                                        'name' => '',
                                    );
                                    ob_start();
                                    dokan_get_template_part(
                                        'products/edit/html-product-variation-download',
                                        '',
                                        array(
                                            'pro'          => true,
                                            'key'          => $key,
                                            'file'         => $file,
                                            'variation_id' => $variation_id,
                                        )
                                    );
                                    echo esc_attr( ob_get_clean() );
                                    ?>
                                    ">
                                        <?php esc_html_e( 'Add File', 'dokan' ); ?>
                                    </a>
                                </th>
                            </div>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="dokan-form-group show_if_variation_downloadable" style="display: none;">
                <div class="content-half-part">
                    <label><?php esc_html_e( 'Download limit', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Leave blank for unlimited re-downloads.', 'dokan' ); ?>"></i></label>
                    <input type="text" class="dokan-form-control" name="variable_download_limit[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_download_limit ) ) ? esc_attr( $_download_limit ) : ''; ?>" placeholder="<?php esc_attr_e( 'Unlimited', 'dokan' ); ?>" />
                </div>
                <div class="content-half-part">
                    <label><?php esc_html_e( 'Download expiry', 'dokan' ); ?> <i class="fas fa-question-circle tips" aria-hidden="true" data-title="<?php esc_attr_e( 'Enter the number of days before a download link expires, or leave blank.', 'dokan' ); ?>"></i></label>
                    <input type="text" class="dokan-form-control" name="variable_download_expiry[<?php echo esc_attr( $loop ); ?>]" value="<?php echo ( isset( $_download_expiry ) ) ? esc_attr( $_download_expiry ) : ''; ?>" placeholder="<?php esc_attr_e( 'Never', 'dokan' ); ?>" />
                </div>

                <?php
                    /**
                     * Dokan_variation_options_download action.
                     *
                     * @since 2.6
                     *
                     * @param int     $loop
                     * @param array   $variation_data
                     * @param WP_Post $variation
                     */
                    do_action( 'dokan_variation_options_download', $loop, $variation_data, $variation );
                ?>
                <div class="dokan-clearfix"></div>
            </div>

            <?php do_action( 'dokan_product_after_variable_attributes', $loop, $variation_data, $variation ); ?>
        </div>
    </div>
</div>
