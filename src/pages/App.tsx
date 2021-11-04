import { Route, Switch } from "react-router-dom";

import Account from "./Account";
import Proposal from "./Proposal";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/proposal/:proposalId" component={Proposal} />
        <Route component={Account} />
      </Switch>
    </div>
  );
}

export default App;
