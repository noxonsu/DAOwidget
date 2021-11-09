import { useState, useEffect } from "react";
import { request } from "graphql-request";

import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { PROPOSAL_QUERY, PROPOSALS_QUERY } from "src/helpers/queries";

export type ProposalType = {
  title: string;
  againstVotes: number;
  forVotes: string;
  proposalState: number;
  basename: string;
  status: string;
  ipfsHash: string;
  id: number;
  description: string;
  author: string;
  state: string;
  end: number;
  body: string;
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
  const [data, setData] = useState<ProposalType>({} as any);
  useEffect(() => {
    const _fetchData = async () => {
      const proposal = (await fetchOffChainProposal(id)) as ProposalType;
      if (proposal) {
        setData(proposal);
      }
    };
    _fetchData();
  }, []);

  return data || {};
};

export const fetchOffChainProposal = async (id: string) => {
  const offChainData = await request(OFFCHAIN_HUB_API, PROPOSAL_QUERY, {
    id,
  });
  return offChainData.proposal;
};

export const useProposalList = (params: FetchOffChainProposalListParams) => {
  const [offChainProposalList, setOffChainProposalList] = useState<
    ProposalType[]
  >([]);

  useEffect(() => {
    const _fetchData = async () => {
      const proposals = (await fetchOffChainProposalList(
        params
      )) as ProposalType[];
      setOffChainProposalList(proposals);
    };
    _fetchData();
  }, []);

  return offChainProposalList;
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
