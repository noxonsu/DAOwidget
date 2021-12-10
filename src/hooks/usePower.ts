import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { ProposalType } from "./useProposals";
import { getScores } from "./useVotes";

export const usePower = (proposal: ProposalType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([{}]);
  const [totalScore, setTotalScore] = useState(0);

  const { account = "" } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);
        if (!account) throw new Error("Please, connect to wallet");
        const { strategies, network, space, snapshot } = proposal;
        let scores = await getScores(
          space.id,
          strategies,
          network,
          [account],
          parseInt(snapshot)
        );
        scores = scores.map((score: any) =>
          Object.values(score).reduce((a, b: any) => a + b, 0)
        );

        setScores(scores);
        setTotalScore(scores.reduce((a, b: any) => a + b, 0));
      } catch (err) {
        console.error(`Error: Can't fetch user power. Description: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    isPowerLoading: isLoading,
    scores,
    power: totalScore,
  };
};
