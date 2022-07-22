<?php
/**
 * MetaBoxes
 *
 * @package Lottery Factory
 */

/**
 * Adds a meta box to post type daofactory
 */
class DaoFactory_Meta_Box {

	/**
	 * Construct
	 */
	public function __construct() {
		if ( is_admin() ) {
			add_action( 'load-post.php', array( $this, 'init_metabox' ) );
			add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );
		}

	}

	/**
	 * Init Metabox
	 */
	public function init_metabox() {

		add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
		add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

	}

	/**
	 * Add Metabox
	 */
	public function add_metabox() {
		add_meta_box(
			'daofactory_meta',
			esc_html__( 'Dao Factory Details', 'daofactory' ),
			array( $this, 'render_metabox' ),
			'daofactory',
			'normal',
			'high'
		);
	}

	/**
	 * Render Metabox
	 *
	 * @param object $post Post.
	 */
	public function render_metabox( $post ) {

		/* Add nonce for security and authentication */
		wp_nonce_field( 'daofactory_meta_action', 'daofactory_meta_nonce' );

    $daoinfo = daofactory_get_data($post->ID);
    $daoinfo_at_homepage = get_option( 'daofactory_id_at_homepage', 'false');
    
		// Form fields.
    ?>
    <input type="hidden" id="daofactory_post_id" value="<?php echo $post->ID?>" />
    <table class="form-table">
      <tr>
        <th><label><?php echo esc_html__( 'As home page', 'daofactory' ); ?></label></th>
        <td>
          <input type="checkbox" name="dao_at_homepage" id="dao_at_homepage" <?php echo ($daoinfo_at_homepage == $post->ID) ? 'checked' : ''?>/>
          <label for="dao_at_homepage"><?php echo esc_html__( 'Show this DAO at home page' ); ?></label>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Design', 'daofactory' );?></label></th>
        <td>
          <input type="checkbox" name="dao_hide_footer_header" id="dao_hide_footer_header" <?php echo ($daoinfo['hide_footer_header'] === 'true') ? 'checked' : ''?> />
          <label for="dao_hide_footer_header"><?php echo esc_html__( 'Hide WP footer and header', 'daofactory' ); ?></label>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Hide service link', 'daofactory' ); ?></label></th>
        <td>
          <input type="checkbox" name="dao_hide_service_link" id="dao_hide_service_link" <?php echo ($daoinfo['hide_service_link'] === 'true') ? 'checked' : ''?>/>
          <label for="dao_hide_service_link"><?php echo esc_html__( 'Hide service link on DAO page', 'daofactory' ); ?></label>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Theme', 'daofactory' );?></label></th>
        <td>
          <select name="dao_theme" id="dao_theme" value="<?php echo $daoinfo['theme']?>">
            <option value="light" <?php echo ('light' === $daoinfo['theme']) ? 'selected' : ''?>><?php echo esc_html__('Light', 'daofactory'); ?></option>
            <option value="dark" <?php echo ('dark' === $daoinfo['theme']) ? 'selected' : ''?>><?php echo esc_html__('dark', 'daofactory'); ?></option>
          </select>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Blockchain', 'daofactory' ); ?></label></th>
        <td>
          <select name="dao_blockchain" id="dao_blockchain" value="<?php echo $daoinfo['blockchain']?>">
            <?php
            foreach ( daofactory_blockchains() as $key => $value) {
              ?>
              <option data-chain="<?php echo $value['chainId']?>" data-rpc="<?php echo esc_attr($value['rpc'])?>" value="<?php echo $key?>" <?php echo ($key === $daoinfo['blockchain']) ? 'selected' : ''?>>
                <?php echo esc_html__($value['title'], 'daofactory');?>
              </option>
              <?php
            }
            ?>
          </select>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Dao token Address', 'daofactory' ); ?></label></th>
        <td>
          <div class="daofactory-form-inline">
            <input type="text" name="dao_token" id="dao_token" class="large-text" value="<?php echo $daoinfo['token']?>">
            <a class="button button-secondary" id="daofactory_fetchtoken_button">
              <?php echo esc_html__( 'Fetch', 'daofactory' ) ?>
            </a>
          </div>
          <p class="description">
          <?php
            echo sprintf( esc_html__( 'ERC20 address of token&#039;s contract which users will be used. Press Fetch for get info about token. Free test tokens %s.', 'daofactory' ), '<a href="https://github.com/bokkypoobah/WeenusTokenFaucet" target="_blank">https://github.com/bokkypoobah/WeenusTokenFaucet</a>' );
          ?>
          </p>
        </td>
      </tr>
      <tbody id="dao_token_info" <?php if (!$daoinfo['token_symbol']) echo ' style="display: none" '; ?>>
        <tr>
          <th><label><?php echo esc_html__( 'Token name', ' daofactory' ); ?></label></th>
          <td>
            <strong id="dao_token_name_view"><?php echo esc_html__( $daoinfo['token_name'] )?></strong>
            <input type="hidden" name="dao_token_name" id="dao_token_name" class="large-text" value="<?php echo esc_attr( $daoinfo['token_name'] ) ?>" />
          </td>
        </tr>
        <tr>
          <th><label><?php echo esc_html__( 'Token symbol', ' daofactory' ); ?></label></th>
          <td>
            <strong id="dao_token_symbol_view"><?php echo esc_html__( $daoinfo['token_symbol'] )?></strong>
            <input type="hidden" name="dao_token_symbol" id="dao_token_symbol" class="large-text" value="<?php echo esc_attr( $daoinfo['token_symbol'] ) ?>" />
          </td>
        </tr>
        <tr>
          <th><label><?php echo esc_html__( 'Token decimals', ' daofactory' ); ?></label></th>
          <td>
            <strong id="dao_token_decimals_view"><?php echo esc_html__( $daoinfo['token_decimals'] )?></strong>
            <input type="hidden" name="dao_token_decimals" id="dao_token_decimals" class="large-text" value="<?php echo esc_attr( $daoinfo['token_decimals'] ) ?>" />
          </td>
        </tr>
      </tbody>
      <tr>
        <th><label><?php echo esc_html__( 'Required tokens amount to Publish', 'daofactory' ); ?></label></th>
        <td>
          <div class="daofactory-form-inline">
            <input type="text" name="dao_required_amount_to_publish" id="dao_required_amount_to_publish" class="small-text" value="<?php echo esc_attr( $daoinfo['required_amount_to_publish'] ) ?>">
          </div>
        </td>
      </tr>
      <tr>
        <th><label><?php echo esc_html__( 'Required tokens amount to Vote', 'daofactory' ); ?></label></th>
        <td>
          <div class="daofactory-form-inline">
            <input type="text" name="dao_required_amount_to_vote" id="dao_required_amount_to_vote" class="small-text" value="<?php echo esc_attr( $daoinfo['required_amount_to_vote'] ) ?>">
          </div>
        </td>
      </tr>
    </table>
    <div id="daofactory_loaderOverlay" class="daofactory-overlay">
			<div class="daofactory-loader"></div>
      <div class="daofactory-loader-status" id="daofactory_loaderStatus">Loading...</div>
		</div>
    <div class="notice daofactory-notice hide-all"><p></p></div>
    <?php
	}

	public function save_metabox( $post_id, $post ) {
		$nonce_name   = isset( $_POST['daofactory_meta_nonce'] ) ? $_POST['daofactory_meta_nonce'] : '';
		$nonce_action = 'daofactory_meta_action';

		if ( ! isset( $nonce_name ) ) {
			return;
		}

		if ( ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( wp_is_post_autosave( $post_id ) ) {
			return;
		}


    $post_meta_keys = array(
      'blockchain'        => 'dao_blockchain',
      'token'             => 'dao_token',
      'token_name'        => 'dao_token_name',
      'token_symbol'      => 'dao_token_symbol',
      'token_decimals'    => 'dao_token_decimals',
      'theme'             => 'dao_theme',
      'required_amount_to_publish' => 'dao_required_amount_to_publish',
      'required_amount_to_vote' => 'dao_required_amount_to_vote',
    );
    $post_meta_checkboxs = array(
      'hide_footer_header'=> 'dao_hide_footer_header',
      'hide_service_link'=> 'dao_hide_service_link'
    );
    $post_meta_values = array();
    foreach( $post_meta_keys as $metaKey => $postKey) {
      $postValue = isset( $_POST[ $postKey ] ) ? sanitize_text_field( $_POST[ $postKey ] ) : '';
      update_post_meta( $post_id, $metaKey, $postValue );
    }
    foreach( $post_meta_checkboxs as $metaKey => $postKey) {
      $postValue = (isset( $_POST[ $postKey ] ) && ( $_POST[ $postKey ] == 'on' )) ? 'true' : 'false';
      update_post_meta( $post_id, $metaKey, $postValue );
    }
    // DAO at home page
    $current_dao_at_homepage = get_option( 'daofactory_id_at_homepage', 'false');
    $set_this_at_homepage = ( isset( $_POST['dao_at_homepage'] ) and ($_POST[ 'dao_at_homepage' ] == 'on' )) ? true : false;

    if (!$set_this_at_homepage and ($current_dao_at_homepage !== 'false') and (intval($current_dao_at_homepage) == $post_id)) {
      delete_option('daofactory_id_at_homepage');
    } else if ($set_this_at_homepage) {
      update_option('daofactory_id_at_homepage', $post_id);
    }
	}

}

new daofactory_Meta_Box;

/**
 * Shortcode
 */

function daofactory_post_submitbox( $post ) {
	if ( 'daofactory' === $post->post_type ) {
		?>
		<div class="misc-pub-section">
			<p class="description"><strong><?php esc_html_e( 'Shortcode', 'daofactory' ); ?><strong></p>
			<input type="text" class="large-text daofactory-schortcode-copy" value='[daofactory id="<?php echo esc_attr( $post->ID ); ?>"]' readonly>
			<div class="copy-to-clipboard-container">
				<button type="button" class="button button-small copy-farm-shortcode" data-clipboard-target=".daofactory-schortcode-copy"><?php esc_html_e( 'Copy Shortcode to clipboard', 'daofactory' ); ?></button>
				<span class="success hidden" aria-hidden="true"><?php esc_html_e( 'Copied!', 'daofactory' ); ?></span>
			</div>
		</div>
		<?php
	}
}
add_action( 'post_submitbox_misc_actions', 'daofactory_post_submitbox' );
