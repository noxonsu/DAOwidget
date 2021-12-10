import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";

export default class ApprovalVoting {
  public proposal;
  public votes;
  public strategies;

  constructor(
    proposal: ProposalType,
    votes: any[],
    strategies: Space["strategies"]
  ) {
    this.proposal = proposal;
    this.votes = votes;
    this.strategies = strategies;
  }

  resultsByVoteBalance() {
    return this.proposal.choices.map((choice, i) =>
      this.votes
        .filter((vote: any) => vote.choice.includes(i + 1))
        .reduce((a, b: any) => a + b.balance, 0)
    );
  }

  resultsByStrategyScore() {
    return this.proposal.choices.map((choice, i) =>
      this.strategies.map((strategy, sI) =>
        this.votes
          .filter((vote: any) => vote.choice.includes(i + 1))
          .reduce((a, b: any) => a + b.scores[sI], 0)
      )
    );
  }

  sumOfResultsBalance() {
    return this.votes.reduce((a, b: any) => a + b.balance, 0);
  }
}
