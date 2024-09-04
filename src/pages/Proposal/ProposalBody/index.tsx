import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MarkdownElement from "src/components/MarkdownElement";
import { useClient } from "src/hooks/useClient";
import { ProposalType } from "src/hooks/useProposals";
import { Space, useSpaceList } from "src/hooks/useSpaces";
import { Library } from "src/utils/getLibrary";
import { translate } from 'src/utils/translate'

type ProposalBodyProps = {
  proposal: ProposalType;
};

function ProposalBody(props: ProposalBodyProps) {
  const { proposal } = props;
  const { title, body, state, space } = proposal;

  const navigate = useNavigate();
  const { send } = useClient();
  const { spacesData } = useSpaceList([space.id]);
  const { active, account = "" } = useWeb3React<Library>();

  const spaceData = spacesData[0];

  const isAdmin = useMemo(() => {
    const admins = (spaceData?.admins || []).map((admin) =>
      admin.toLowerCase()
    );
    return account !== null && admins.includes(account.toLowerCase());
  }, [spaceData?.admins, account]);

  const isCreator = useMemo(() => {
    return account !== null && proposal?.author === account;
  }, [proposal.author, account]);

  const showDeleteButton = active && (isAdmin || isCreator);

  const haveHeader = !!state;

  const deleteProposal = async () => {
    const result = (await send(space as Space, "delete-proposal", {
      proposal,
    })) as any;
    if (result.id) {
      console.log("Succesfyly delete proposal with id:", proposal);
      navigate("/");
    }
  };

  return (
    <div>
      {title && <h1 className="proposalTitle">{title}</h1>}
      {haveHeader && (
        <div className="proposalHeader">
          {state && <span className="proposalState floatLeft">{state}</span>}
          {showDeleteButton && (
            <button
              className="deleteButton floatRight"
              onClick={deleteProposal}
            >
              {translate('proposal_delete', 'delete')}
            </button>
          )}
        </div>
      )}
      {body && <MarkdownElement text={body} />}
    </div>
  );
}

export default ProposalBody;
