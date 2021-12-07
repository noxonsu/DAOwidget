import { ProposalType } from "src/hooks/useProposals";
import { Space } from "src/hooks/useSpaces";

// @ts-ignore
function irv(ballots: any[], rounds: any[]) {
  // @ts-ignore
  const candidates: any[] = [...new Set(ballots.map((vote) => vote[0]).flat())];
  const votes = Object.entries(
    ballots.reduce((votes, [v], i, src) => {
      votes[v[0]][0] += src[i][1];
      votes[v[0]][1].length > 1
        ? (votes[v[0]][1] = votes[v[0]][1].map(
            (score: any, sI: any) => score + src[i][2][sI]
          ))
        : (votes[v[0]][1] = src[i][2]);
      return votes;
    }, Object.assign({}, ...candidates.map((c) => ({ [c]: [0, []] }))))
  );

  const votesWithoutScore = votes.map((vote: any) => [vote[0], vote[1][0]]);

  const [topCand, topCount] = votesWithoutScore.reduce(
    ([n, m]: any[], [v, c]: any[]) => (c > m ? [v, c] : [n, m]),
    ["?", -Infinity]
  );
  const [bottomCand, bottomCount] = votesWithoutScore.reduce(
    ([n, m]: any, [v, c]: any) => (c < m ? [v, c] : [n, m]),
    ["?", Infinity]
  );

  const sortedByHighest = votes.sort((a: any, b: any) => b[1][0] - a[1][0]);

  const totalPowerOfVotes = ballots
    .map((bal) => bal[1])
    .reduce((a, b: any) => a + b, 0);

  rounds.push({
    round: rounds.length + 1,
    sortedByHighest,
  });

  return topCount > totalPowerOfVotes / 2 || sortedByHighest.length < 3
    ? rounds
    : irv(
        ballots
          .map((ballot) => [
            ballot[0].filter((c: any) => c != bottomCand),
            ballot[1],
            ballot[2],
          ])
          .filter((b) => b[0].length > 0),
        rounds
      );
}

function getFinalRound(i: number, votes: any[]) {
  const results = irv(
    votes.map((vote) => [vote.choice, vote.balance, vote.scores]),
    []
  );
  const finalRound = results[results.length - 1];
  return finalRound.sortedByHighest.filter((res: any) => res[0] == i + 1);
}

export default class RankedChoiceVoting {
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
      getFinalRound(i, this.votes).reduce((a: any, b: any) => a + b[1][0], 0)
    );
  }

  resultsByStrategyScore() {
    return this.proposal.choices.map((choice, i) =>
      this.strategies.map((strategy, sI) => {
        return getFinalRound(i, this.votes).reduce(
          (a: any, b: any) => a + b[1][1][sI],
          0
        );
      })
    );
  }

  sumOfResultsBalance() {
    return this.resultsByVoteBalance().reduce((a, b: any) => a + b);
  }
}
