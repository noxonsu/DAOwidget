import { useProposalList } from "src/hooks/useProposals";
import { Link } from "react-router-dom";
import removeMD from "remove-markdown";

import { shortenText, shortEVMAddress } from "src/helpers/utils";

import "./index.scss";

function Proposals() {
  const { offChainProposalList: proposals, isLoading } = useProposalList({
    space_in: [window.ENS_DOMAIN || "onout.eth"],
    tokenAddress: window.TOKEN_ADDRESS,
  });

  const renderedProposalList = proposals.map(
    ({ author, body, title, state, id }, index) => {
      const preparedBody = shortenText(removeMD(body), 140);

      return (
        <div key={index} className="proposal-row">
          <Link to={`/proposal/${id}`}>
            <div className="proposal-header">
              <span>{`Created by ${shortEVMAddress(author)}`}</span>
              <span className="proposal-state">{state}</span>
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
    <div className="app-page proposals">
      <div className="proposals-header">
        <h1>Proposals</h1>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : !!proposals.length ? (
        renderedProposalList
      ) : (
        <>
          <h3>Let's create your first proposal</h3>
          <Link to="proposal/create">
            <button className="secondaryButton active">Create proposal</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Proposals;
