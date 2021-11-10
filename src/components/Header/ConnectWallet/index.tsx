import { useNavigate } from "react-router-dom";

import "./index.scss";

function ConnectWallet() {
  const navigate = useNavigate();

  return (
    <div className="connect-wallet">
      <button
        className="connect-wallet__button button"
        onClick={() => navigate(`/account`)}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWallet;
