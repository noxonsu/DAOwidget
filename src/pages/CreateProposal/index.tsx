import CreateProposalBodyTextArea from "./CreateProposalBodyTextArea";
import "./index.scss"

function CreateProposal() {
  return (
    <div className="createProposal">
      <input maxLength={128} className="createTitleInput" placeholder="Ask a question..." />
      <CreateProposalBodyTextArea className="createBodyTextArea" placeholder="Tell more about your proposal (optional)"/>
    </div>
  );
}

export default CreateProposal;
