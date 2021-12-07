import singleChoice from "./singleChoice";
import approval from "./approval";
import quadratic from "./quadratic";
import rankedChoice from "./rankedChoice";
import weighted from "./weighted";

const Votings = {
  "single-choice": singleChoice,
  // approval,
  // quadratic,
  // 'ranked-choice': rankedChoice,
  // weighted,
  basic: singleChoice,
};

export default Votings;
