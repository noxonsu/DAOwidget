import { useNavigate } from "react-router-dom";
import { useActiveWeb3React } from "src/hooks/useWeb3Connect";
import { shortEVMAddress } from "src/helpers/utils";

import "./index.scss";

function ConnectWallet() {
  const { account } = useActiveWeb3React();
  const navigate = useNavigate();

  return (
    <div className="connect-wallet">
      <button
        className="connect-wallet__button"
        onClick={() => navigate(`/account`)}
      >
        {account ? shortEVMAddress(account) : "Connect Wallet"}
      </button>
    </div>
  );
}

export default ConnectWallet;
