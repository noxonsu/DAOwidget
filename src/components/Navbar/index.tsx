import "./index.css";

function Navbar() {
  return (
    <section className="navbar">
      <a href="/" className="navbar-item">
        Proposals
      </a>
      <a href="/about" className="navbar-item">
        About
      </a>
      <a href="/proposal/create" className="navbar-item">
        New proposal
      </a>
    </section>
  );
}

export default Navbar;
