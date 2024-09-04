import { NavLink } from "react-router-dom";

import "./index.scss";
import { translate } from "src/utils/translate"

function Navbar() {
  const getClassNames = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? "active" : ""}`;

  return (
    <div className="navbar">
      <NavLink className={getClassNames} id={`proposals-nav-link`} to={"/"}>
        {translate('navbar_proposals', 'Proposals')}
      </NavLink>
      {/* <NavLink className={getClassNames} id={`about-nav-link`} to={"/about"}>
        About
      </NavLink> */}
      <NavLink
        className={getClassNames}
        id={`create-proposal-nav-link`}
        to={"/proposal/create"}
      >
        {translate('navbar_newproposal', 'New proposal')}
      </NavLink>
    </div>
  );
}

export default Navbar;
