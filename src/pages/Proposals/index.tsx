import { useProposalList } from "src/hooks/useProposals";
import { Link } from "react-router-dom";
import removeMD from "remove-markdown";

import { shortenText } from "src/helpers/utils";

import "./index.scss";

function Proposals() {
  if (!window?.ENS_DOMAIN) window.ENS_DOMAIN = "sushigov.eth";

  const proposals = useProposalList({ space_in: [window.ENS_DOMAIN] });

  const renderedProposalList = proposals.map(
    ({ author, body, title, state, id }, index) => {
      const preparedBody = shortenText(removeMD(body), 140);

      return (
        <div key={index} className="proposal-row">
          <Link to={`/proposal/${id}`}>
            <div className="proposal-header">
              <span>{`Created by ${author}`}</span>
              <span>{state}</span>
            </div>
            <div className="proposal-body">
              <h2>{title}</h2>
              <p className="body-description">{preparedBody}</p>
            </div>
          </Link>
        </div>
      );
    }
  );

  return (
    <div className="proposals">
      <div className="proposals-header">
        <h1>Proposals</h1>
      </div>
      {proposals.length && renderedProposalList}
    </div>
  );
}

export default Proposals;
