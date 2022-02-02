import { Web3Provider } from "@ethersproject/providers";
import Web3 from 'web3'

export type Library = {
  library: Web3Provider
  web3: Web3
}

export function getLibrary(provider: any): Library {
  const library = new Web3Provider(provider);
  const web3 = new Web3(provider);
  library.pollingInterval = 12000;
  return {library, web3};
}
