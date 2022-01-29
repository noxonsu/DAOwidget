export const OFFCHAIN_HUB_LINK = "https://snapshothub.onout.org";
export const OFFCHAIN_HUB_API = `${OFFCHAIN_HUB_LINK}/graphql`;
export const NAME = "snapshot";
export const VERSION = "0.1.4";

export const NetworkContextName = "NETWORK";

export const INFURA_KEY =
  process.env.INFURA_KEY || "5ffc47f65c4042ce847ef66a3fa70d4c";

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  BINANCE_SMART_CHAIN = 56,
  BINANCE_SMART_CHAIN_TESTNET = 97,
  XDAI = 100,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
  XDAI_POA_SOKOL = 77,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.BINANCE_SMART_CHAIN,
  SupportedChainId.BINANCE_SMART_CHAIN_TESTNET,

  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.XDAI,
  SupportedChainId.XDAI_POA_SOKOL,
];

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.BINANCE_SMART_CHAIN,
  SupportedChainId.BINANCE_SMART_CHAIN_TESTNET,
  SupportedChainId.XDAI,
  SupportedChainId.XDAI_POA_SOKOL,
] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export const L2_CHAIN_IDS = [
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
] as const;

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];

export const NETWORK_RPC_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.BINANCE_SMART_CHAIN]: "https://bsc-dataseed.binance.org/",
  [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]:
    "https://data-seed-prebsc-1-s1.binance.org:8545/",

  [SupportedChainId.POLYGON]: `https://polygon-rpc.com/`,
  [SupportedChainId.POLYGON_MUMBAI]: `https://rpc-mumbai.maticvigil.com`,
  [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,

  [SupportedChainId.XDAI]: `https://rpc.xdaichain.com/`,
  [SupportedChainId.XDAI_POA_SOKOL]: `https://sokol.poa.network/`,
};

export const NETWORK_EXPLORER_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://etherscan.io/`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.etherscan.io/`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.etherscan.io/`,
  [SupportedChainId.GOERLI]: `https://goerli.etherscan.io/`,
  [SupportedChainId.KOVAN]: `https://kovan.etherscan.io/`,
  [SupportedChainId.BINANCE_SMART_CHAIN]: "https://bscscan.com/",
  [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]:
    "https://testnet.bscscan.com/",

  [SupportedChainId.POLYGON]: `https://polygonscan.com/`,
  [SupportedChainId.POLYGON_MUMBAI]: `https://mumbai.polygonscan.com/`,
  [SupportedChainId.OPTIMISM]: `https://optimistic.etherscan.io/`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://kovan-optimistic.etherscan.io/`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbiscan.io/`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://testnet.arbiscan.io/`,

  [SupportedChainId.XDAI]: `https://blockscout.com/xdai/mainnet/`,
  [SupportedChainId.XDAI_POA_SOKOL]: `https://blockscout.com/poa/sokol/`,
};

export const NETWORK_EXPLORER_API_URLS: { [key in SupportedChainId]: string } =
  {
    [SupportedChainId.MAINNET]: `https://api.etherscan.io/api`,
    [SupportedChainId.RINKEBY]: `https://api-rinkeby.etherscan.io/api`,
    [SupportedChainId.ROPSTEN]: `https://api-ropsten.etherscan.io/api`,
    [SupportedChainId.GOERLI]: `https://api-goerli.etherscan.io/api`,
    [SupportedChainId.KOVAN]: `https://api-kovan.etherscan.io/api`,
    [SupportedChainId.BINANCE_SMART_CHAIN]: "https://api.bscscan.com/api",
    [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]:
      "https://api-testnet.bscscan.com/api",

    [SupportedChainId.POLYGON]: `https://api.polygonscan.com/api`,
    [SupportedChainId.POLYGON_MUMBAI]: `https://api-testnet.polygonscan.com/api`,
    [SupportedChainId.OPTIMISM]: `https://api-optimistic.etherscan.io/api`,
    [SupportedChainId.OPTIMISTIC_KOVAN]: `https://api-kovan-optimistic.etherscan.io/api`,
    [SupportedChainId.ARBITRUM_ONE]: `https://api.arbiscan.io/api`,
    [SupportedChainId.ARBITRUM_RINKEBY]: `https://api-testnet.arbiscan.io/api`,

    [SupportedChainId.XDAI]: `https://blockscout.com/xdai/mainnet/api`,
    [SupportedChainId.XDAI_POA_SOKOL]: `https://blockscout.com/poa/sokol/api`,
  };
