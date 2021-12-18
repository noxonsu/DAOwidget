import { useContext } from "react";
import { shortEVMAddress } from "src/helpers/utils";
import { useActiveWeb3React } from "src/hooks/useWeb3Connect";
import { ModalUpdaterContext } from "src/components/WithModal";
import Providers from "./Providers";
import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import ExternalLink from "src/components/ExternalLink";

function ConnectWallet() {
  const { account, deactivate, chainId } = useActiveWeb3React();

  const setModalOptions = useContext(ModalUpdaterContext);

  const connectWalletModalProps = {
    headerContent: "Connect wallet",
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
        Disconnect
      </button>
    </div>
  );

  const networkId = (chainId || 1) as SupportedChainId;

  const accountContent = (
    <div
      style={{
        display: "flex",
        padding: "1rem",
      }}
    >
      <span style={{ marginRight: "0.5rem" }}>Account</span>
      <ExternalLink
        link={`${NETWORK_EXPLORER_URLS[networkId]}address/${account}`}
        children={shortEVMAddress(account || '')}
      />
    </div>
  );

  const accountModalProps = {
    headerContent: "Account",
    bodyContent: accountContent,
    footerContent: disconectButton,
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  return (
    <button
      className="secondaryButton"
      onClick={() =>
        setModalOptions({
          isOpen: true,
          modalProps: account ? accountModalProps : connectWalletModalProps,
        })
      }
      style={{ width: "auto" }}
    >
      {account ? shortEVMAddress(account) : "Connect Wallet"}
    </button>
  );
}

export default ConnectWallet;
