import { useEffect, useRef, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { Wallet } from '@ethersproject/wallet';
import { getDefaultProvider, Provider, Web3Provider } from '@ethersproject/providers';
import { request } from "graphql-request";

import { lsGet, lsSet } from 'src/helpers/utils';
import { OFFCHAIN_HUB_API } from 'src/helpers/constants'
import { ALIASES_QUERY } from 'src/helpers/queries';
import client from 'src/helpers/clientEIP712';

export function useAliasAction() {
  const aliases = useRef(lsGet('aliases') || {});
  const isValidAlias = useRef(false);

  const [userAlias, setUserAlias] = useState('')
  const [aliasWallet, setAliasWallet] = useState<Wallet | null>(null)

  const web3 = useWeb3React<Web3Provider>();

  useEffect(() => {
    const { account = '' } = web3

    if (account) {
        setUserAlias(aliases.current?.[account])
        const provider: Provider = getDefaultProvider();
        setAliasWallet(userAlias ? new Wallet(userAlias, provider) : null);
    }
  }, [userAlias, web3]);



  async function checkAlias() {
    const account = web3.account || ''
    if (aliasWallet?.address && account) {

      const response = await request(OFFCHAIN_HUB_API, ALIASES_QUERY, {
        address: account,
        alias: aliasWallet.address
      })

      const alias = response.data.aliases

      isValidAlias.current =
        alias[0]?.address === account &&
        alias[0]?.alias === aliasWallet.address;
    }
  }

  async function setAlias() {
    const rndWallet = Wallet.createRandom();

    const account = web3.account || ''
    const provider = window?.ethereum?.currentProvider as Web3Provider

    if (account && provider) {
        aliases.current = Object.assign(
            {
              [account]: rndWallet.privateKey
            },
            aliases.current
          );
          lsSet('aliases', aliases.current);

          if (aliasWallet?.address) {
            await client.alias(provider, account, {
              alias: aliasWallet.address
            });
          }
          await checkAlias();

    }

  }

  return { setAlias, aliasWallet, isValidAlias, checkAlias };
}
