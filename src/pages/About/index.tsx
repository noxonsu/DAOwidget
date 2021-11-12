import { useSpaceList } from "src/hooks/useSpaces";
import { shortenText } from "src/helpers/utils";

import FollowButton from "./FollowButton";

import { ReactComponent as ExternalLinkSvg } from "src/assets/svg/external-link.svg";

function About() {
  if (!window?.ENS_DOMAIN) window.ENS_DOMAIN = "sushigov.eth";

  const { spacesData, isLoading, error } = useSpaceList([window.ENS_DOMAIN]);

  const spaceData = spacesData[0];

  console.groupCollapsed("useSpaceList states");
  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("spaceData", spaceData);
  console.groupEnd();

  if (isLoading && !spaceData) {
    return <h1>Loading...</h1>;
  }

  if (!isLoading && spacesData.length === 0) {
    return <h1>Have not any space data.</h1>;
  }

  if (!spaceData) {
    return <h1>Please, try use another space or try reloar.</h1>;
  }

  const {
    name,
    about,
    domain,
    symbol,
    network,
    terms,
    strategies,
    admins,
    members,
  } = spaceData;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>About Page</h1>
      <FollowButton spaceObj={spaceData} />
      <div>
        {name && (
          <>
            <h3>Name</h3>
            <p>
              {name} {symbol && `(${symbol})`}
            </p>
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
            {strategies.map((strategy, index) => (
              <p key={index}>{strategy.name}</p>
            ))}
          </>
        )}
      </div>
      {admins.length && (
        <div>
          <h3>Admins</h3>
          {admins.map((admin, index) => (
            <p key={index}>{admin}</p>
          ))}
        </div>
      )}

      {members.length && (
        <div>
          <h3>Authors</h3>
          {members.map((members, index) => (
            <p key={index}>{members}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default About;
