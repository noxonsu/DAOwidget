
type ProposalInfoProps = {
  tokenSymbol: string
  tokenAddress: string
}

function ProposalInfo(props: ProposalInfoProps) {

  const { tokenSymbol, tokenAddress } = props

  return (
    <div style={{ padding: "0" }}>
      <p>{`Token symbol: ${tokenSymbol}`}</p>
      <p>{`Token address: ${tokenAddress}`}</p>
    </div>
  );
}

export default ProposalInfo;
