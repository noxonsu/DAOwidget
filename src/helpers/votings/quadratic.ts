import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";

export function percentageOfTotal(i: any, values: any, total: any) {
  const reducedTotal: any = total.reduce((a: any, b: any) => a + b, 0);
  const percent = (values[i] / reducedTotal) * 100;
  return isNaN(percent) ? 0 : percent;
}

export function quadraticMath(i: any, choice: any, balance: any) {
  return Math.sqrt(
    (percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * balance
  );
}

export default class QuadraticVoting {
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
    const results = this.proposal.choices
      .map((choice, i) =>
        this.votes
          .map((vote) => quadraticMath(i, vote.choice, vote.balance))
          .reduce((a, b: any) => a + b, 0)
      )
      .map((sqrt) => sqrt * sqrt);

    return results
      .map((res, i) => percentageOfTotal(i, results, results))
      .map((p) => (this.sumOfResultsBalance() / 100) * p);
  }

  resultsByStrategyScore() {
    const results = this.proposal.choices
      .map((choice, i) =>
        this.strategies.map((strategy, sI) =>
          this.votes
            .map((vote) => quadraticMath(i, vote.choice, vote.scores[sI]))
            .reduce((a, b: any) => a + b, 0)
        )
      )
      .map((arr) => arr.map((sqrt) => [sqrt * sqrt]));

    return results.map((res, i) =>
      this.strategies
        .map((strategy, sI) => [
          percentageOfTotal(0, results[i][sI], results.flat(2)),
        ])
        // @ts-ignore
        .map((p) => [(this.sumOfResultsBalance() / 100) * p])
    );
  }

  sumOfResultsBalance() {
    return this.votes.reduce((a, b: any) => a + b.balance, 0);
  }
}
