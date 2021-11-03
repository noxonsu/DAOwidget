import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export type Connectors = InjectedConnector | NetworkConnector // | WalletConnectConnector

const RPC_URLS: { [chainId: number]: string } = {
  1: "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c",
  3: "https://kovan.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c",
  4: "https://rinkeby.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c",
  5: "https://goerli.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c"
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001] })

export const network = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: 1
})

// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: RPC_URLS[1] },
//   qrcode: true
// })