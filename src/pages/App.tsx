import { Route, Switch } from 'react-router-dom';

import ConnectProviders from "../components/Providers";

import "./App.css";

function App() {

  return (
    <div className="App">
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
