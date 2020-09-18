import React from "react";
import {connect} from "react-redux"
import {
  BrowserRouter as Router,
  Route,
  Link,
  //Redirect,
  Switch,
} from "react-router-dom";
import ViewMatches from "./pages/ViewMatches";
import AddMatch from "./pages/AddMatch";


const AppRouter = () => (
    <Router>
      <Link to="/matches">Matches</Link>
      <Link to="/add_match">Add Match</Link>

      <Switch>
        <Route path="/matches" component={ViewMatches} />
        <Route path="/add_match" component={AddMatch} />
      </Switch>

    </Router>
  );
  
export default AppRouter;