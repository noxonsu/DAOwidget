<?php
/**
Plugin Name: Dao Factory
Description: Go to Pages -> Add new, enter title "DAO" and put "[daofactoryInit]" in the textarea. Open this page in new window and enjoy
Author: Vitaliy Shulik
Requires PHP: 7.1
Text Domain: daofactory
Domain Path: /lang
Version: 1.0.1
 */


// First register resources with init
function daofactory_app_init() {
  $path = "/build/static";

  wp_register_script("daofactory_app_js", plugins_url($path."/js/main.js", __FILE__), array(), "1.0", false);
  wp_register_style("daofactory_app_css", plugins_url($path."/css/main.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'daofactory_app_init' );

// Function for the short code that call React app
function daofactory_app() {
  wp_enqueue_script("daofactory_app_js", '1.0', true);
  wp_enqueue_style("daofactory_app_css");
  /* ob_start(); ?>
    js свой сюда вставляй
    йа креведко <script>alert('azaza')</script>
  <? */
  return "<div id=\"daofactory_app\"></div>";
}

add_shortcode('daofactory_app', 'daofactory_app');
