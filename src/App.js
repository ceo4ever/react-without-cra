import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import Header from "./Header";
import ReactIcon from "./assets/React.png";

function Home() {
  console.log(require("./assets/React.png"));
  const { pathname } = useLocation();
  return (
    <div>
      <p>{pathname}</p>
      <img src={ReactIcon} />
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/one" component={Home} />
          <Route path="/two" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
