import { Route, Switch } from 'react-router-dom';


import Header from "../components/Header";
import ConnectProviders from "../components/Providers";

import "./App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route component={ConnectProviders} />
      </Switch>
    </div>
  );
}

export default function () {
  return (
      <App />
  );
}
