import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useState, useEffect } from "react";
import { Library } from "src/utils/getLibrary";

const getTokenBalance = async (provider: Web3ReactContextInterface) => {
  if (!window.TOKEN_ADDRESS) throw new Error("Set token address");
  console.log('provider', provider.library)

  await setTimeout(()=> {}, 1000);

  return 0;

  // const result = await contract.methods.balanceOf(window.TOKEN_ADDRESS).call();
  // const format = Web3Client.utils.fromWei(result);

  // console.log(format);
}

export const useTokenBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const provider = useWeb3React<Library>();
  const { account = "", library } = provider;

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);
        if (!account) throw new Error("Please, connect to wallet");
        let balance = await getTokenBalance(provider);

        setBalance(balance);
      } catch (err) {
        console.error(`Error: Can't fetch user power. Description: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, [account, library?.web3]);

  return {
    isTokenBalanceLoading: isLoading,
    balance,
  };
};
