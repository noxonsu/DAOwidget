import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { ProposalType } from "src/hooks/useProposals";

import { shortEVMAddress, shortIPFS } from "src/helpers/utils";
import ExternalLink from "src/components/ExternalLink";

import { formatDate } from "src/utils/formatDate"
import { translate } from 'src/utils/translate'

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
        <div className="app-widget">
          <div className="app-widget-header">
            {translate('proposal_info', 'Proposal Info')}
          </div>
          <div className="p-1">
            {tokenSymbol && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_token_symbol', 'Token symbol:')} </b>
                {`${tokenSymbol}`}
              </div>
            )}
            {tokenAddress && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_token_address', 'Token address:')} </b>
                {network ? (
                  <ExternalLink
                    link={`${NETWORK_EXPLORER_URLS[networkId]}address/${tokenAddress}`}
                    children={shortEVMAddress(tokenAddress)}
                  />
                ) : (
                  tokenAddress
                )}
              </div>
            )}
            {author && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_autor','Author:')} </b>
                {network ? (
                  <ExternalLink
                    link={`${NETWORK_EXPLORER_URLS[networkId]}address/${author}`}
                    children={shortEVMAddress(author)}
                  />
                ) : (
                  author
                )}
              </div>
            )}
            {ipfs && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_ipfs', 'IPFS:')} </b>
                <ExternalLink
                  link={`https://cloudflare-ipfs.com/ipfs/${ipfs}`}
                  children={shortIPFS(ipfs)}
                />
              </div>
            )}
            {start && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_start_date', 'Start date:')} </b>
                {window.TIME_ZONE_CUSTOM ? (
                  <>{formatDate(start * 10 ** 3)}</>
                ) : (
                  <>{`${new Date(start * 10 ** 3).toUTCString()}`}</>
                )}
              </div>
            )}
            {end && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_end_date', 'End date:')} </b>
                {window.TIME_ZONE_CUSTOM ? (
                  <>{formatDate(end * 10 ** 3)}</>
                ) : (
                  <>{`${new Date(end * 10 ** 3).toUTCString()}`}</>
                )}
              </div>
            )}
            {snapshot && (
              <div className="app-widget-item">
                <b>{translate('proposal_info_snapshot', 'Snapshot:')} </b>
                {network ? (
                  <ExternalLink
                    link={`${NETWORK_EXPLORER_URLS[networkId]}block/${snapshot}`}
                    children={snapshot}
                  />
                ) : (
                  snapshot
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProposalInfo;
