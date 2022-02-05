<?php
  $daoinfo = daofactory_get_data(get_the_ID());

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_default_header($daoinfo);
  } else {
    get_header();
  }

  wp_enqueue_script("daofactory-app", DAOFACTORY_VER, true);
  wp_enqueue_style("daofactory-app");

  $html = '
    <div
      id="daofactory_app"
      data-ens="' . esc_attr('onout.eth') . '"
      data-network="' . esc_attr(daofactory_blockchains()[$daoinfo['blockchain']]['chainId']) . '"
      data-token-address="' . esc_attr($daoinfo['token']) . '"
      data-token-symbol="' . esc_attr($daoinfo['token_symbol']) . '"
      data-token-decimals="' . esc_attr($daoinfo['token_decimals']) . '"
      data-color-template="' . esc_attr($daoinfo['theme']) . '_template"
      data-hide-service-link="' . esc_attr($daoinfo['hide_service_link']) . '"
    ></div>
  ';
  echo $html;

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_default_footer($daoinfo);
  } else {
    get_footer();
  }
?>