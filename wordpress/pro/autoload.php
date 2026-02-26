<?php
defined( 'ABSPATH' ) || exit;

/**
 * PSR-4 Autoloader for DAO Factory
 *
 * Automatically loads classes from the DAOFactory namespace.
 */
spl_autoload_register( function ( $class ) {

	if ( strpos( $class, 'DAOFactory' ) !== false ) {
		require __DIR__ . '/../' . str_replace( [ '\\', 'DAOFactory' ], [ '/', 'pro' ], $class ) . '.php';
	}
} );

/**
 * Auto-instantiate all controllers
 *
 * This will automatically create instances of all controller classes
 * found in the Controllers directory.
 */
foreach ( glob( __DIR__ . '/Controllers/*.php' ) as $file ) {
	$class = '\\DAOFactory\Controllers\\' . basename( $file, '.php' );
	if ( class_exists( $class ) ) {
		$obj = new $class;
	}
}
