import { useState } from "react";
import { ProposalType } from "src/hooks/useProposals";

import './index.scss'

type ProposalVotesType = {
  choices: ProposalType["choices"];
};

function ProposalVoting(props: ProposalVotesType) {
  const { choices } = props;

  const [checkedChoice, setCheckedChoice] = useState(-1);

  return (
    <div
      style={{
        border: "solid 1px gray",
        borderRadius: "1rem",
        width: "80%",
        margin: "auto",
        marginBottom: "1rem",
      }}
    >
      <div style={{ padding: "1rem", fontSize: "1.5em", fontWeight: "bold", borderBottom: "solid 1px gray" }}>
        Cast your vote
      </div>
      <div>
        {choices.map((choice, i) => {
          return (
            <ChoiceButton
              key={i}
              id={`choice-${i}`}
              text={choice}
              isActive={checkedChoice === i}
              onClick={() => {
                setCheckedChoice(i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

type ChoiceButtonsType = {
  text: string;
  id?: string;
  isActive: boolean;
  onClick: () => void;
};

function ChoiceButton(props: ChoiceButtonsType) {
  const { isActive, id, text, onClick } = props;

  return (
    <div id={id} onClick={onClick} className={`choiseButton ${isActive ? "active" : ""}`}>
      <span>{text}</span>
    </div>
  );
}

export default ProposalVoting;
