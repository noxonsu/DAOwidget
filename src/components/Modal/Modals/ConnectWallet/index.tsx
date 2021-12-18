import { useNavigate } from "react-router-dom";
import { useActiveWeb3React } from "src/hooks/useWeb3Connect";
import { shortEVMAddress } from "src/helpers/utils";

function ConnectWallet() {
  const { account } = useActiveWeb3React();
  const navigate = useNavigate();

  return (
    <button
      className="secondaryButton"
      onClick={() => navigate(`/account`)}
      style={{width: "auto"}}
    >
      {account ? shortEVMAddress(account) : "Connect Wallet"}
    </button>
  );
}

export default ConnectWallet;
