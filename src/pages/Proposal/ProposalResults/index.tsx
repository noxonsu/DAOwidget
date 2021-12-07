import { ProposalType } from "src/hooks/useProposals";
import { ResultData } from "src/hooks/useVoutes";

type ProposalResultsProps = {
  choices: string[];
  results: ResultData;
  strategies: ProposalType["strategies"]
};

function ProposalResults(props: ProposalResultsProps) {
  const { choices, results, strategies } = props;

  const tokenSymbol = strategies[0].params.symbol

  return (
    <div
      style={{
        padding: "0 1rem",
        border: "solid 1px gray",
        borderRadius: "1rem",
        width: "50%",
        margin: "auto",
        marginBottom: "1rem",
      }}
    >
      <h2>Results</h2>
      {choices.map((choice, i) => {
        const resultByVoteBalance = results.resultsByVoteBalance[i]
        const persentsOfChoice = (resultByVoteBalance / results.sumOfResultsBalance) * 100

        return(
          <div key={i}>
            <p>
              {`${choice} - ${resultByVoteBalance.toFixed(4)} ${tokenSymbol} (${persentsOfChoice.toFixed(2)} %)`}
              <progress max="100" value={persentsOfChoice} style={{width: "100%"}}></progress>
            </p>
          </div>
        )
      })}

    </div>
  );
}

export default ProposalResults;

