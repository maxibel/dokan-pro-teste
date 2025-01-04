<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/analytics/data/v1beta/analytics_data_api.proto

namespace Google\Analytics\Data\V1beta;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * The compatibility response with the compatibility of each dimension & metric.
 *
 * Generated from protobuf message <code>google.analytics.data.v1beta.CheckCompatibilityResponse</code>
 */
class CheckCompatibilityResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * The compatibility of each dimension.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.DimensionCompatibility dimension_compatibilities = 1;</code>
     */
    private $dimension_compatibilities;
    /**
     * The compatibility of each metric.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.MetricCompatibility metric_compatibilities = 2;</code>
     */
    private $metric_compatibilities;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type array<\Google\Analytics\Data\V1beta\DimensionCompatibility>|\Google\Protobuf\Internal\RepeatedField $dimension_compatibilities
     *           The compatibility of each dimension.
     *     @type array<\Google\Analytics\Data\V1beta\MetricCompatibility>|\Google\Protobuf\Internal\RepeatedField $metric_compatibilities
     *           The compatibility of each metric.
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Google\Analytics\Data\V1Beta\AnalyticsDataApi::initOnce();
        parent::__construct($data);
    }

    /**
     * The compatibility of each dimension.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.DimensionCompatibility dimension_compatibilities = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getDimensionCompatibilities()
    {
        return $this->dimension_compatibilities;
    }

    /**
     * The compatibility of each dimension.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.DimensionCompatibility dimension_compatibilities = 1;</code>
     * @param array<\Google\Analytics\Data\V1beta\DimensionCompatibility>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setDimensionCompatibilities($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Google\Analytics\Data\V1beta\DimensionCompatibility::class);
        $this->dimension_compatibilities = $arr;

        return $this;
    }

    /**
     * The compatibility of each metric.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.MetricCompatibility metric_compatibilities = 2;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getMetricCompatibilities()
    {
        return $this->metric_compatibilities;
    }

    /**
     * The compatibility of each metric.
     *
     * Generated from protobuf field <code>repeated .google.analytics.data.v1beta.MetricCompatibility metric_compatibilities = 2;</code>
     * @param array<\Google\Analytics\Data\V1beta\MetricCompatibility>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setMetricCompatibilities($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Google\Analytics\Data\V1beta\MetricCompatibility::class);
        $this->metric_compatibilities = $arr;

        return $this;
    }

}

