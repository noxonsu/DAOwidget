<?php
function daofactory_get_data($dao_id) {
  $daoinfo = array();
  foreach( array(
    'blockchain'        => 'matic_testnet',
    'token'             => '',
    'token_name'        => '',
    'token_symbol'      => '',
    'token_decimals'    => '',
    'hide_footer_header'=> 'true',
    'theme'             => 'light'
  ) as $key => $default) {
    $data = get_post_meta( $dao_id, $key, true);
    if ( empty( $data ) ) $data = $default;
    $daoinfo[ $key ] = $data;
  }
  return $daoinfo;
}


function daofactory_custom_template($single) {
    global $post;


    if ( $post->post_type == 'daofactory' ) {
      return DAOFACTORY_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'post-template.php';
    }
    return $single;
}

add_filter('single_template', 'daofactory_custom_template');

function daofactory_blockchains() {
  return array(
    'bsc_testnet' => array(
      'chainId'   => 97,
      'rpc'       => 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'title'     => 'Binance Block Chain (ERC20) - Testnet',
      'etherscan' => 'https://testnet.bscscan.com'
    ),
    'bsc_mainnet' => array(
      'chainId'   => 56,
      'rpc'       => 'https://bsc-dataseed.binance.org/',
      'title'     => 'Binance Smart Chain (ERC20)',
      'etherscan' => 'https://bscscan.com'
    ),
    'matic_testnet' => array(
      'chainId'   => 80001,
      'rpc'       => 'https://rpc-mumbai.maticvigil.com',
      'title'     => 'Polygon Matic - Testnet (mumbai)',
      'etherscan' => 'https://mumbai.polygonscan.com'
    ),
    'matic_mainnet' => array(
      'chainId'   => 137,
      'rpc'       => 'https://rpc-mainnet.maticvigil.com',
      'title'     => 'Polygon Matic',
      'etherscan' => 'https://polygonscan.com'
    ),
    'eth_rinkeby'   => array(
      'chainId'   => 4,
      'rpc'       => 'https://rinkeby.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
      'title'     => 'Ethereum - Testnet (Rinkeby)',
      'etherscan' => 'https://rinkeby.etherscan.io'
    ),
    'eth_mainnet'   => array(
      'chainId'   => 1,
      'rpc'       => 'https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
      'title'     => 'Ethereum',
      'etherscan' => 'https://etherscan.io'
    ),
    'arbeth_testnet' => array(
      'chainId'   => 421611,
      'rpc'       => 'https://rinkeby.arbitrum.io/rpc',
      'title'     => 'Arbitrum Testnet (Rinkeby)',
      'etherscan' => 'https://testnet.arbiscan.io'
    ),
    'arbeth_mainnet' => array(
      'chainId'   => 42161,
      'rpc'       => 'https://arb1.arbitrum.io/rpc',
      'title'     => 'Arbitrum',
      'etherscan' => 'https://arbiscan.io'
    ),
    'xdai_testnet' => array(
      'chainId'   => 77,
      'rpc'       => 'https://sokol.poa.network',
      'title'     => 'DAI Testnet (Sokol)',
      'etherscan' => 'https://blockscout.com/poa/sokol'
    ),
    'xdai_mainnet' => array(
      'chainId'   => 100,
      'rpc'       => 'https://rpc.xdaichain.com/',
      'title'     => 'DAI Mainnet (Gnosis)',
      'etherscan' => 'https://blockscout.com/xdai/mainnet'
    )
  );
}

function daofactory_admin_scripts( $hook ) {

	global $typenow;

	if ( 'post-new.php' === $hook || 'post.php' === $hook || 'toplevel_page_DAOFACTORY' === $hook ) {
		if ( 'toplevel_page_DAOFACTORY' === $hook || 'daofactory' === $typenow ) {

			wp_enqueue_style( 'daofactory-admin', DAOFACTORY_URL . 'assets/css/daofactory-admin.css', false, DAOFACTORY_VER );
      wp_enqueue_script( 'daofactory-tokeninfo', DAOFACTORY_URL . 'assets/js/tokenInfo.js', array(), DAOFACTORY_VER );

			$ver = wp_rand( 1, 2222222 );

			//wp_enqueue_script( 'lotteryfactory-deployer', LOTTERYFACTORY_URL . 'lib/lotterydeployer.js', array(), $ver, true );

			//wp_enqueue_script( 'lotteryfactory-admin', LOTTERYFACTORY_URL . 'assets/js/lotteryfactory-admin.js', array( 'lotteryfactory-deployer' ), $ver, true );

			//$post_type_object = get_post_type_object( $typenow );

      wp_localize_script('daofactory-admin', 'daofactory',
        array(
          'ajaxurl' => admin_url( 'admin-ajax.php' ),
          'nonce'   => wp_create_nonce( 'daofactory-nonce' ),
        )
      );
		}
	}

}
add_action( 'admin_enqueue_scripts', 'daofactory_admin_scripts' );


function daofactory_default_header() {
  ?>
  <!DOCTYPE html>
  <html class="no-js" <?php language_attributes(); ?>>
    <head>
      <meta charset="<?php bloginfo( 'charset' ); ?>">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" >
      <link rel="profile" href="https://gmpg.org/xfn/11">
      <title><?php echo wp_get_document_title(); ?></title>
      <?php
        if (function_exists( 'wp_robots_sensitive_page' )) {
          // wp_robots_sensitive_page(); // @To-Do need params
        } else {
          wp_sensitive_page_meta();
        }
      ?>
      <style type="text/css">
        HTML, BODY {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
  <?php
}

function daofactory_default_footer() {
  ?>
      <link media="all" rel="stylesheet" href="<?php echo DAOFACTORY_URL ?>build/static/css/main.css?ver=<?php echo DAOFACTORY_VER?>" />
      <script src="<?php echo DAOFACTORY_URL ?>build/static/js/main.js?ver=<?php echo DAOFACTORY_VER?>"></script>
    </body>
  </html>
  <?php
}
?>