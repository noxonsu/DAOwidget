import { useState, useEffect } from "react";
import { request } from "graphql-request";

import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { PROPOSAL_QUERY, PROPOSALS_QUERY } from "src/helpers/queries";

export type ProposalType = {
  id: string;
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
  type: "single-choice" | "basic";
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
  whitelisted?: boolean
  whitelist_allowed?: boolean
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
  strategies: {
    name: string;
    params: {
      address: string;
      decimals: number;
      symbol: string;
    };
  }[];
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
  tokenAddress: string;
};

export const useProposal = (id: string, userWallet?: string | null | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [proposalData, setProposalData] = useState<ProposalType>({} as any);
  const [ needRefresh, setNeedRefresh ] = useState<any>(userWallet)
  const [ account, setAccount ] = useState(userWallet)
  useEffect(() => {
    if (needRefresh) {
      setNeedRefresh(false)
      const _fetchData = async () => {
        try {
          setIsLoading(true);
          const proposal = (await fetchOffChainProposal(id, userWallet)) as ProposalType;
          setProposalData(proposal);
        } catch (err) {
          console.error(`Error: Can't fetch proposal. Description: ${err}`);
        } finally {
          setIsLoading(false);
        }
      };
      _fetchData();
    }
  }, [ needRefresh ]);

  return {
    isLoading,
    proposalData,
    setNeedRefresh,
  };
};

export const fetchOffChainProposal = async (id: string, userWallet?: string | null | undefined) => {
  const offChainData = await request(OFFCHAIN_HUB_API, PROPOSAL_QUERY, {
    id,
    userWallet,
  });
  return offChainData.proposal;
};

export const useProposalList = (params: FetchOffChainProposalListParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [offChainProposalList, setOffChainProposalList] = useState<
    ShortProposalType[]
  >([]);

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);

        const proposals = await fetchOffChainProposalList(params);
        setOffChainProposalList(proposals);
      } catch (err) {
        console.error(`Error: Can't fetch proposals. Description: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, []);

  return {
    offChainProposalList,
    isLoading,
  };
};

export const fetchOffChainProposalList = async (
  params: FetchOffChainProposalListParams
) => {
  const offChainProposalList = await request(
    OFFCHAIN_HUB_API,
    PROPOSALS_QUERY,
    {
      first: 10000,
      skip: 0,
      state: "all",
      ...params,
    }
  );

  let proposals = offChainProposalList.proposals as ShortProposalType[];

  if (params.tokenAddress) {
    proposals = proposals.filter((proposal) => {
      const strategyAddress = proposal.strategies[0].params.address;
      const isTokenStrategy = strategyAddress === params.tokenAddress;

      return isTokenStrategy;
    });
  }

  return proposals;
};
