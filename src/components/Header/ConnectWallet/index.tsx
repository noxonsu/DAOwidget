import { useHistory } from "react-router-dom";
import "./index.css";

function ConnectWallet() {
  const history = useHistory();

  return (
    <div className="connect-wallet">
      <button
        className="connect-wallet__button button"
        onClick={() => history.push(`/account`)}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWallet;
