import { BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "./Account";
import Proposal from "./Proposal";
import Proposals from "./Proposals";
import About from "./About";
import CreateProposal from "./CreateProposal";
import NotFound from "./NotFound";

import Web3ReactManager from "src/components/Web3ReactManager";
import Header from "../components/Header";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Web3ReactManager>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Web3ReactManager>
    </BrowserRouter>
  );
}

export default App;
