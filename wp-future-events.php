<?php
/**
 * WPR-Future-Events
 *
 *
 * @package   WPR-Future-Events
 * @author    Ilene Johnson
 * @license   GPL-3.0
 * @link      https://ikjweb.com
 * @wordpress-plugin
 * Plugin Name:       WPR-Future-Events
 * Plugin URI:        https://ikjweb.com
 * Description:       Plugin that uses REST and REACT to list future events from your google calendar
 * Version:           1.0
 * Author:            Ilene Johnson
 * Author URI:        https://ikjweb.com
 * Text Domain:       wpr-future-events
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */
 
namespace Future\WPR;
 
 // If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'WP_FUTURE_EVENTS_VERSION', '1.0' );

spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = __NAMESPACE__;
	

    // base directory for the namespace prefix
    $base_dir = __DIR__ . '/includes/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
	
	
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    // if the file exists, require it

    if (file_exists($file)) {
        require $file;
    }
});
function init() {
	$wpr = Plugin::get_instance();
	$wpr_shortcode = Shortcode::get_instance();
	$wpr_admin = Admin::get_instance();
	$wpr_rest = Endpoint\Admin::get_instance();
}
add_action( 'plugins_loaded', 'Future\\WPR\\init' );





/**
 * Register the widget
 *
 * @since 1.0.0
 */
function widget_init() {
	return register_widget( new Widget );
}
add_action( 'widgets_init', 'Future\\WPR\\widget_init' );

/**
 * Register activation and deactivation hooks
 */
register_activation_hook( __FILE__, array( 'Future\\WPR\\Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Future\\WPR\\Plugin', 'deactivate' ) );

