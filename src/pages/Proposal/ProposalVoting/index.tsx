import { useState } from "react";
import Modal from "src/components/Modal";
import { ProposalType } from "src/hooks/useProposals";
import ChoiceButton from "./ChoiceButton";

import "./index.scss";
import VoteButton from "./VoteButton";

type ProposalVotesType = {
  choices: ProposalType["choices"];
};

function ProposalVoting(props: ProposalVotesType) {
  const { choices } = props;

  const [checkedChoice, setCheckedChoice] = useState(-1);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)

  return (
    <>
      <div
        style={{
          border: "solid 1px gray",
          borderRadius: "1rem",
          width: "80%",
          margin: "auto",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            fontSize: "1.5em",
            fontWeight: "bold",
            borderBottom: "solid 1px gray",
          }}
        >
          Cast your vote
        </div>
        <div style={{ padding: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
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
          <VoteButton
            openModal={() => {
              setIsVoteModalOpen(true)
            }}
          />
        </div>
      </div>
      {isVoteModalOpen &&
        <Modal
          headerContent={"Confirm vote"}
          bodyContent={"Are you sure you want to vote?"}
          handleClose={() => {
            setIsVoteModalOpen(false)
          }}
        />
      }
    </>
  );
}

export default ProposalVoting;