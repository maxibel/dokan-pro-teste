<?php

namespace WeDevs\DokanPro\Modules\SellerBadge\Events;

use WeDevs\Dokan\Vendor\Vendor;
use WeDevs\DokanPro\Modules\SellerBadge\Abstracts\BadgeEvents;
use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // exit if accessed directly
}

/**
 * Class store support count badge
 *
 * @since   3.7.14
 *
 * @package WeDevs\DokanPro\Modules\SellerBadge\Events
 */
class StoreSupportCount extends BadgeEvents {

    /**
     * Class constructor
     *
     * @since 3.7.14
     *
     * @param string $event_type
     */
    public function __construct( $event_type ) {
        parent::__construct( $event_type );
        // return in case of error
        if ( is_wp_error( $this->badge_event ) ) {
            return;
        }
        add_action( 'save_post_dokan_store_support', [ $this, 'process_hook' ], 10, 1 );
    }

    /**
     * Process hooks related to this badge
     *
     * @since 3.7.14
     *
     * @param int $post_id
     *
     * @return void
     */
    public function process_hook( $post_id ) {
        if ( false === $this->set_badge_and_badge_level_data() ) {
            return;
        }

        // if badge status is draft, no need to update vendor badges
        if ( 'published' !== $this->badge_data['badge_status'] ) {
            return;
        }

        $vendor_id = get_post_meta( $post_id, 'store_id', true );
        if ( $vendor_id ) {
            $this->run( $vendor_id );
        }
    }

    /**
     * Get current compare data
     *
     * @since 3.7.14
     *
     * @param int $vendor_id
     *
     * @return false|float
     */
    protected function get_current_data( $vendor_id ) {
        /**
         * @var Vendor $vendor
         */
        $vendor = dokan()->vendor->get( $vendor_id );
        if ( ! $vendor->get_id() ) {
            return false;
        }

        $qry_args = [
            'post_type'      => 'dokan_store_support',
            'post_status'    => 'closed',
            'posts_per_page' => - 1,
            'fields'         => 'ids',
            'meta_query'     => [
                [
                    'key'     => 'store_id',
                    'value'   => $vendor_id,
                    'compare' => '=',
                    'type'    => 'NUMERIC',
                ],
            ],
        ];

        $the_query = new WP_Query( $qry_args );
        $count     = $the_query->post_count;
        wp_reset_postdata();

        if ( empty( $count ) ) {
            return false;
        }

        return round( $count, 2 );
    }
}
