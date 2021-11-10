import { BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "./Account";
import Proposal from "./Proposal";
import Proposals from "./Proposals";
import About from "./About";
import CreateProposal from "./CreateProposal";

import Header from "../components/Header";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Proposals />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
            <Route path="proposal">
              <Route path="create" element={<CreateProposal />} />
              <Route path=":proposalId" element={<Proposal />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
