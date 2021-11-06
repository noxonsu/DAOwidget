import { useParams } from "react-router-dom";
import { useProposal } from "src/helpers/hooks";

import marked from "marked";

type ParamsProps = {
  proposalId?: string;
};

function ProposalDetail() {
  const { proposalId = "" } = useParams() as ParamsProps;

  const proposal = useProposal(proposalId);

  const { title, description, body } = proposal;

  if (!title) {
    return (
      <p>
        Have not proposal or not proposal's title. Please, try use another
        proposal.
      </p>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: marked(description || body || ""),
        }}
      /> */}
      <h1>{title}</h1>
      <p>{description || body || ""}</p>
    </div>
  );
}

export default ProposalDetail;
