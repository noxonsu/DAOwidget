import { NavLink } from "react-router-dom";

import "./index.scss";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "white" : "#8b949e" })}
        className="navbar-item"
        id={`proposals-nav-link`}
        to={"/"}
      >
        Proposals
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "white" : "#8b949e" })}
        className="navbar-item"
        id={`about-nav-link`}
        to={"/about"}
      >
        About
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "white" : "#8b949e" })}
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
