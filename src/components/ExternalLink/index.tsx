import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";

type ExternalLinkProps = {
  link: string;
  children: any;
  styles?: IUniversalObj;
};

function ExternalLink(props: ExternalLinkProps) {
  const { link, children, styles = {} } = props;

  return (
    <a href={link} target="_blank" rel="noreferrer" style={styles}>
      {children}{" "}
      <ExternalLinkSvg
        fill="white"
        style={{ position: "absolute", width: "1.5rem", height: "1rem" }}
      />
    </a>
  );
}

export default ExternalLink;
