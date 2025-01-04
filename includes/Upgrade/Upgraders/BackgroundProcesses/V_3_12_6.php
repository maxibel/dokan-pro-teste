<?php

namespace WeDevs\DokanPro\Upgrade\Upgraders\BackgroundProcesses;

use WC_Order;
use WeDevs\Dokan\Abstracts\DokanBackgroundProcesses;

/**
 * Dokan V_3_12_6 Upgrade Background Processor Class.
 *
 * @since 3.13.0
 */
class V_3_12_6 extends DokanBackgroundProcesses {

    /**
     * Action
     * Override this action in processor class
     *
     * @since 3.13.0
     *
     * @var string
     */
    protected $action = 'dokan_pro_bg_action_3_12_6';

    /**
     * Perform Update Task.
     *
     * @since 3.13.0
     *
     * @param array $item
     *
     * @return array|false
     */
    public function task( $item ) {
        if ( empty( $item ) ) {
            return false;
        }

        if ( 'update_vendor_subscription_orders_meta' === $item['task'] ) {
            return $this->process_task_queue( $item );
        }

        return false;
    }

    /**
     * Task Queue Processor.
     *
     * @since 3.13.0
     *
     * @return array|bool
     */
    private function process_task_queue( $args ) {
        $paged    = $args['paged'] ?? 1;
        $per_page = 10;
        $offset   = ( $paged - 1 ) * $per_page;

        $orders = dokan()->order->all(
            [
                'paged'      => $paged,
                'limit'      => $per_page,
                'offset'     => $offset,
                'meta_query' => [
                    [
                        'relation' => 'OR',
                        [
                            'key'     => '_pack_validity',
                            'compare' => 'EXISTS',
                        ],
                        [
                            'key'     => '_no_of_product',
                            'compare' => 'EXISTS',
                        ],
                        [
                            'key'     => '_subscription_product_admin_commission',
                            'compare' => 'EXISTS',
                        ],
                    ],
                ],
            ]
        );

        if ( ! $orders ) {
            return false;
        }

        foreach ( $orders as $order ) {
            if ( ! $order instanceof WC_Order ) {
                continue;
            }

            $this->update_vendor_subscription_orders_meta( $order );
        }

        $args['paged'] = ++$paged;

        return $args;
    }

    /**
     * Update Vendor Subscription Orders Meta.
     *
     * @since 3.13.0
     *
     * @param WC_Order $order Order
     *
     * @return void
     */
    protected function update_vendor_subscription_orders_meta( $order ) {
        $order->update_meta_data( '_dokan_vendor_subscription_order', 'yes' );
        $order->save();
    }
}
