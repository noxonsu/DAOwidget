import React, { useEffect, useState } from "react";
import {
  injected,
  network,
  // walletconnect,
  Connectors,
} from "../../connectors";


import {
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect, useInactiveListener } from "../../hooks";

import Spinner from "../Spinner";

type ConnectorNames = "Injected" | "Network"; // | 'WalletConnect'

enum EConnectorNames {
  Injected = "Injected",
  Network = "Network",
  // WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in EConnectorNames]: Connectors } = {
  [EConnectorNames.Injected]: injected,
  [EConnectorNames.Network]: network,
  // [EConnectorNames.WalletConnect]: walletconnect,
};

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected
    // || error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function ConnectProviders() {

  const context = useWeb3React<Web3Provider>();
  const { connector, activate, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<Connectors>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      {!!error && (
        <h4 style={{ marginTop: "1rem", marginBottom: "1rem", color: "white" }}>
          {getErrorMessage(error)}
        </h4>
      )}
      {Object.keys(connectorsByName).map((name) => {
        const connectorName = name as ConnectorNames;
        const currentConnector = connectorsByName[connectorName];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled =
          !triedEager || !!activatingConnector || connected || !!error;

        return (
          <button
            style={{
              height: "3rem",
              borderRadius: "1rem",
              borderColor: activating
                ? "orange"
                : connected
                ? "green"
                : "unset",
              cursor: disabled ? "unset" : "pointer",
              position: "relative",
              color: disabled ? "white" : "black",
            }}
            disabled={disabled}
            key={name}
            onClick={() => {
              setActivatingConnector(currentConnector);
              activate(connectorsByName[connectorName]);
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                display: "flex",
                alignItems: "center",
                color: "white",
                margin: "0 0 0 -2rem",
              }}
            >
              {activating && (
                <Spinner color={"white"} style={{ height: "25%" }} />
              )}
              {connected && (
                <span role="img" aria-label="check">
                  ✅
                </span>
              )}
            </div>
            {name}
          </button>
        );
      })}
    </>
  );
}

export default ConnectProviders;
