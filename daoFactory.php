<?php
/**
Plugin Name: Dao Factory
Description: Go to Pages -> Add new, enter title "DAO" and put "[daofactory_app]" in the textarea. Open this page in new window and enjoy
Author: Vitaliy Shulik
Requires PHP: 7.1
Text Domain: daofactory
Domain Path: /lang
Version: 0.1.2
 */

/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'DAOFACTORY_URL', plugin_dir_url( __FILE__ ) );
define( 'DAOFACTORY_VER', '0.1.2');


// First register resources with init
function daofactory_app_init() {

  wp_register_script( 'daofactory_app_js', DAOFACTORY_URL . 'build/static/js/main.js', array(), DAOFACTORY_VER, false );
	wp_register_style( 'daofactory_app_css', DAOFACTORY_URL . 'build/static/css/main.css', false, DAOFACTORY_VER, "all");
}

add_action( 'init', 'daofactory_app_init' );

// Function for the short code that call React app
function daofactory_app( $atts ) {
  $a = shortcode_atts( array(
		'ens_space' => 'onout.eth',
    'network_id' => '56',
		'template' => 'dark_template',
    'token_address' => '0x92648e4537cdfa1ee743a244465a31aa034b1ce8',
    'token_symbol' => 'SWAP',
    'token_decimals' => '18',
	), $atts );

  wp_enqueue_script("daofactory_app_js", DAOFACTORY_VER, true);
  wp_enqueue_style("daofactory_app_css");

  $html = '
    <div
      id="daofactory_app"
      data-ens="' . esc_attr($a['ens_space']) . '"
      data-network="' . esc_attr($a['network_id']) . '"
      data-token-address="' . esc_attr($a['token_address']) . '"
      data-token-symbol="' . esc_attr($a['token_symbol']) . '"
      data-token-decimals="' . esc_attr($a['token_decimals']) . '"
      data-color-template="' . esc_attr($a['template']) . '"
    ></div>
  ';

  return $html;
}

add_shortcode('daofactory_app', 'daofactory_app');
