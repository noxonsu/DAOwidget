import { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Wallet } from "@ethersproject/wallet";
import { request } from "graphql-request";

import { lsGet, lsSet } from "src/helpers/utils";
import { OFFCHAIN_HUB_API } from "src/helpers/constants";
import { ALIASES_QUERY } from "src/helpers/queries";
import client from "src/helpers/clientEIP712";
import { Library } from "src/utils/getLibrary";

export function useAliasAction() {
  const aliases = useRef(lsGet("aliases") || {});
  const isValidAlias = useRef(false);

  const { account = "", library } = useWeb3React<Library>();

  const userAlias = useRef(aliases.current?.[account || ""] || "");
  const aliasWallet = useRef<Wallet | null>(null);

  useEffect(() => {
    if (account) {
      userAlias.current = aliases.current?.[account];
      aliasWallet.current = userAlias.current
        ? new Wallet(userAlias.current, library?.library)
        : null;
      checkAlias();
    }
  }, [aliases.current, userAlias.current, account, library?.library]);

  async function checkAlias() {
    if (aliasWallet.current?.address && account) {
      const data = await request(OFFCHAIN_HUB_API, ALIASES_QUERY, {
        address: account,
        alias: aliasWallet.current.address,
      });

      const alias = data.aliases;

      isValidAlias.current =
        alias[0]?.address === account &&
        alias[0]?.alias === aliasWallet.current.address;
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

      userAlias.current = aliases.current?.[account];

      aliasWallet.current = userAlias.current
        ? new Wallet(userAlias.current, library.library)
        : null;

      if (aliasWallet.current?.address) {
        await client.alias(library.library, account, {
          alias: aliasWallet.current.address,
        });
      }
      await checkAlias();
    }
  }

  return { setAlias, aliasWallet, isValidAlias, checkAlias };
}
