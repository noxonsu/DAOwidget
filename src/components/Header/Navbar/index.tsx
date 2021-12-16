import { NavLink } from "react-router-dom";

import "./index.scss";

function Navbar() {
  const getClassNames = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? "active" : ""}`;

  return (
    <div className="navbar">
      <NavLink className={getClassNames} id={`proposals-nav-link`} to={"/"}>
        Proposals
      </NavLink>
      <NavLink className={getClassNames} id={`about-nav-link`} to={"/about"}>
        About
      </NavLink>
      <NavLink
        className={getClassNames}
        id={`create-proposal-nav-link`}
        to={"/proposal/create"}
      >
        New proposal
      </NavLink>
    </div>
  );
}

export default Navbar;
