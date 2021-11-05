import "./index.css";

function Navbar() {
  return (
    <div className="navbar">
      <a href="/" className="navbar-item">
        Proposals
      </a>
      <a href="/about" className="navbar-item">
        About
      </a>
      <a href="/proposal/create" className="navbar-item">
        New proposal
      </a>
    </div>
  );
}

export default Navbar;
