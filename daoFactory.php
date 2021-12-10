<?php
/**
Plugin Name: Dao Factory
Description: Go to Pages -> Add new, enter title "DAO" and put "[daofactory_app]" in the textarea. Open this page in new window and enjoy
Author: Vitaliy Shulik
Requires PHP: 7.1
Text Domain: daofactory
Domain Path: /lang
Version: 0.1.1
 */


// First register resources with init
function daofactory_app_init() {
  $path = "/build/static";

  wp_register_script("daofactory_app_js", plugins_url($path."/js/main.js", __FILE__), array(), "1.0", false);
  wp_register_style("daofactory_app_css", plugins_url($path."/css/main.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'daofactory_app_init' );

// Function for the short code that call React app
function daofactory_app( $atts ) {
  $a = shortcode_atts( array(
		'ens_space' => 'onout.eth',
    'network_id' => '56',
    'token_address' => '0x92648e4537cdfa1ee743a244465a31aa034b1ce8',
		'template' => 'dark_template',
	), $atts );

  wp_enqueue_script("daofactory_app_js", '1.0', true);
  wp_enqueue_style("daofactory_app_css");
  /* ob_start(); ?>
    js свой сюда вставляй
    йа креведко <script>alert('azaza')</script>
  <? */
  return '<div id="daofactory_app" class="' . esc_attr($a['ens_space']) . ' ' . esc_attr($a['network_id']) . ' ' . esc_attr($a['token_address']) . ' ' . esc_attr($a['template']) . '" ></div>';
}

add_shortcode('daofactory_app', 'daofactory_app');
