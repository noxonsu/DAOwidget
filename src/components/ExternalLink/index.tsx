import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";

type ExternalLinkProps = {
  link: string;
  children: any;
  className?: string;
  styles?: IUniversalObj;
};

function ExternalLink(props: ExternalLinkProps) {
  const { link, children, className, styles = {} } = props;

  const fillColor =
    window.COLOR_TEMPLATE === "dark_template" ? "white" : "dark";

  return (
    <a
      className={className || ""}
      href={link}
      target="_blank"
      rel="noreferrer"
      style={styles}
    >
      {children}{" "}
      <ExternalLinkSvg
        fill={fillColor}
        style={{ position: "absolute", width: "1.2rem", height: "1rem" }}
      />
    </a>
  );
}

export default ExternalLink;
