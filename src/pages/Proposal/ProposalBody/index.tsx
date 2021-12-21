import MarkdownElement from "src/components/MarkdownElement";

type ProposalBodyProps = {
  description: string;
  title: string;
};

function ProposalBody(props: ProposalBodyProps) {
  const { description, title } = props;

  return (
    <div
      style={{
        marginBottom: "2rem",
      }}
    >
      {title && <h1 className="proposalTitle">{title}</h1>}
      <MarkdownElement text={description} />
    </div>
  );
}

export default ProposalBody;
