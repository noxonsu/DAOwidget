import { useState } from "react";

import CreateProposalActions from "./CreateProposalActions";
import CreateProposalBodyTextArea from "./CreateProposalBodyTextArea";

import "./index.scss";

function CreateProposal() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="app-page createProposal mb-2">
      <input
        maxLength={128}
        className="createTitleInput mb-1"
        placeholder="Ask a question..."
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <CreateProposalBodyTextArea
        className="createBodyTextArea mb-1"
        placeholder="Tell more about your proposal (optional)"
        onSetValue={(e) => setBody(e.target.value)}
        value={body}
      />
      <CreateProposalActions title={title} body={body} />
    </div>
  );
}

export default CreateProposal;
