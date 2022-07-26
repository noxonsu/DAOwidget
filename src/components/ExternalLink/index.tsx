import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";
import { ReactComponent as IconInfo } from "src/assets/svg/icon-info.svg";

type ExternalLinkProps = {
  link: string;
  children: any;
  className?: string;
  styles?: IUniversalObj;
  withIconInfo?: boolean;
};

function ExternalLink(props: ExternalLinkProps) {
  const { link, children, className, styles = {}, withIconInfo } = props;

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
      {withIconInfo && (
        <IconInfo
          fill={fillColor}
          style={{ position: "absolute", width: "1.2rem", height: "1rem" }}
        />
      )}
      <ExternalLinkSvg
        fill={fillColor}
        style={{ position: "absolute", marginLeft: withIconInfo ? "1rem" : undefined, width: "1.2rem", height: "1rem" }}
      />
    </a>
  );
}

export default ExternalLink;
