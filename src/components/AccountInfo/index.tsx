import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

function ChainId() {
  const { chainId } = useWeb3React();

  return (
    <span>
      <span role="img" aria-label="chain">
        ⛓
      </span>{" "}
      Chain Id {chainId ?? ""}
    </span>
  );
}

function BlockNumber() {
  const { chainId, library } = useWeb3React();

  const [blockNumber, setBlockNumber] = useState("");
  useEffect((): any => {
    if (!!library) {
      let stale = false;

      library
        .getBlockNumber()
        .then((blockNumber: any) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber("null");
          }
        });

      const updateBlockNumber = (blockNumber: any) => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        stale = true;
        library.removeListener("block", updateBlockNumber);
        setBlockNumber("");
      };
    }
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <span>
      <span role="img" aria-label="numbers">
        🔢
      </span>{" "}
      Block Number {blockNumber === "null" ? "Error" : blockNumber ?? ""}
    </span>
  );
}

function Account() {
  const { account } = useWeb3React();

  return (
    <span>
      <span role="img" aria-label="robot">
        🤖
      </span>{" "}
      Account{" "}
      {account === null
        ? "-"
        : account
        ? `${account.substring(0, 6)}...${account.substring(
            account.length - 4
          )}`
        : ""}
    </span>
  );
}

function Balance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState("");
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance("null");
          }
        });

      return () => {
        stale = true;
        setBalance("");
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <span>
      <span role="img" aria-label="gold">
        💰
      </span>{" "}
      Balance{" "}
      {balance === "null" ? "Error" : balance ? `Ξ${formatEther(balance)}` : ""}
    </span>
  );
}

function Header() {
  const { active, error } = useWeb3React();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "space-between",
        fontSize: "calc(10px + 2vmin)",
        color: "white",
        marginBottom: "2rem",
        maxWidth: "50%",
      }}
    >
      <h1 style={{ margin: "1rem", textAlign: "right" }}>
        {active ? "🟢" : error ? "🔴" : "🟠"}
      </h1>
      <ChainId />
      <BlockNumber />
      <Account />
      <Balance />
    </div>
  );
}

export default Header;
