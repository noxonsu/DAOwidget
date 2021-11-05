import Navbar from "./Navbar";
import ConnectWallet from "./ConnectWallet";

import "./index.css";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <a href="/">
          <img
            src="https://wallet.wpmix.net/wp-content/uploads/2020/07/yourlogohere.png"
            className="header-logo"
            alt="logo"
          />
        </a>
      </div>
      <Navbar />
      <ConnectWallet />
    </div>
  );
}

export default Header;
