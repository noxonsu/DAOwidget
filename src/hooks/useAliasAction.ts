import { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Wallet } from "@ethersproject/wallet";
import {
  getDefaultProvider,
  Provider,
  Web3Provider,
} from "@ethersproject/providers";
import { request } from "graphql-request";

import { lsGet, lsSet } from "src/helpers/utils";
import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { ALIASES_QUERY } from "src/helpers/queries";
import client from "src/helpers/clientEIP712";

export function useAliasAction() {
  const aliases = useRef(lsGet("aliases") || {});
  const isValidAlias = useRef(false);

  const [userAlias, setUserAlias] = useState("");
  const [aliasWallet, setAliasWallet] = useState<Wallet | null>(null);

  const { account = "", library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (account) {
      setUserAlias(aliases.current?.[account]);
      setAliasWallet(userAlias ? new Wallet(userAlias, library) : null);
      checkAlias();
    }
  }, [aliases, userAlias, account, library]);

  async function checkAlias() {
    if (aliasWallet?.address && account) {
      const data = await request(OFFCHAIN_HUB_API, ALIASES_QUERY, {
        address: account,
        alias: aliasWallet.address,
      });

      const alias = data.aliases;

      isValidAlias.current =
        alias[0]?.address === account &&
        alias[0]?.alias === aliasWallet.address;
    }
  }

  async function setAlias() {
    const rndWallet = Wallet.createRandom();

    if (account && library) {
      aliases.current = Object.assign(
        {
          [account]: rndWallet.privateKey,
        },
        aliases.current
      );
      lsSet("aliases", aliases.current);

      const userAlias = aliases.current?.[account];
      setUserAlias(userAlias);

      const aliasWallet = userAlias ? new Wallet(userAlias, library) : null;
      setAliasWallet(aliasWallet);

      if (aliasWallet?.address) {
        await client.alias(library, account, {
          alias: aliasWallet.address,
        });
      }
      await checkAlias();
    }
  }

  return { setAlias, aliasWallet, isValidAlias, checkAlias };
}
