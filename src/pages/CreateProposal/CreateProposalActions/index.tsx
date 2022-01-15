import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBlockNumber, getProvider } from "src/helpers/utils/web3";
import { useClient } from "src/hooks/useClient";
import { useSpaceList } from "src/hooks/useSpaces";
import PublishProposalButton from "./PublishProposalButton";

import "./index.scss";

type CreateProposalActionsType = {
  title: string;
  body: string;
};

function CreateProposalActions(props: CreateProposalActionsType) {
  const navigate = useNavigate();

  const { spacesData, isLoading: isSpaceLoading } = useSpaceList([
    window.ENS_DOMAIN || "onout.eth",
  ]);

  const [selectedDuration, setSelectedDuration] = useState(0);
  const { send, clientLoading } = useClient();

  const [isWaitResponse, setIsWaitResponse] = useState(false);

  console.groupCollapsed("CreateProposalActions");
  console.log("clientLoading", clientLoading);
  console.log("spacesData", spacesData, isSpaceLoading);
  console.groupEnd();

  const durationOptions = [
    { value: 0, text: "Duration:" },
    { value: 86400, text: "1d" },
    { value: 259200, text: "3d" },
    { value: 432000, text: "5d" },
    { value: 604800, text: "1w" },
    { value: 1209600, text: "2w" },
    { value: 2419200, text: "1m" },
  ];

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    const space = spacesData[0];

    const network = window.NETWORK_ID || space.network;

    setIsWaitResponse(true);

    try {
      const snapshot = await getBlockNumber(getProvider(network));

      const strategyParams = {
        symbol: window.TOKEN_SYMBOL,
        address: window.TOKEN_ADDRESS,
        decimals: parseInt(window.TOKEN_DECIMALS),
      };

      const dateNow = parseInt((Date.now() / 1e3).toFixed());

      const dateStart = space.voting?.delay
        ? dateNow + space.voting.delay
        : dateNow;

      const dateEnd = space.voting?.period
        ? dateStart + space.voting.period
        : dateStart + durationOptions[selectedDuration].value || 3600;

      const { title, body } = props;

      const NewProposal = {
        title,
        body,
        snapshot,
        network,
        choices: ["For", "Against", "Abstain"],
        strategies: [
          {
            name: "erc20-balance-of",
            params: strategyParams,
          },
        ],
        type: "single-choice",
        plugins: {},
        metadata: {
          plugins: [],
        },
        timestamp: 0,
        start: dateStart,
        end: 0,
      };

      NewProposal.timestamp = dateNow;

      NewProposal.end = space.voting?.period
        ? NewProposal.start + space.voting.period
        : dateEnd;

      const result = (await send(space, "proposal", NewProposal)) as any;
      console.log("Result", result);

      setIsWaitResponse(false);
      navigate(`/proposal/${result.id}`);
    } catch (error: any) {
      console.error(`Can't submit proposal. Error: ${error.message || error}`);
      setIsWaitResponse(false);
    }
  };

  return (
    <>
      <div className="app-widget">
        <div className="app-widget-header">Actions</div>
        <div className="p-1">
          <div className="mb-1">
            <DropDown
              handleChange={handleDurationChange}
              selectedDuration={selectedDuration}
              options={durationOptions}
            />
          </div>
          <PublishProposalButton
            disable={selectedDuration === 0}
            onClick={handleSubmit}
            isLoading={clientLoading || isWaitResponse}
          />
        </div>
      </div>
    </>
  );
}

type DropDownProps = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedDuration: number;
  options: {
    text: string;
    value: number;
  }[];
};

function DropDown(props: DropDownProps) {
  const { handleChange, options } = props;

  return (
    <select
      className="actionDropdown textCenter"
      name="option"
      onChange={handleChange}
    >
      {options.map((option, i) => {
        return (
          <option key={i} value={i}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
}

export default CreateProposalActions;
