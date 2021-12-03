import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { ProposalType } from "src/hooks/useProposals";

import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";
import { shortEVMAddress, shortIPFS } from "src/helpers/utils";
import ExternalLink from "src/components/ExternalLink";

type ProposalInfoProps = {
  proposalData: ProposalType;
};

function ProposalInfo(props: ProposalInfoProps) {
  const { proposalData } = props;

  const { strategies, author, ipfs, start, end, snapshot, network } =
    proposalData;

  const networkId = +network as SupportedChainId;

  let tokenSymbol = "",
    tokenAddress = "";

  if (strategies?.length) {
    tokenSymbol = strategies[0].params.symbol;
    tokenAddress = strategies[0].params.address;
  }

  const haveContent = strategies?.length || author || ipfs;

  return (
    <>
      {haveContent && (
        <div
          style={{
            padding: "0 1rem",
            border: "solid 1px gray",
            borderRadius: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h2>Proposal Info</h2>
          {tokenSymbol && (
            <p>
              <b>Token symbol: </b>
              {`${tokenSymbol}`}
            </p>
          )}
          {tokenAddress && (
            <p>
              <b>Token address: </b>
              {network ? (
                <ExternalLink
                  link={`${NETWORK_EXPLORER_URLS[networkId]}address/${tokenAddress}`}
                  children={shortEVMAddress(tokenAddress)}
                />
              ) : (
                tokenAddress
              )}
            </p>
          )}
          {author && (
            <p>
              <b>Author: </b>
              {network ? (
                <ExternalLink
                  link={`${NETWORK_EXPLORER_URLS[networkId]}address/${author}`}
                  children={shortEVMAddress(author)}
                />
              ) : (
                author
              )}
            </p>
          )}
          {ipfs && (
            <p>
              <b>IPFS: </b>
              <ExternalLink
                link={`https://cloudflare-ipfs.com/ipfs/${ipfs}`}
                children={shortIPFS(ipfs)}
              />
            </p>
          )}
          {start && (
            <p>
              <b>Start date: </b>
              {`${new Date(start * 10 ** 3).toUTCString()}`}
            </p>
          )}
          {end && (
            <p>
              <b>End date: </b>
              {`${new Date(end * 10 ** 3).toUTCString()}`}
            </p>
          )}
          {snapshot && (
            <p>
              <b>Snapshot: </b>
              {network ? (
                <ExternalLink
                  link={`${NETWORK_EXPLORER_URLS[networkId]}block/${snapshot}`}
                  children={snapshot}
                />
              ) : (
                snapshot
              )}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default ProposalInfo;
