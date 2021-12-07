import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";
import { VoteWithScores } from "src/hooks/useVotes";

export default class SingleChoiceVoting {
  public proposal;
  public votes;
  public strategies;

  constructor(
    proposal: ProposalType,
    votes: VoteWithScores[],
    strategies: Space["strategies"]
  ) {
    this.proposal = proposal;
    this.votes = votes;
    this.strategies = strategies;
  }

  //  Returns an array with the results for each choice
  resultsByVoteBalance() {
    return this.proposal.choices.map((choice, i) =>
      this.votes
        .filter((vote: any) => vote.choice === i + 1)
        .reduce((a, b: any) => a + b.balance, 0)
    );
  }

  //  Returns an array with the results for each choice
  //  and for each strategy
  resultsByStrategyScore() {
    return this.proposal.choices.map((choice, i) =>
      this.strategies.map((strategy, sI) =>
        this.votes
          .filter((vote: any) => vote.choice === i + 1)
          .reduce((a, b: any) => a + b.scores[sI], 0)
      )
    );
  }

  // Returns the total amount of the results
  sumOfResultsBalance() {
    return this.votes.reduce((a, b: any) => a + b.balance, 0);
  }
}
