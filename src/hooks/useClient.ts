import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import clientEIP712 from "src/helpers/clientEIP712";
import { Space } from "./useSpaces";
import { Library } from "src/utils/getLibrary";

export type SentType = "proposal" | "vote" | "delete-proposal" | "settings";

export function useClient() {
  const { account = "", library } = useWeb3React<Library>();

  const [isLoading, setIsLoading] = useState(false);

  async function send(space: Space, type: SentType, payload: any) {
    setIsLoading(true);
    try {
      return await sendEIP712(space, type, payload);
    } catch (e: any) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  async function sendEIP712(space: Space, type: SentType, payload: any) {
    if (!library?.library) throw new Error("Have not library");
    if (!account) throw new Error("Have not account");

    if (type === "proposal") {
      let plugins = {};
      if (Object.keys(payload.metadata?.plugins).length !== 0)
        plugins = payload.metadata.plugins;
      return clientEIP712.proposal(library.library, account, {
        space: space.id,
        type: payload.type,
        title: payload.title,
        body: payload.body,
        choices: payload.choices,
        start: payload.start,
        end: payload.end,
        snapshot: payload.snapshot,
        network: payload.network,
        whitelist: JSON.stringify(payload?.whitelist),
        // strategies: JSON.stringify([space.strategies[0]]),
        strategies: JSON.stringify(payload.strategies),
        plugins: JSON.stringify(plugins),
        metadata: JSON.stringify({}),
      });
    } else if (type === "vote") {
      return clientEIP712.vote(library.library, account, {
        space: space.id,
        proposal: payload.proposal.id,
        type: payload.proposal.type,
        choice: payload.choice,
        metadata: JSON.stringify({}),
      });
    } else if (type === "delete-proposal") {
      return clientEIP712.cancelProposal(library.library, account, {
        space: space.id,
        proposal: payload.proposal.id,
      });
    } else if (type === "settings") {
      return clientEIP712.space(library.library, account, {
        space: space.id,
        settings: JSON.stringify(payload),
      });
    }
  }

  return { send, clientLoading: isLoading };
}
