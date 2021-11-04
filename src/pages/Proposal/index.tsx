import { RouteComponentProps } from "react-router-dom";

function Proposal({
  match: {
    params: { proposalId: proposalIdFromUrl },
  },
}: RouteComponentProps<{ proposalId?: string }>) {
  return <p>{proposalIdFromUrl}</p>;
}

export default Proposal;
