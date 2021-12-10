
import { ChangeEvent, useState } from "react";

import { useClient } from "src/hooks/useClient";
import { useSpaceList } from "src/hooks/useSpaces";
import PublishProposalButton from "./PublishProposalButton";

import "./index.scss";

type CreateProposalActionsType = {

};

function CreateProposalActions(props: CreateProposalActionsType) {
  const { } = props;

  const { spacesData, isLoading: isSpaceLoading } = useSpaceList([
    window.ENS_DOMAIN || "onout.eth",
  ]);

  const [selectedDuration, SetSelectedDuration] = useState(0)
  const { send, clientLoading } = useClient();

  console.groupCollapsed("CreateProposalActions")
  console.log('clientLoading', clientLoading)
  console.log('spacesData', spacesData, isSpaceLoading)
  console.groupEnd()

  const durationOptions = [
    {value: 0, text: "Duration:"},
    {value: 1, text: "1d"},
    {value: 3, text: "3d"},
    {value: 5, text: "5d"},
    {value: 7, text: "1w"},
    {value: 14, text: "2w"},
    {value: 28, text: "1m"},
  ]

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    SetSelectedDuration(parseInt(e.target.value))
  }

  const handleSubmit = async () => {

    const dateStart = 1639116000
    const dateEnd = 1639152000
    const space = spacesData[0]

    const NewProposal = {
      from: "0x01f69aefdb0ade89bc8f8dd9712c4cc4899621e2",
      space: "onout.eth",
      timestamp: 0,
      type: "single-choice",
      title: "test2",
      body: "test2",
      choices: ["For", "Against", "Abstain"],
      start: 0,
      end: 0,
      snapshot: 13321027,
      network: "56",
      strategies: [
        {
          "name": "erc20-balance-of",
          "params": {
            "symbol": "SWAP",
            "address": "0x92648e4537cdfa1ee743a244465a31aa034b1ce8",
            "decimals": 18
          }
        },
      ],
      plugins: {},
      metadata: {
        plugins:[]
      },
    }

    const dateNow = parseInt((Date.now() / 1e3).toFixed())

    NewProposal.timestamp = dateNow;

    NewProposal.start = space.voting?.delay
      ? dateNow + space.voting.delay
      : dateStart;

    NewProposal.end = space.voting?.period
      ? NewProposal.start + space.voting.period
      : dateEnd;


    const result = await send(spacesData[0], 'proposal', NewProposal);
    console.log('Result', result);
  }

  return (
    <>
      <div className="createActions">
        <div className="createActionsHeader">Actions</div>
        <div className="p-1">
          <div className="mb-1">
            <DropDown handleChange={handleDurationChange} selectedDuration={selectedDuration} options={durationOptions} />
          </div>
          <PublishProposalButton disable={selectedDuration === 0} onClick={handleSubmit} />
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
  }[]
}

function DropDown(props: DropDownProps) {

  const { handleChange, options } = props;

  return (
    <select className="actionDropdown textCenter" name='option' onChange={handleChange}>
      {options.map((option, i) => {
        return <option key={i} value={i}>{option.text}</option>
      })}
    </select>
  )
}

export default CreateProposalActions;
