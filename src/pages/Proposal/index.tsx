import { useParams } from "react-router-dom";

import { ProposalType, useProposal } from "src/hooks/useProposals";
import { useVotes } from "src/hooks/useVotes";
import ProposalBody from "./ProposalBody";
import ProposalInfo from "./ProposalInfo";
import ProposalResults from "./ProposalResults";
import ProposalVotes from "./ProposalVotes";
import ProposalVoting from "./ProposalVoting";

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
    choices,
  } = proposalData;

  const haveDataForFetchVotes = !!(
    id &&
    space?.id &&
    snapshot &&
    network &&
    strategies?.length &&
    state
  );

  return (
    <div style={{ paddingBottom: "2rem" }}>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error.message}</h3>}
      <ProposalBody title={title} description={body || ""} />
      {choices && state !== "close" && <ProposalVoting choices={choices} />}
      <ProposalInfo proposalData={proposalData} />
      {haveDataForFetchVotes && (
        <ProposalVotesContent proposalData={proposalData} />
      )}
    </div>
  );
}

type ProposalVotesContentProps = {
  proposalData: ProposalType;
};

function ProposalVotesContent(props: ProposalVotesContentProps) {
  const { proposalData } = props;

  const { votesData, resultData, isLoading, error } = useVotes(proposalData);

  return (
    <>
      {error && <h3>{error.message}</h3>}
      {isLoading ? (
        <h3>Loading votes...</h3>
      ) : (
        votesData.length && (
          <>
            {resultData && (
              <ProposalResults
                strategies={proposalData.strategies}
                choices={proposalData.choices}
                results={resultData}
              />
            )}
            <ProposalVotes
              choices={proposalData.choices}
              votes={votesData.slice(0, 10)}
              strategies={proposalData.strategies}
              totalVotes={votesData.length}
            />
          </>
        )
      )}
    </>
  );
}

export default ProposalDetail;
