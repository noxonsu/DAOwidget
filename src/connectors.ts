import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId, INFURA_KEY } from 'src/helpers/constants'

export type Connectors = InjectedConnector | NetworkConnector; // | WalletConnectConnector

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.BINANCE_SMART_CHAIN]: "https://bsc-dataseed.binance.org/",
  [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]: "https://data-seed-prebsc-1-s1.binance.org:8545/",

  [SupportedChainId.POLYGON]: `https://polygon-rpc.com/`,
  [SupportedChainId.POLYGON_MUMBAI]: `https://rpc-mumbai.maticvigil.com`,
  [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});

// export const walletconnect = new WalletConnectConnector({
//   supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
//   rpc: NETWORK_URLS,
//   qrcode: true,
// })
