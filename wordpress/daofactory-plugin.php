<?php
/**
Plugin Name: DAO Factory
Description: Governance and proposals plugin for cryptocurrency tokens (Snapshot-like)
Author: NoxonThemes
Author URI: https://onout.org
Requires PHP: 7.4
Text Domain: daofactory
Domain Path: /lang
Version: 2.26.0227
*/

/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;

define( 'DAOFACTORY_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'DAOFACTORY_BASE_DIR', __DIR__ );
define( 'DAOFACTORY_BASE_FILE', __FILE__ );
define( 'DAOFACTORY_VER', '2.26.0227' );
define( 'DAOFACTORY_URL', plugin_dir_url( __FILE__ ) );
define( 'DAOFACTORY_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Plugin Init - Load autoloader and controllers
 */
require __DIR__ . '/pro/autoload.php';

/**
 * Permalink setup for standalone page
 */
function daofactory_default_slug() {
	return 'daofactory';
}

function daofactory_page_slug() {
	$slug = daofactory_default_slug();
	if ( get_option( 'daofactory_slug' ) ) {
		$slug = get_option( 'daofactory_slug' );
	}
	return esc_html( $slug );
}

function daofactory_page_url() {
	$page_url = home_url( '/' . daofactory_page_slug() . '/' );
	return esc_url( trailingslashit( $page_url ) );
}

add_filter( 'query_vars', function( $vars ) {
	$vars[] = 'daofactory_page';
	return $vars;
} );

function daofactory_add_rewrite_rules() {
	$slug = 'daofactory';
	if ( get_option( 'daofactory_slug' ) ) {
		$slug = get_option( 'daofactory_slug' );
	}
	global $wp_rewrite;
	$wp_rewrite->flush_rules();
	add_rewrite_rule( $slug . '/?$', 'index.php?daofactory_page=1', 'top' );
}
add_action( 'init', 'daofactory_add_rewrite_rules' );

function daofactory_include_template( $template ) {
	if ( get_query_var( 'daofactory_page' ) ) {
		$template = DAOFACTORY_TEMPLATE_DIR . DIRECTORY_SEPARATOR . "main.php";
	}
	return $template;
}
add_filter( 'template_include', 'daofactory_include_template' );

/**
 * Shortcode support
 */
function daofactory_shortcode( $attrs ) {
	ob_start();
	?>
	<div class="daofactory_widget">
		<?php include DAOFACTORY_TEMPLATE_DIR . DIRECTORY_SEPARATOR . "widget.php"; ?>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'daofactory_widget', 'daofactory_shortcode' );

/**
 * Page template support
 */
function daofactory_page_template( $page_template ) {
	if ( get_page_template_slug() == 'daofactory_pagetemplate' ) {
		$page_template = DAOFACTORY_TEMPLATE_DIR . DIRECTORY_SEPARATOR . "main.php";
	}
	return $page_template;
}
add_filter( 'page_template', 'daofactory_page_template' );

function daofactory_custom_template( $single ) {
	global $post;
	$meta = get_post_meta( $post->ID );
	if ( isset( $meta['_wp_page_template'] ) && isset( $meta['_wp_page_template'][0] ) && ( $meta['_wp_page_template'][0] == 'daofactory_pagetemplate' ) ) {
		$single = DAOFACTORY_TEMPLATE_DIR . DIRECTORY_SEPARATOR . "main.php";
	}
	return $single;
}
add_filter( 'single_template', 'daofactory_custom_template' );

function daofactory_add_template_to_select( $post_templates, $wp_theme, $post, $post_type ) {
	$post_templates['daofactory_pagetemplate'] = __( 'DAO Factory', 'daofactory' );
	return $post_templates;
}
add_filter( 'theme_page_templates', 'daofactory_add_template_to_select', 10, 4 );
add_filter( 'theme_post_templates', 'daofactory_add_template_to_select', 10, 4 );

/**
 * Prepare vendor files (React build artifacts)
 */
function daofactory_prepare_vendor() {
	$version = DAOFACTORY_VER ? DAOFACTORY_VER : 'no';
	$SEP = DIRECTORY_SEPARATOR;

	$cache_dir = DAOFACTORY_BASE_DIR . $SEP . 'vendor_cache' . $SEP . DAOFACTORY_VER . $SEP;
	$vendor_source = DAOFACTORY_BASE_DIR . $SEP . 'vendor_source' . $SEP . 'static' . $SEP . 'js' . $SEP;

	if ( ! file_exists( $cache_dir ) ) {
		if ( ! file_exists( $vendor_source ) ) {
			return;
		}

		$js_files = scandir( $vendor_source );
		mkdir( $cache_dir, 0777, true );

		foreach ( $js_files as $file ) {
			if ( is_file( $vendor_source . $file ) ) {
				$filename = basename( $file );
				$file_ext = explode( ".", $filename );
				$file_ext = strtoupper( $file_ext[ count( $file_ext ) - 1 ] );

				if ( $file_ext === 'JS' ) {
					$source = file_get_contents( $vendor_source . $filename );
					$modified = str_replace(
						array(
							'static/js/',
							'./images/',
							'images/',
							'n.p+"static/media/',
							'"./locales/'
						),
						array(
							DAOFACTORY_URL . 'vendor_cache/' . DAOFACTORY_VER . '/static/js/',
							'images/',
							DAOFACTORY_URL . 'vendor_source/images/',
							'"' . DAOFACTORY_URL . 'vendor_source/static/media/',
							'"' . DAOFACTORY_URL . 'vendor_source/locales/'
						),
						$source
					);
					file_put_contents( $cache_dir . $filename, $modified );
					chmod( $cache_dir . $filename, 0777 );
				}
			}
		}
	}
}

/**
 * Enqueue admin scripts and styles
 */
function daofactory_admin_enqueue_scripts() {
	wp_enqueue_media();
	wp_enqueue_script(
		"daofactory-admin",
		esc_url( plugins_url( '/assets/js/admin.js', DAOFACTORY_BASE_FILE ) ),
		array( "jquery" ),
		DAOFACTORY_VER,
		true
	);
	wp_enqueue_style(
		"daofactory-admin",
		esc_url( plugins_url( '/assets/css/admin.css', DAOFACTORY_BASE_FILE ) ),
		array(),
		DAOFACTORY_VER
	);
}
add_action( 'admin_enqueue_scripts', 'daofactory_admin_enqueue_scripts', 500 );

/**
 * Load the plugin text domain for translation
 */
function daofactory_load_plugin_textdomain() {
	load_plugin_textdomain( 'daofactory', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action( 'plugins_loaded', 'daofactory_load_plugin_textdomain' );

/**
 * Plugin activation hook
 */
function daofactory_activate() {
	daofactory_add_rewrite_rules();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'daofactory_activate' );

/**
 * Plugin deactivation hook
 */
function daofactory_deactivate() {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'daofactory_deactivate' );
