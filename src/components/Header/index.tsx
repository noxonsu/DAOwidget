import Navbar from "../Navbar";

import "./index.css";

function Header() {
  return (
    <section className="header">
      <section className="header__logo">
        <a href="/">
          <img
            src="https://wallet.wpmix.net/wp-content/uploads/2020/07/yourlogohere.png"
            className="header-logo"
            alt="logo"
          />
        </a>
      </section>
      <Navbar />
    </section>
  );
}

export default Header;
