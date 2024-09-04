import { Link } from "react-router-dom";
import "./index.scss";
import { translate } from 'src/utils/translate'

function NotFound() {
  return (
    <div className="app-page notFound">
      <h1>
        {translate('page_404_title', 'Not page found')}
      </h1>
      <Link to={"/"}>
        {translate('page_404_gohome', 'Go home page')}
      </Link>
    </div>
  );
}

export default NotFound;
