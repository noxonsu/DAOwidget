import { shortEVMAddress } from "src/helpers/utils";
import { ProposalType } from "src/hooks/useProposals";
import { VoteWithScores } from "src/hooks/useVotes";
import "./index.scss";
import { translate } from 'src/utils/translate'

type ProposalVotesType = {
  votes: VoteWithScores[];
  choices: ProposalType["choices"];
  strategies: ProposalType["strategies"];
  totalVotes: number;
};

function ProposalVotes(props: ProposalVotesType) {
  const { votes, choices, strategies, totalVotes } = props;

  const tokenSymbol = strategies[0].params.symbol;

  return (
    <div className="app-widget">
      <div className="app-widget-header">
        {translate('proposal_top_votes', 'Top {votes} of {totalVotes} votes', { votes: votes.length, totalVotes })}
      </div>
      <div>
        {votes.map((voute, i) => {
          return (
            <div className="voteRow" key={i}>
              <div className="voteCol">{shortEVMAddress(voute.voter)}</div>
              <div className="voteCol">{choices[voute.choice - 1]}</div>
              <div className="voteCol">
                {`${voute.balance.toFixed(4)} ${tokenSymbol}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProposalVotes;
