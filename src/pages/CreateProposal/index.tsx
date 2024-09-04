import { useState } from "react";

import CreateProposalActions from "./CreateProposalActions";
import CreateProposalBodyTextArea from "./CreateProposalBodyTextArea";

import "./index.scss";
import { translate } from 'src/utils/translate'

function CreateProposal() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="app-page createProposal mb-2">
      <input
        maxLength={128}
        className="createTitleInput mb-1"
        placeholder={translate('new_props_title_ph', "Title (proposal in one sentence)")}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <CreateProposalBodyTextArea
        className="createBodyTextArea mb-1"
        placeholder={translate('new_props_desc_ph', "Tell more about your proposal (optional)")}
        onSetValue={(e) => setBody(e.target.value)}
        value={body}
      />
      <CreateProposalActions title={title} body={body} />
    </div>
  );
}

export default CreateProposal;
