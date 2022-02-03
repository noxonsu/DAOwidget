import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import {
  ALL_SUPPORTED_CHAIN_IDS,
  NETWORK_RPC_URLS,
  SupportedChainId,
} from "src/helpers/constants";

export type Connectors =
  | InjectedConnector
  | NetworkConnector
  | WalletConnectConnector;

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const getNetworkConnector = (chainId?: number) => {
  return new NetworkConnector({
    urls: NETWORK_RPC_URLS,
    defaultChainId: chainId || SupportedChainId.MAINNET,
  });
};

export const getWalletconnectConnector = (chainId?: number) => {
  return new WalletConnectConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
    rpc: NETWORK_RPC_URLS,
    qrcode: true,
    chainId: chainId || SupportedChainId.MAINNET
  });
};
