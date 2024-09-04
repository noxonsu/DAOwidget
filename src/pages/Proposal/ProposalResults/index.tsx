import { ProposalType } from "src/hooks/useProposals";
import { ResultData } from "src/hooks/useVotes";
import { translate } from 'src/utils/translate'

type ProposalResultsProps = {
  choices: ProposalType["choices"];
  results: ResultData;
  strategies: ProposalType["strategies"];
};

function ProposalResults(props: ProposalResultsProps) {
  const { choices, results, strategies } = props;

  const tokenSymbol = strategies[0].params.symbol;

  return (
    <div className="app-widget">
      <div className="app-widget-header">
        {translate('proposal_result_title', 'Results')}
      </div>
      <div className="p-1">
        {choices.map((choice, i) => {
          const resultByVoteBalance = results.resultsByVoteBalance[i];
          const persentsOfChoice =
            (resultByVoteBalance / results.sumOfResultsBalance) * 100;

          return (
            <div className="app-widget-item" key={i}>
              {`${choice} - ${resultByVoteBalance.toFixed(
                4
              )} ${tokenSymbol} (${persentsOfChoice.toFixed(2)} %)`}
              <progress
                max="100"
                value={persentsOfChoice}
                style={{ width: "100%" }}
              ></progress>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProposalResults;
