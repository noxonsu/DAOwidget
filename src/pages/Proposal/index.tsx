import { useParams } from "react-router-dom";

import { useProposal } from "src/hooks/useProposals";
import MarkdownElement from "src/components/MarkdownElement";

type ParamsProps = {
  proposalId?: string;
};

function ProposalDetail() {
  const { proposalId = "" } = useParams() as ParamsProps;

  const { proposalData, isLoading, error} = useProposal(proposalId);

  const { title, description, body } = proposalData;

  return (
    <div style={{ padding: "2rem" }}>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error.message}</h3>}
      {title && <h1>{title}</h1>}
      <MarkdownElement text={description || body || ""} />
    </div>
  );
}

export default ProposalDetail;
