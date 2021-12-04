import { request } from "graphql-request";
import { VOTES_QUERY } from "./queries";
import { OFFCHAIN_HUB_API } from "./constants";
import { Space } from "src/hooks/useSpaces";
import { ProposalType } from "src/hooks/useProposals";

import Votings from 'src/helpers/votings';

export async function getProposalVotes(proposalId: string, first = 20000) {
  try {
    console.time('getProposalVotes');
    const response = await request(
      OFFCHAIN_HUB_API,
      VOTES_QUERY,
      {
        id: proposalId,
        orderBy: 'vp',
        orderDirection: 'desc',
        first
    });
    console.timeEnd('getProposalVotes');
    return response.data.votes;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getResults(space: Space, proposal: ProposalType, votes: any[]) {
  try {
    const voters = votes.map((vote: { voter: any; }) => vote.voter);
    const strategies = proposal.strategies ?? space.strategies;
    /* Get scores */
    if (proposal.state !== 'pending') {
      console.time('getProposal.scores');
      const scores = await getScores(
        space.id,
        strategies,
        proposal.network,
        voters,
        parseInt(proposal.snapshot),
      ) as any[];
      console.timeEnd('getProposal.scores');
      console.log('Got scores');

      votes = votes
        .map((vote) => {
          vote.scores = strategies.map(
            (strategy, i) => scores[i][vote.voter] || 0
          );
          vote.balance = vote.scores.reduce((a: any, b: any) => a + b, 0);
          return vote;
        })
        .sort((a, b) => b.balance - a.balance)
        .filter((vote: { balance: number; }) => vote.balance > 0);
    }

    /* Get results */
    // @ts-ignore
    const votingClass = new Votings[proposal.type](proposal, votes, strategies);
    const results = {
      resultsByVoteBalance: votingClass.resultsByVoteBalance(),
      resultsByStrategyScore: votingClass.resultsByStrategyScore(),
      sumOfResultsBalance: votingClass.sumOfResultsBalance()
    };

    return { votes, results };
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getScores(
  space: string,
  strategies: any[],
  network: string,
  addresses: string[],
  snapshot: number | string = 'latest',
  scoreApiUrl = 'https://score.snapshot.org/api/scores'
) {
  try {
    const params = {
      space,
      network,
      snapshot,
      strategies,
      addresses
    };
    const res = await fetch(scoreApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ params })
    });
    const obj = await res.json();
    return obj.result.scores;
  } catch (e) {
    return Promise.reject(e);
  }
}