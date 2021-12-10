import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import ConnectWallet from "./ConnectWallet";

import "./index.scss";

function Header() {
  return (
    <div className="header">
      {/* <div className="header__logo">
        <Link to={`/`}>
          <img
            src="https://wallet.wpmix.net/wp-content/uploads/2020/07/yourlogohere.png"
            className="header-logo"
            alt="logo"
          />
        </Link>
      </div> */}
      <Navbar />
      <ConnectWallet />
    </div>
  );
}

export default Header;
