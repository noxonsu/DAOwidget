import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { gql, request } from "graphql-request";

import { injected } from "./connectors";

const OFFCHAIN_HUB_API = "https://hub.snapshot.org/graphql"

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


export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

export const useProposal = (id: string) => {
  const [data, setData] = useState<ProposalType>({} as any);
  useEffect(() => {
    const _fetchData = async () => {
      const proposal = await fetchOffChainProposal(id) as ProposalType;
      if (proposal) {
        setData(proposal);
      }
    };
    _fetchData();
  }, []);

  return data || {};
};

export const useProposalList = () => {
  const [offChainData, setOffChainData] = useState<ProposalType[]>([]);

  useEffect(() => {
    const _fetchData = async () => {
      const offChain = await fetchOffChainData();
      setOffChainData(offChain.proposals);
    };
    _fetchData();
  }, []);

  return offChainData;
};

export const fetchOffChainData = async () => {
  const q = gql`
    query Proposals {
      proposals(
        first: 100
        skip: 0
        where: { space_in: ["aave.eth"] }
        orderBy: "created"
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
          id
          name
        }
      }
    }
  `;
  const offChainData = await request(OFFCHAIN_HUB_API, q);
  return offChainData;
};


export const fetchOffChainProposal = async (id: string) => {
  const q = gql`
    query ($id: String!) {
      proposal(id: $id) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        created
        plugins
        network
        strategies {
          name
          params
        }
        space {
          id
          name
        }
      }
    }
  `;
  const offChainData = await request(OFFCHAIN_HUB_API, q, {
    id,
  });
  return offChainData.proposal || "Have not proposal";
};
