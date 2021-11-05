import { Route, Switch } from "react-router-dom";

import Account from "./Account";
import Proposal from "./Proposal";
import Proposals from "./Proposals";
import About from "./About";
import CreateProposal from "./CreateProposal";

import Header from "../components/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact strict path="/account" component={Account} />
        <Route exact strict path="/about" component={About} />
        <Route
          exact
          strict
          path="/proposal/create"
          component={CreateProposal}
        />
        <Route exact strict path="/proposal/:proposalId" component={Proposal} />
        <Route component={Proposals} />
      </Switch>
    </div>
  );
}

export default App;
