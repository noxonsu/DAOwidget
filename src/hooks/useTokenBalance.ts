import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { getERC20Contract } from "src/helpers/utils/web3";
import { Library } from "src/utils/getLibrary";


const getTokenBalance = async (tokenAddress: string, decimals: string, account: string, provider: Library) => {
  const contract = getERC20Contract(tokenAddress, account, provider.web3)

  const result = await contract?.methods.balanceOf(account).call();

  const { toBN } = provider.web3.utils;

  return toBN(result).toString();
}

export const useTokenBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");

  const provider = useWeb3React<Library>();
  const { account = "", library } = provider;

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);
        if (!window.TOKEN_ADDRESS) throw new Error("Set token address");
        if (!window.TOKEN_DECIMALS) throw new Error("Set token decimals");
        if (!account || !library) throw new Error("Please, connect to wallet");
        const balance = await getTokenBalance(window.TOKEN_ADDRESS, window.TOKEN_DECIMALS, account, library);

        setBalance(balance);
      } catch (err) {
        console.error(`Error: Can't fetch token balance. Description: ${err}`);
        setBalance("0");
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
