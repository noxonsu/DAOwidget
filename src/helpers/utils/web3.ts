import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { AbiItem } from "web3-utils";
import { injected, getWalletconnectConnector } from "src/connectors";

import { Library } from "src/utils/getLibrary";

import { ReactComponent as iconMetamask } from "src/assets/svg/metamask.svg";
import { ReactComponent as iconWalletConnect } from "src/assets/svg/walletconnect.svg";
import { ReactComponent as iconTrustWallet } from "src/assets/svg/trust.svg";
import { ReactComponent as iconOpera } from "src/assets/svg/opera.svg";
import { ReactComponent as iconDefault } from "src/assets/svg/unknown.svg";

import networksSettings from "src/assets/json/networksSettings.json";
import ABI_ERC20 from 'src/assets/json/abi-erc20.json';

const ERC20ABI = ABI_ERC20 as AbiItem[];

const INJECTED_TYPE = {
  NONE: 'NONE',
  UNKNOWN: 'UNKNOWN',
  OPERA: 'OPERA',
  METAMASK: 'METAMASK',
  TRUST: 'TRUST',
};

type INJECTED_STRING = 'NONE' | 'UNKNOWN' | 'OPERA' | 'METAMASK' | 'TRUST';

type NetworkSettings = {
  key: string;
  name: string;
  chainId: number;
  network: string;
  multicall: string;
  rpc: string[];
  explorer: string;
  ensResolver?: string;
  ws?: string[];
  shortName?: string;
  testnet?: boolean;
};

type NetworksSettings = {
  [key: string]: NetworkSettings;
};

type Providers = {
  [key: string]: StaticJsonRpcProvider;
};

const networks = networksSettings as NetworksSettings;
const providers = {} as Providers;

export async function getBlockNumber(provider: StaticJsonRpcProvider) {
  try {
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
  } catch (e) {
    return Promise.reject();
  }
}

export function getProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new StaticJsonRpcProvider(url);

  return providers[network];
}

export function getInjectedType() {
  if (window?.ethereum) {
    if (window.ethereum.isTrust) return INJECTED_TYPE.TRUST
    if (window.ethereum.isMetaMask) return INJECTED_TYPE.METAMASK
    if (!!window.opr?.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) return INJECTED_TYPE.OPERA

    return INJECTED_TYPE.UNKNOWN
  }
  return INJECTED_TYPE.NONE

}

export function getInjectedTitle() {
  switch (getInjectedType()) {
    case INJECTED_TYPE.NONE: return 'Not installed'
    case INJECTED_TYPE.UNKNOWN: return 'Injected Web3'
    case INJECTED_TYPE.OPERA: return 'Opera Crypto Wallet'
    case INJECTED_TYPE.METAMASK: return 'MetaMask'
    case INJECTED_TYPE.TRUST: return 'Trust Wallet'
    default: return 'Not installed'
  }
}

const web3Icons = {
  METAMASK: iconMetamask,
  TRUST: iconTrustWallet,
  OPERA: iconOpera,
  NONE: iconDefault,
  UNKNOWN: iconDefault,
  WALLETCONNECT: iconWalletConnect,
}

export type ConnectorNames = "Injected" | "WalletConnect";

export enum EConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
}

export const getConnectorsByName = (chainId?: number) => ({
  [EConnectorNames.Injected]: injected,
  [EConnectorNames.WalletConnect]: getWalletconnectConnector(chainId),
});

export function getWeb3Icon(connectorName: ConnectorNames): typeof iconMetamask {
  const web3Name =
    connectorName === "WalletConnect"
    ? "WALLETCONNECT"
    : getInjectedType() as INJECTED_STRING

  return web3Icons[web3Name];
}

export function getERC20Contract(tokenAddress: string, from: string, web3: Library["web3"]) {
  return web3 && from
    ? new web3.eth.Contract(ERC20ABI, tokenAddress, {
        from,
      })
    : null
}

export const switchNetworkByChainId = async (chainId: number) => {
  const hexChainId = `0x${chainId.toString(16)}`;
  try {
    const result = await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    })

    // null is a successful result
    return result === null
  } catch (switchError) {
    const tipAddNetwork = JSON.stringify(switchError).match(/(T|t)ry adding the chain/)

    // @ts-ignore
    if (switchError?.code === 4902 || tipAddNetwork) {
      try {
        const networkConfig = networks[chainId];
        const networkParams = {
          chainId: hexChainId,
          chainName: networkConfig.name,
          rpcUrls: networkConfig.rpc,
          blockExplorerUrls: [networkConfig.explorer],
        };
        return await window?.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [networkParams],
        });
      } catch (addError) {
        console.group('%c add a new Metamask network', 'color: red;')
        console.log(addError)
        console.groupEnd()
      }
      // show the error if it's not a rejected request
      // @ts-ignore
    } else if (switchError.code !== 4001) {
      console.group('%c switch the Metamask network', 'color: red;')
      console.log(switchError)
      console.groupEnd()
    }
  }
}

export default {
  getBlockNumber,
  getProvider,
  getInjectedType,
  getInjectedTitle,
  getERC20Contract,
  switchNetworkByChainId
};
