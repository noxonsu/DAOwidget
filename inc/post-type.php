<?php
/**
 * Post Type
 *
 * @package Dao Factory
 */

/**
 * Register Post Type daofactory
 */
function daofactory_post_type() {

	$labels = array(
		'name'                  => esc_html__( 'Dao Factory', 'daofactory' ),
		'singular_name'         => esc_html__( 'Dao Factory', 'daofactory' ),
		'menu_name'             => esc_html__( 'Dao Factory', 'daofactory' ),
		'name_admin_bar'        => esc_html__( 'Dao Factory', 'daofactory' ),
		'all_items'             => esc_html__( 'All DAOs', 'daofactory' ),
		'add_new_item'          => esc_html__( 'Add New Dao', 'daofactory' ),
		'add_new'               => esc_html__( 'Add New', 'daofactory' ),
		'new_item'              => esc_html__( 'New Dao Factory', 'daofactory' ),
		'edit_item'             => esc_html__( 'Edit Dao Factory', 'daofactory' ),
    'view_item'             => esc_html__( 'View Dao Factory', 'daofactory' ),
		'update_item'           => esc_html__( 'Update Dao Factory', 'daofactory' ),
		'search_items'          => esc_html__( 'Search Dao Factory', 'daofactory' ),
		'not_found'             => esc_html__( 'Not found', 'daofactory' ),
		'not_found_in_trash'    => esc_html__( 'Not found in Trash', 'daofactory' ),
	);
	$args   = array(
		'labels'             => $labels,
		'supports'           => array( 'title' ),
		'hierarchical'       => false,
		'public'             => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_admin_bar'  => false,
		'show_in_nav_menus'  => false,
		'can_export'         => true,
		'publicly_queryable' => true,
		'capability_type'    => 'post',
		'menu_icon'          => 'dashicons-admin-site-alt3',
	);
	register_post_type( 'daofactory', $args );
  flush_rewrite_rules( false );
}
add_action( 'init', 'daofactory_post_type' );

function daofactory_custom_template($single) {
    global $post;


    if ( $post->post_type == 'daofactory' ) {
      return DAOFACTORY_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'post-template.php';
    }

    return $single;
}

add_filter('single_template', 'daofactory_custom_template');

function daofactory_frontpage_template($template) {
  if (is_front_page()) {
    $dao_at_homepage = get_option( 'daofactory_id_at_homepage', 'false');

    if (($dao_at_homepage !== 'false') and is_numeric($dao_at_homepage)) {
      return DAOFACTORY_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'homepage.php';
    }
  }
  return $template;
}
add_filter('frontpage_template', 'daofactory_frontpage_template');
/**
 * Remove date from posts column
 *
 * @param array $columns Columns.
 */
function daofactory_remove_date_column( $columns ) {
	unset( $columns['date'] );
	return $columns;
}
add_filter( 'manage_daofactory_posts_columns', 'daofactory_remove_date_column' );

/**
 * Remove quick edit
 *
 * @param array  $actions Actions.
 * @param object $post Post.
 */
function daofactory_remove_quick_edit( $actions, $post ) {
	if ( 'daofactory' === $post->post_type ) {
		unset( $actions['inline hide-if-no-js'] );
	}
	return $actions;
}
add_filter( 'post_row_actions', 'daofactory_remove_quick_edit', 10, 2 );
