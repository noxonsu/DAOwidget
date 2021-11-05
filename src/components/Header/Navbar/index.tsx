import { NavLink } from "react-router-dom";

import "./index.css";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink className="navbar-item" id={`proposals-nav-link`} to={"/"}>
        Proposals
      </NavLink>
      <NavLink className="navbar-item" id={`about-nav-link`} to={"/about"}>
        About
      </NavLink>
      <NavLink
        className="navbar-item"
        id={`create-proposal-nav-link`}
        to={"/proposal/create"}
      >
        New proposal
      </NavLink>
    </div>
  );
}

export default Navbar;
