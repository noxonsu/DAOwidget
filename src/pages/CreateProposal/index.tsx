import CreateProposalActions from "./CreateProposalActions";
import CreateProposalBodyTextArea from "./CreateProposalBodyTextArea";

import "./index.scss";

function CreateProposal() {
  return (
    <div className="createProposal mb-2">
      <input
        maxLength={128}
        className="createTitleInput mb-1"
        placeholder="Ask a question..."
      />
      <CreateProposalBodyTextArea
        className="createBodyTextArea mb-1"
        placeholder="Tell more about your proposal (optional)"
      />
      <CreateProposalActions />
    </div>
  );
}

export default CreateProposal;
