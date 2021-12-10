import { useState, useEffect } from "react";
import { request } from "graphql-request";

import { ProposalType } from "src/hooks/useProposals";

import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { VOTES_QUERY } from "src/helpers/queries";
import Votings from "src/helpers/votings";

export interface Vote {
  id: string;
  ipfs: string;
  voter: string;
  created: number;
  choice: number;
}

export interface VoteWithScores extends Vote {
  balance: number;
  scores: number[];
}

export type ResultData = {
  resultsByVoteBalance: number[];
  resultsByStrategyScore: number[][];
  sumOfResultsBalance: number;
};

export const useVotes = (proposal: ProposalType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [votesData, setVotesData] = useState<VoteWithScores[]>([]);
  const [resultData, setResultData] = useState<ResultData>();

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);

        const votes = (await fetchVotes(proposal.id)) as Vote[];
        const { votesWithScores, results } = await getResults(proposal, votes);
        setVotesData(votesWithScores);
        setResultData(results);
      } catch (err) {
        console.error(`Error: Can't fetch votes. Description: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    votesData,
    isLoading,
    resultData,
  };
};

export const fetchVotes = async (id: ProposalType["id"], first = 20000) => {
  const response = await request(OFFCHAIN_HUB_API, VOTES_QUERY, {
    id,
    orderBy: "vp",
    orderDirection: "desc",
    first,
  });
  return response.votes;
};

export async function getResults(proposal: ProposalType, votes: Vote[]) {
  try {
    const voters = votes.map((vote) => vote.voter);

    const {
      snapshot,
      network,
      strategies,
      space: { id: spaceId },
      state,
    } = proposal;

    let votesWithScores: VoteWithScores[] = [];

    /* Get scores */
    if (state !== "pending") {
      console.time("getResults");
      const scores = await getScores(
        spaceId,
        strategies,
        network,
        voters,
        parseInt(snapshot)
      );
      console.timeEnd("getResults");
      console.log("Got scores");

      votesWithScores = votes
        .map((vote) => {
          const voteWithScores: VoteWithScores = {
            ...vote,
            scores: [],
            balance: 0,
          } as VoteWithScores;

          voteWithScores.scores = strategies.map(
            (strategy, i) => scores[i][vote.voter] || 0
          );
          voteWithScores.balance = voteWithScores.scores.reduce(
            (a, b) => a + b,
            0
          );
          return voteWithScores;
        })
        .sort((a, b) => b.balance - a.balance)
        .filter((vote: { balance: number }) => vote.balance > 0);
    }

    /* Get results */
    const votingClass = new Votings[proposal.type](
      proposal,
      votesWithScores,
      strategies
    );

    const results: ResultData = {
      resultsByVoteBalance: votingClass.resultsByVoteBalance(),
      resultsByStrategyScore: votingClass.resultsByStrategyScore(),
      sumOfResultsBalance: votingClass.sumOfResultsBalance(),
    };

    return { votesWithScores, results };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getScores(
  space: string,
  strategies: any[],
  network: string,
  addresses: string[],
  snapshot: number | string = "latest",
  scoreApiUrl = "https://score.snapshot.org/api/scores"
) {
  try {
    const params = {
      space,
      network,
      snapshot,
      strategies,
      addresses,
    };
    const res = await fetch(scoreApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params }),
    });
    const obj = await res.json();
    return obj.result.scores as any[];
  } catch (e) {
    return Promise.reject(e);
  }
}
