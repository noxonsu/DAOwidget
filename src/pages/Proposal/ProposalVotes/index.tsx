import { shortEVMAddress } from "src/helpers/utils";
import { ProposalType } from "src/hooks/useProposals";
import { VoteWithScores } from "src/hooks/useVotes";
import "./index.scss"

type ProposalVotesType = {
    votes: VoteWithScores[];
    choices: ProposalType["choices"];
    strategies: ProposalType["strategies"];
    totalVotes: number;
}

function ProposalVotes(props: ProposalVotesType) {

  const { votes, choices, strategies, totalVotes } = props

  const tokenSymbol = strategies[0].params.symbol

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
      <div style={{padding: "1rem", fontSize: "1.5em", fontWeight: "bold",}}>Top {votes.length} of {totalVotes} votes</div>
      {votes.map((voute, i) => {
        return (
          <div className="row" key={i}>
            <div className="col">{shortEVMAddress(voute.voter)}</div>
            <div className="col">{choices[voute.choice - 1]}</div>
            <div className="col">{`${voute.balance.toFixed(4)} ${tokenSymbol}`}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ProposalVotes;