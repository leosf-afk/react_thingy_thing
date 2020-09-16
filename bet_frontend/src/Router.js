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


const AppRouter = () => (
    <Router>
      <Link to="/matches">Matches</Link>

      <Switch>
        <Route path="/matches" component={ViewMatches} />
      </Switch>

    </Router>
  );
  
export default AppRouter;