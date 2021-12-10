import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";

import networksSettings from "src/assets/json/networksSettings.json";

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
};

export default {
  getBlockNumber,
  getProvider,
}
