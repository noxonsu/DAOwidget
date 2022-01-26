/**
 * Admin Scripts
 */
(function( $ ){
	"use strict";

  var loaderStatusText = document.getElementById('daofactory_loaderStatus')
  var loaderOverlay   = document.getElementById('daofactory_loaderOverlay')
  var fetchTokenButton = document.getElementById('daofactory_fetchtoken_button')

  var getValue = (id) => { return document.getElementById(id).value }
  var setValue = (id, value) => { document.getElementById(id).value = value }
  var setHtml = (id, value) => { document.getElementById(id).innerHTML = value }
  var showBlock = (id) => { document.getElementById(id).style.display = '' }
  var hideBlock = (id) => { document.getElementById(id).style.display = 'none' }
  var showLoader = () => {
    loaderStatusText.innerText = ''
    loaderOverlay.classList.add('visible')
  }
  var setLoaderStatus = (message) => {
    loaderStatusText.innerText = message
  }
  var hideLoader = () => { loaderOverlay.classList.remove('visible') }

  var showNotice = ( text, status = 'success' ) => {
    const noticeEl = $('.daofactory-notice');
		noticeEl.find('p').text( text );
		noticeEl.addClass('notice-' + status ).fadeIn();
		setTimeout(function(){
			noticeEl.fadeOut(function(){
				noticeEl.removeClass('notice-' . status );
				noticeEl.removeClass('notice-success notice-error');
			});
		},6000);
	}

  const langMsg = (msg, replaces = {}) => {
    Object.keys(replaces).forEach((key) => {
      msg = msg.replaceAll(`{${key}}`, escape(replaces[key]))
    })
    return msg
  }

  var errMessage = (message) => { alert(message) }

  $( fetchTokenButton ).on('click', function (e) {
    e.preventDefault()
    const unlockButton = () => {
      fetchTokenButton.disabled = false
      hideLoader()
    }
    const tokenAddress = $('#dao_token').val()
    if (!window.Web3.utils.isAddress(tokenAddress)) {
      return errMessage( langMsg( 'Token address not correct') )
    }
    showLoader()
    setLoaderStatus( langMsg( 'Fetching token info' ) )
    fetchTokenButton.disabled = true
    hideBlock('dao_token_info')
    const networkOption = $('#dao_blockchain OPTION:selected')
    const rpc = networkOption.data('rpc')
    const chainId = networkOption.data('chain')
    daoFactory_fetchTokenInfo( { rpc, chainId }, tokenAddress )
      .then((tokenInfo) => {
        setHtml('dao_token_name_view', tokenInfo.name)
        setValue('dao_token_name', tokenInfo.name)
        setHtml('dao_token_symbol_view', tokenInfo.symbol)
        setValue('dao_token_symbol', tokenInfo.symbol)
        setHtml('dao_token_decimals_view', tokenInfo.decimals)
        setValue('dao_token_decimals', tokenInfo.decimals)
        unlockButton()
        showBlock('dao_token_info')
        showNotice( langMsg( 'Token info fetched' ) )
      })
      .catch((err) => {
        unlockButton()
        if (err === 'wrong network') {
          errMessage( 'Select correct network: ' + networkOption.text() )
        } else {
          errMessage(err.message)
        }
      })
  })
})( jQuery );
