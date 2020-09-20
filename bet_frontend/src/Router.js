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
import GenerateTicket from "./pages/GenerateTicket";


const AppRouter = () => (
    <Router>
      <Link to="/matches">Matches</Link>
      <Link to="/add_match">Add Match</Link>
      <Link to="/generate_ticket">Generate Ticket</Link>

      <Switch>
        <Route path="/matches" component={ViewMatches} />
        <Route path="/add_match" component={AddMatch} />
        <Route path="/generate_ticket" component={GenerateTicket} />
      </Switch>

    </Router>
  );
  
export default AppRouter;