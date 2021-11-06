import AccountInfo from "./AccountInfo";
import Providers from "./Providers";

import "./index.scss";

export default function Account() {
  return (
    <div className="account-page">
      <AccountInfo />
      <Providers />
    </div>
  );
}
