import { ProposalType } from 'src/hooks/useProposals'

type ProposalInfoProps = {
  proposalData: ProposalType;
}

function ProposalInfo(props: ProposalInfoProps) {

  const { proposalData } = props;

  const { strategies, author, ipfs, start, end, snapshot } = proposalData;

  let tokenSymbol = '', tokenAddress = '';

  if (strategies?.length) {
    tokenSymbol = strategies[0].params.symbol;
    tokenAddress = strategies[0].params.address;
  }

  const haveContent = strategies?.length || author || ipfs

  return (
    <>
      {haveContent &&
        <div style={{
          padding: "0 1rem",
          border: "solid 1px gray",
          borderRadius: "1rem",
          marginBottom: "1rem",
        }}>
          <h2>Proposal Info</h2>
          {tokenSymbol && <p><b>Token symbol: </b>{`${tokenSymbol}`}</p>}
          {tokenAddress && <p><b>Token address: </b>{`${tokenAddress}`}</p>}
          {author && <p><b>Author: </b>{`${author}`}</p>}
          {ipfs && <p><b>IPFS: </b>{`${ipfs}`}</p>}
          {start && <p><b>Start date: </b>{`${new Date(start * 10**3).toUTCString()}`}</p>}
          {end && <p><b>End date: </b>{`${new Date(end * 10**3).toUTCString()}`}</p>}
          {snapshot && <p><b>Snapshot: </b>{`${snapshot}`}</p>}
        </div>
      }
    </>
  );
}

export default ProposalInfo;
