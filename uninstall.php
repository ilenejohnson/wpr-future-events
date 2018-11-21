<?php
/**
 * WPR-Future-Events
 *
 *
 * @package   WPR-Future-Events
 * @author    Ilene Johnson
 * @license   GPL-3.0
 * @link      http://ikjweb.com
 */

namespace Future\WPR;


if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
delete_option( 'wpr_future_events' );
// Uninstallation actions here



?>