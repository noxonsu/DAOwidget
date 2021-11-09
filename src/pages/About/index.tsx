import { useSpaceList } from "src/helpers/hooks";
import { shortenText } from "src/helpers/utils";

import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";

function About() {
  if (!window?.ENS_DOMAIN) window.ENS_DOMAIN = "sushigov.eth";

  const spaceData = useSpaceList([window.ENS_DOMAIN])[0];

  console.log("spaceData", spaceData);

  if (!spaceData) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>About Page</h1>
        <p>
          Have not any space data, Please, try use another space or try reloar.
        </p>
      </div>
    );
  }

  const { name, about, domain, symbol, network, terms, strategies } = spaceData;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>About Page</h1>
      <div>
        {name && (
          <>
            <h3>Name</h3>
            <p>{name} {symbol && `(${symbol})`}</p>
          </>
        )}
        {about && (
          <>
            <h3>About</h3>
            <p>{about}</p>
          </>
        )}
        {domain && (
          <>
            <h3>Domain</h3>
            <a href={`https://${domain}`} target="_blank">
              {domain} <ExternalLinkSvg fill="white" />
            </a>
          </>
        )}
        {network && (
          <>
            <h3>Chain id</h3>
            <p>{network}</p>
          </>
        )}
        {terms && (
          <>
            <h3>Terms</h3>
            <a href={terms} target="_blank">
              {shortenText(terms, 35)} <ExternalLinkSvg fill="white" />
            </a>
          </>
        )}
        {strategies.length && (
          <>
            <h3>Strategie(s)</h3>
            {strategies.map((strategy) => (
              <p>{strategy.name}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default About;
