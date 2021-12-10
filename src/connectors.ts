import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import {
  ALL_SUPPORTED_CHAIN_IDS,
  NETWORK_RPC_URLS,
  SupportedChainId,
} from "src/helpers/constants";

export type Connectors = InjectedConnector | NetworkConnector; // | WalletConnectConnector

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const network = new NetworkConnector({
  urls: NETWORK_RPC_URLS,
  defaultChainId: parseInt(window.NETWORK_ID) || SupportedChainId.MAINNET,
});

// export const walletconnect = new WalletConnectConnector({
//   supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
//   rpc: NETWORK_URLS,
//   qrcode: true,
// })
