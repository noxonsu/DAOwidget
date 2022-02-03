import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { getNetworkConnector } from "src/connectors";
import { NetworkContextName } from "src/helpers/constants";
import { useEagerConnect, useInactiveListener } from "src/hooks/useWeb3Connect";
import { Library } from "src/utils/getLibrary";

export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element;
}) {
  const chainId = window.NETWORK_ID;
  const { active } = useWeb3React<Library>();
  const {
    active: isNetworkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React<Library>(NetworkContextName);

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !isNetworkActive && !networkError && !active) {
      activateNetwork(getNetworkConnector(chainId && parseInt(chainId)));
    }
  }, [triedEager, isNetworkActive, networkError, activateNetwork, active, chainId]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !active && networkError) {
    return (
      <p>
        Oops! An unknown error occurred. Please refresh the page, or visit from
        another browser or device.
      </p>
    );
  }

  return children;
}
