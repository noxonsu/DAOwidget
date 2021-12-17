import { Link } from "react-router-dom";
import "./index.scss";

function NotFound() {
  return (
    <div className="notFound">
      <h1>Not page found</h1>
      <Link to={"/"}>Go home page</Link>
    </div>
  );
}

export default NotFound;
