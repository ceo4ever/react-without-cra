import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import Header from "./Header";

function Home() {
  const { pathname } = useLocation();
  return <>{pathname}</>;
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
