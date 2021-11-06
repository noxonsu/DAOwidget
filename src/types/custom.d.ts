declare interface EthereumProvider {
  [key: string]: any;
  isLiquality?: boolean;
  isTrust?: boolean;
  isMetaMask?: boolean;
}

declare interface Window {
  [key: string]: any;
  ethereum?: EthereumProvider;
  ENS_DOMAIN?: string;
}

declare interface IUniversalObj {
  [key: string]: any;
}

declare interface IError {
  errno?: number;
  code?: number;
  path?: string;
  name?: string;
  message?: string;
  syscall?: string;
  stack?: string;
}
