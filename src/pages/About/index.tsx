import { useSpaceList } from "src/helpers/hooks";

function About() {
  if (!window?.ENS_DOMAIN) window.ENS_DOMAIN = "aave.eth";

  const spaces = useSpaceList([window.ENS_DOMAIN]);

  console.log("spaces", spaces)

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>About Page</h1>
    </div>
  );
}

export default About;
