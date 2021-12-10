import { ChangeEvent } from "react";

import "./index.scss";

type CreateProposalBodyTextAreaProps = {
  className?: string;
  placeholder?: string;
  onSetValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

function CreateProposalBodyTextArea(props: CreateProposalBodyTextAreaProps) {
  const { className = "", placeholder = "", onSetValue } = props;

  const handleKeyDown = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Reset field height
    e.target.style.height = "inherit";

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    e.target.style.height = `${height}px`;

    onSetValue(e);
  };

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      onChange={(e) => handleKeyDown(e)}
    />
  );
}

export default CreateProposalBodyTextArea;
