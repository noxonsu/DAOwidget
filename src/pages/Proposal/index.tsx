import { useParams } from "react-router-dom";

import { ProposalType, useProposal } from "src/hooks/useProposals";
import { useVoutes } from "src/hooks/useVoutes";
// import { useVoutes } from "src/hooks/useVoutes";
import ProposalBody from "./ProposalBody";
import ProposalInfo from "./ProposalInfo";
import ProposalResults from "./ProposalResults";

type ParamsProps = {
  proposalId?: string;
};

function ProposalDetail() {
  const { proposalId = "" } = useParams() as ParamsProps;

  const { proposalData, isLoading, error } = useProposal(proposalId);

  const {
    title,
    body,
    id,
    space,
    snapshot,
    network,
    strategies,
    state,
  } = proposalData;

  const haveDataForFetchVoutes = !!(id && space?.id && snapshot && network && strategies?.length && state)

  return (
    <div style={{ paddingBottom: "2rem" }}>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error.message}</h3>}
      <ProposalBody title={title} description={body || ""} />
      <ProposalInfo proposalData={proposalData} />
      {haveDataForFetchVoutes && <ProposalVoutesContent proposalData={proposalData} />}
    </div>
  );
}

type ProposalVoutesContentProps = {
  proposalData: ProposalType
}

function ProposalVoutesContent(props: ProposalVoutesContentProps) {
  const { proposalData } = props;

  const { voutesData, resultData, isLoading, error } = useVoutes(proposalData);

  return(
    <>
      {error && <h3>{error.message}</h3>}
      {isLoading
        ? <h3>Loading votes...</h3>
        : (
          <>
            {resultData && <ProposalResults strategies={proposalData.strategies} choices={proposalData.choices} results={resultData} />}
          </>
        )
      }
    </>
  )
}

export default ProposalDetail;
