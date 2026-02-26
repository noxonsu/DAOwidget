<?php

namespace DAOFactory\Controllers;

/**
 * AutoUpdateController
 *
 * Handles automatic plugin updates from a custom update server.
 * Compatible with CodeCanyon API or custom info.json endpoint.
 *
 * Based on the update mechanism used in definance and farmfactory plugins.
 */
class AutoUpdateController {

	/**
	 * URL to check for plugin updates (JSON endpoint)
	 * Format: https://example.com/info.json
	 * Or: https://api.codecanyon.net/v1/...
	 */
	const INFO_URL = 'https://onout.org/api/daofactory/info.json';

	/**
	 * Plugin slug (must match the plugin directory name)
	 */
	const PLUGIN_SLUG = 'daofactory-plugin';

	/**
	 * Transient key for caching update information
	 */
	const TRANSIENT_SLUG = 'daofactory_upgrade_plugin';

	/**
	 * Constructor - Register WordPress hooks
	 */
	public function __construct() {
		add_action( 'plugins_api', function( $res, $action, $args ) {
			return $this->setUpdateInfo( $res, $action, $args );
		}, 200, 3 );
		add_filter( 'site_transient_update_plugins', [ $this, 'pushUpdate' ] );
		add_filter( 'transient_update_plugins', [ $this, 'pushUpdate' ] );
		add_action( 'upgrader_process_complete', [ $this, 'afterUpdate' ], 10, 2 );
		add_action( 'current_screen', [ $this, 'updateForceCheck' ] );
	}

	/**
	 * Set plugin information for the update modal
	 *
	 * @param mixed $res     The result object or array. Default false.
	 * @param string $action The type of information being requested from the Plugin Installation API.
	 * @param object $args   Plugin API arguments.
	 *
	 * @return false|\stdClass
	 */
	public function setUpdateInfo( $res, $action, $args ) {

		// Return false if this is not about getting plugin information
		if ( 'plugin_information' !== $action ) {
			return false;
		}

		// Return false if it is not our plugin
		if ( self::PLUGIN_SLUG !== $args->slug ) {
			return false;
		}

		// Try to get from cache first
		if ( false == $remote = get_transient( self::TRANSIENT_SLUG ) ) {

			// info.json is the file with the actual plugin information on your server
			$remote = wp_remote_get( self::INFO_URL, array(
				'timeout' => 10,
				'headers' => array(
					'Accept' => 'application/json',
				),
			) );

			if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty( $remote['body'] ) ) {
				set_transient( self::TRANSIENT_SLUG, $remote, HOUR_IN_SECONDS );
			}

		}

		if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty( $remote['body'] ) ) {

			$remote = json_decode( $remote['body'] );

			$res = new \stdClass();

			$res->name           = $remote->name;
			$res->slug           = self::PLUGIN_SLUG;
			$res->version        = $remote->version;
			$res->tested         = $remote->tested;
			$res->requires       = $remote->requires;
			$res->author         = 'NoxonThemes';
			$res->author_profile = 'https://onout.org';
			$res->download_link  = $remote->download_url;
			$res->trunk          = $remote->download_url;
			$res->requires_php   = $remote->requires_php;
			$res->last_updated   = $remote->last_updated;
			$res->sections       = array(
				'description'  => $remote->sections->description,
				'installation' => $remote->sections->installation,
				'changelog'    => $remote->sections->changelog,
			);

			// Add screenshots if available
			// Format: <ol><li><a href="IMG_URL" target="_blank"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
			if ( ! empty( $remote->sections->screenshots ) ) {
				$res->sections['screenshots'] = $remote->sections->screenshots;
			}

			return $res;

		}

		return false;
	}

	/**
	 * Push update notification to WordPress
	 *
	 * @param object $transient Update transient object
	 *
	 * @return mixed
	 */
	public function pushUpdate( $transient ) {

		if ( empty( $transient->checked ) ) {
			return $transient;
		}

		// Try to get from cache first, to disable cache comment lines 10-24
		if ( false == $remote = get_transient( self::TRANSIENT_SLUG ) ) {

			// info.json is the file with the actual plugin information on your server
			$remote = wp_remote_get( self::INFO_URL,
				array(
					'timeout' => 10,
					'headers' => array(
						'Accept' => 'application/json',
					),
				)
			);

			if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty( $remote['body'] ) ) {
				set_transient( self::TRANSIENT_SLUG, $remote, 43200 ); // 12 hours cache
			}
		}

		if ( $remote ) {

			$remote = json_decode( $remote['body'] );

			// Compare installed version with remote version
			if ( $remote && version_compare( DAOFACTORY_VER, $remote->version, '<' ) && version_compare( $remote->requires, get_bloginfo( 'version' ), '<' ) ) {
				$res                               = new \stdClass();
				$res->slug                         = self::PLUGIN_SLUG;
				$res->plugin                       = self::PLUGIN_SLUG . '/' . self::PLUGIN_SLUG . '.php';
				$res->new_version                  = $remote->version;
				$res->tested                       = $remote->tested;
				$res->package                      = $remote->download_url;
				$transient->response[ $res->plugin ] = $res;

			}
		}
		return $transient;
	}

	/**
	 * Clear cache after plugin update
	 *
	 * @param object $upgrader_object Upgrader object instance
	 * @param array  $options         Array of update data
	 */
	public function afterUpdate( $upgrader_object, $options ) {
		if ( $options['action'] == 'update' && $options['type'] === 'plugin' ) {
			// Clean the cache when new plugin version is installed
			delete_transient( self::TRANSIENT_SLUG );
		}
	}

	/**
	 * Force check for updates when user clicks "Check Again"
	 */
	public function updateForceCheck() {
		if ( ! isset( $_GET['force-check'] ) ) {
			return;
		}
		$current_screen = get_current_screen();
		if ( 'update-core' === $current_screen->id ) {
			delete_transient( self::TRANSIENT_SLUG );
		}
	}
}
