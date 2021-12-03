import { useState, useEffect } from "react";
import { request } from "graphql-request";

import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { PROPOSAL_QUERY, PROPOSALS_QUERY } from "src/helpers/queries";

export type ProposalType = {
  id: number;
  ipfs: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
  author: string;
  created: number;
  plugins: IUniversalObj;
  network: string;
  type: string;
  strategies: {
    name: string;
    params: {
      address: string;
      decimals: number;
      symbol: string;
    };
  }[];
  space: {
    id: string;
    name: string;
  };
};

export type ShortProposalType = {
  id: string;
  ipfs: string;
  title: string;
  body: string;
  start: number;
  end: number;
  state: string;
  author: string;
  created: number;
  space: {
    avatar: string;
    id: string;
    members: string[];
    name: string;
  };
};

export enum ProposalState {
  Pending = 0,
  Canceled,
  Active,
  Failed,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

type FetchOffChainProposalListParams = {
  first?: number;
  skip?: number;
  state?: string;
  space?: string;
  space_in: string[];
  author_in?: string[];
};

export const useProposal = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | Error>(false);
  const [proposalData, setProposalData] = useState<ProposalType>({} as any);

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);

        const proposal = (await fetchOffChainProposal(id)) as ProposalType;
        setProposalData(proposal);
      } catch (err) {
        setError(new Error("Can't fetch proposal"));
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    isLoading,
    error,
    proposalData,
  };
};

export const fetchOffChainProposal = async (id: string) => {
  const offChainData = await request(OFFCHAIN_HUB_API, PROPOSAL_QUERY, {
    id,
  });
  return offChainData.proposal;
};

export const useProposalList = (params: FetchOffChainProposalListParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<false | Error>(false);
  const [offChainProposalList, setOffChainProposalList] = useState<
    ShortProposalType[]
  >([]);

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);

        const proposals = (await fetchOffChainProposalList(
          params
        )) as ShortProposalType[];
        setOffChainProposalList(proposals);
      } catch (err) {
        setError(new Error("Can't fetch proposals"));
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    offChainProposalList,
    isLoading,
    error,
  };
};

export const fetchOffChainProposalList = async (
  params: FetchOffChainProposalListParams
) => {
  const offChainProposalList = await request(
    OFFCHAIN_HUB_API,
    PROPOSALS_QUERY,
    {
      first: 6,
      skip: 0,
      state: "all",
      ...params,
    }
  );
  console.log("offChainProposalList", offChainProposalList);
  return offChainProposalList.proposals;
};
