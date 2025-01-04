<?php
/**
 * Dokan Quick edit field template for admin
 *
 * @since 3.12.0
 */

defined( 'ABSPATH' ) || exit;

use WeDevs\DokanPro\Modules\OrderMinMax\Constants;
use WeDevs\DokanPro\Modules\OrderMinMax\Helper;

?>
<div class="dokan-min-max-wrapper dokan-min-max-admin">
    <h4><?php esc_html_e( 'Quantity Min/Max', 'dokan' ); ?></h4>
    <div class="inline-edit-group">
        <label class="dokan_min_quantity">
            <span class="title"><?php esc_html_e( 'Min Quantity', 'dokan' ); ?></span>
            <span class="input-text-wrap">
                <input
                    type="number"
                    name="<?php echo esc_attr( Constants::QUICK_EDIT_MINIMUM_QUANTITY ); ?>"
                    class="text dokan-min-quantity-input <?php echo esc_attr( Constants::QUICK_EDIT_MINIMUM_QUANTITY ); ?>"
                    value="0"
                    min="0"
                >
            </span>
        </label>
    </div>
    <div class="inline-edit-group">
        <label class="dokan_max_quantity">
            <span class="title"><?php esc_html_e( 'Max Quantity', 'dokan' ); ?></span>
            <span class="input-text-wrap">
                <input
                    type="number"
                    name="<?php echo esc_attr( Constants::QUICK_EDIT_MAXIMUM_QUANTITY ); ?>"
                    class="text dokan-max-quantity-input <?php echo esc_attr( Constants::QUICK_EDIT_MAXIMUM_QUANTITY ); ?>"
                    value="0"
                    min="0"
                >
            </span>
        </label>
    </div>
    <div class="inline-edit-group dokan-min-max-warning-message">
        <?php echo Helper::get_quantity_min_max_notice(); ?>
    </div>
</div>

<style>

</style>


