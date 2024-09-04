import { useState } from "react";
import VotingModalButton from "src/components/Modal/Modals/Voting/index.";
import { ProposalType } from "src/hooks/useProposals";
import ChoiceButton from "./ChoiceButton";
import { translate } from "src/utils/translate"

type ProposalVotesType = {
  proposal: ProposalType;
};

function ProposalVoting(props: ProposalVotesType) {
  const { proposal } = props;

  const { choices } = proposal;

  const [checkedChoice, setCheckedChoice] = useState(-1);

  return (
    <>
      <div className="app-widget">
        <div className="app-widget-header">
          {translate('proposal_vote_cast_your_vote', 'Cast your vote')}
        </div>
        <div className="p-1">
          <div className="mb-1">
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
          <VotingModalButton
            checkedChoice={checkedChoice}
            proposal={proposal}
          />
        </div>
      </div>
    </>
  );
}

export default ProposalVoting;
