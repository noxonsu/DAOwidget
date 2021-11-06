import { useParams } from "react-router-dom";
import { useProposal } from "src/helpers/hooks";
import MarkdownElement from "src/components/MarkdownElement";

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
      <h1>{title}</h1>
      <MarkdownElement text={description || body || ""} />
    </div>
  );
}

export default ProposalDetail;
