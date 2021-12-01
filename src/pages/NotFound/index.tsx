import { Link } from "react-router-dom";

function NotFound() {
  return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <h1>Not page found</h1>
        <Link style={{marginBottom: "1rem"}} to={"/"}>
          Go home page
        </Link>
      </div>
  );
}

export default NotFound;
