import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Article from "./pages/Articles";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Article} />
        <Route exact path="/articles" component={Saved} />
        <Route exact path="/articles/:id" component={Saved} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
