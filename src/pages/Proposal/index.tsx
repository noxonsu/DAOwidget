import { useParams } from "react-router-dom";

import { useProposal } from "src/hooks/useProposals";
import ProposalBody from "./ProposalBody";
import ProposalInfo from "./ProposalInfo";

type ParamsProps = {
  proposalId?: string;
};

function ProposalDetail() {
  const { proposalId = "" } = useParams() as ParamsProps;

  const { proposalData, isLoading, error } = useProposal(proposalId);

  const { title, body, strategies } = proposalData;

  return (
    <div style={{ paddingBottom: "2rem" }}>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error.message}</h3>}
      <ProposalBody title={title} description={body || ""} />
      <ProposalInfo proposalData={proposalData} />
    </div>
  );
}

export default ProposalDetail;
