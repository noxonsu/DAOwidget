
import { ChangeEvent, useState } from "react";

import { useClient } from "src/hooks/useClient";
import PublishProposalButton from "./PublishProposalButton";

import "./index.scss";

type CreateProposalActionsType = {

};

function CreateProposalActions(props: CreateProposalActionsType) {
  const { } = props;

  const [selectedDuration, SetSelectedDuration] = useState(0)
  const { send, clientLoading } = useClient();

  console.log('clientLoading', clientLoading)

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
    //const result = await send(props.space, 'proposal', form.value);
    //console.log('Result', result);
  }

  return (
    <>
      <div className="createActions">
        <div className="createActionsHeader">Actions</div>
        <div className="p-1">
          <div className="mb-1">
            <DropDown handleChange={handleDurationChange} selectedDuration={selectedDuration} options={durationOptions} />
          </div>
          <PublishProposalButton disable={selectedDuration === 0} />
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
