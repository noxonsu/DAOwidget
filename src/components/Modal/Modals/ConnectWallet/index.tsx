import { useContext, useEffect } from "react";
import { shortEVMAddress } from "src/helpers/utils";
import { useActiveWeb3React } from "src/hooks/useWeb3Connect";
import { ModalUpdaterContext } from "src/components/WithModal";
import Providers from "./Providers";
import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import ExternalLink from "src/components/ExternalLink";
import { switchNetworkByChainId } from "src/helpers/utils/web3";

import { translate } from "src/utils/translate"

function ConnectWallet() {
  const { account, deactivate, chainId, library } = useActiveWeb3React();

  const setModalOptions = useContext(ModalUpdaterContext);

  const connectWalletModalProps = {
    headerContent: translate("wallet_connect", "Connect wallet"),
    bodyContent: (
      <Providers closeModal={() => setModalOptions({ isOpen: false })} />
    ),
    footerContent: "",
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  const disconectButton = (
    <div
      style={{
        display: "flex",
        padding: "1rem",
      }}
    >
      <button
        className="secondaryButton"
        onClick={() => {
          deactivate();
          setModalOptions({ isOpen: false });
        }}
      >
        {translate('wallet_disconnect', 'Disconnect')}
      </button>
    </div>
  );

  useEffect(() => {
    const isMetamask = !!library?.library?.provider?.isMetaMask;
    const windowChainId = window.NETWORK_ID && parseInt(window.NETWORK_ID)

    if (isMetamask && chainId !== windowChainId) {
      switchNetworkByChainId(windowChainId);
    }

  }, [chainId, account, library])

  const networkId = (chainId || 1) as SupportedChainId;

  const accountContent = (
    <div
      style={{
        display: "flex",
        padding: "1rem",
      }}
    >
      <span style={{ marginRight: "0.5rem" }}>
        {translate('wallet_account_text', 'Account')}
      </span>
      <ExternalLink
        link={`${NETWORK_EXPLORER_URLS[networkId]}address/${account}`}
        children={shortEVMAddress(account || "")}
      />
    </div>
  );

  const accountModalProps = {
    headerContent: translate("wallet_account", "Account"),
    bodyContent: accountContent,
    footerContent: disconectButton,
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  return (
    <button
      id="connect-button"
      className="secondaryButton"
      onClick={() =>
        setModalOptions({
          isOpen: true,
          modalProps: account ? accountModalProps : connectWalletModalProps,
        })
      }
      style={{ width: "auto" }}
    >
      {account ? shortEVMAddress(account) : translate('wallet_connect', "Connect Wallet")}
    </button>
  );
}

export default ConnectWallet;
