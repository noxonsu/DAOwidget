<?php
/**
Plugin Name: Dao Factory
Description: Go to Pages -> Add new, enter title "DAO" and put "[daofactoryInit]" in the textarea. Open this page in new window and enjoy
Author: Vitaliy Shulik
Requires PHP: 7.1
Text Domain: daofactory
Domain Path: /lang
Version: 1.0.0
 */

/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;

define( 'DAOFACTORY_BASE_DIR', __DIR__ );
define( 'DAOFACTORY_BASE_FILE', __FILE__ );
define( 'DAOFACTORY_PATH', plugin_dir_path( __FILE__ ) );
define( 'DAOFACTORY_URL', plugin_dir_url( __FILE__ ) );


function daofactory_main_shortcode() {
  ob_start(); ?>
  js свой сюда вставляй
  йа креведко <script>alert('azaza')</script>
  <?
	return ob_get_clean();
}
add_shortcode( 'daofactoryInit', 'daofactory_main_shortcode' );
