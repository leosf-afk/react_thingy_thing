import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider, useDispatch } from 'react-redux' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
  NavLink
} from "react-router-dom"
import {
  formInputStyle,
  formButtonStyle,
  formStyle,
  cardStyle,
  ticketPriceStyle,
  ticketStyle,
  mainComponentsStyle,
  navBarSide,
  navBarButton,
  navBarButtonTextStyle,
  matchTeamsStyle,
  matchOddsStyle,
  individualOddStyle,
  matchStyle,
  rootStyle
} from "./styles";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

//api.post('/matches',  equipos);
//const res = await api.post('/tickets/generate',  data).catch(e => console.log(e));
//const res = await api.get("/tickets");
//const res = await api.post('/matches',  equipos);
//const res = await api.get("/matches");

const lg  = (wher, msg) => {
  console.log(wher)
  console.log(msg)
}

const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
  
    const onChange = (e) => setValue(e.target.value);
  
    return { value, setValue, onChange };
};

const matchReducer = (state = [], action) => {
  switch(action.type){
    case "NEW_MATCH":
      return [...state, action.data]
    case "GET_MATCHES":
      return action.data
    case "EDIT_MATCH":
      return state
    default: 
      return state
  }
}

const ticketReducer = (state = [], action) => {
  switch(action.type){
    case "NEW_TICKET":
      return [...state, action.data]
    case "GET_TICKETS":
      return action.data
    case "PAY_TICKET":
      return state
    default: 
      return state
  }
}

const tillReducer = (state = 0, action) => {
  switch(action.type){
    case "GET_TILL_AMOUNT":
      return action.amount
    case "UPDATE_TILL_AMOUNT":
      return state      
    default: 
      return state
  }
}

const ticketFilterReducer = (state="ALL",action) => {
  switch(action.type){
    case "SET_FILTER":
      return action.filter
    default:
      return state
  }
}

const matchFilterReducer = (state="ALL",action) => {
  switch(action.type){
    case "SET_FILTER":
      return action.filter
    default:
      return state
  }
}

const changeTicketFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter
  }
}
const changeMatchFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter
  }
}

//////////match actions
const addMatch = (data) => {
  return async dispatch => {
    const res = await api.post('/matches/add',  data);
    
    dispatch({
      type: "NEW_MATCH",
      data: res.data.match
    })
  }
}

const editMatchResult = (data) => {
  lg("EDIT REQ", data)
  return async dispatch => {
    const res = await api.put('/matches/edit',  data);
    
    dispatch({
      type: "EDIT_MATCH",
      data: res.data
    })
  }
}

const getMatches = () => {
    return async dispatch => {
    const res = await api.get("/matches")
    //const matches = 
    //    [
    //      {team1:"Boca", team2:"Racing",Odds:{"1":1.11,"x":3.33,"2":2.22}},
    //      {team1:"Banfield", team2:"Lanus",Odds:{"1":1.11,"x":3.33,"2":2.22}},
    //    ]
    lg("GET MATCHES", res)
    dispatch({
      type: "GET_MATCHES",
      data: res.data.matches
    })
  }
}

const getTill = () => {
  return async dispatch => {
    const res = await api.get("/till")
    lg("GET TILL", res)
    dispatch({
      type: "GET_TILL_AMOUNT",
      amount: res.data.data.amount
    })
  }
}


//////////ticket actions
const addTicket = (data) => {
  return async dispatch => {      
      const res = await api.post('/tickets/generate',  data);

        dispatch({
          type: "NEW_TICKET",
          data: res.data.data
      })
    
  }
}

const getTickets = () => {
  return async dispatch => {
    const res = await api.get("/tickets")
    lg("GET TICKETS", res)
    dispatch({
      type: "GET_TICKETS",
      data: res.data.tickets
    })
  }
}

const payTicket = (data) => {
  return async dispatch => {      
      const res = await api.post('/tickets/pay',  data);
      dispatch({
          type: "PAY_TICKET",
          data: res.data.data
      })
  }
}


const appReducer = combineReducers({
    matches: matchReducer,
    tickets: ticketReducer,
    till: tillReducer,
    matchFilter: matchFilterReducer,
    ticketFilter: ticketFilterReducer,
})

let PayButton = (props) => {
  const _payTicket = async (event) => {
    event.preventDefault()
    const data = 
    {
      id: props.ticket_id,
    }
    props.payTicket(data)
    window.location.reload(false);
  }

  switch(props.ticket_result){
    case "P":
      return(
        <div>Pending</div>
      )
    case "W":
      if(props.ticket_state !== "P"){
        return(
          <div>
            <form onSubmit={_payTicket}>
              <button style={formButtonStyle} type="submit">PAY</button>
            </form>
          </div>
        )
      } else {
        return(
          <div>
            PAID  
          </div>
        )
      }
    case "L":
      return(
        <div>Lost</div>
      )
    case "N":
      return(
        <div>Nulled</div>
      )
    default:  
      return(
       <div>Error</div>
      )
  }
}

PayButton = connect(null, {payTicket})(PayButton)

const Ticket = (props) => {
    const get_posible_price = () => {
      switch(props.data.bet){
        case "one":
          return props.data.amount*props.data.one;  
        case "two":
          return props.data.amount*props.data.two;
        case "x":
          return props.data.amount*props.data.x;
        default:
          return 0
      }
    }

    return (
      <div style={ticketStyle}>
        <div style={cardStyle}>
           <h3>{props.data.name} - {props.data.dni}</h3>
           {props.data.team1}-{props.data.team2}<br />
           bet: {props.data.bet} <br /> match result: {props.data.match_result}<br />
          <div style={ticketPriceStyle}>
           amount: ${props.data.amount} posible price: ${get_posible_price()}<br />
            
           </div>
           <PayButton 
            ticket_result={props.data.ticket_result}
            ticket_id={props.data.id}
            ticket_state={props.data.state}
            />
        </div>

           <br /><br />
        </div>
    )
}
//state: {props.data.state} <br />
let ViewTickets = (props) => {
    const _style = {
      width: "50%",
      backgroundColor: "#f9d56e",
    }

    lg("IN VIEW TICKERS", props)

    return (
      <div style={mainComponentsStyle}>
            <h2>Tickets</h2>  <Link to={"/tickets_add"}>ADD</Link>
            
            {props.tickets.map(t =>
              <Ticket
                key={t.id}
                data={t}
              />
            )}

        </div>
    )
}

const mapStateToViewTicketsProps = (state) => {
  
  lg("MAP STATE VIEWTICKETS", state)
  return {
    tickets: state.tickets
  }
}
ViewTickets = connect(mapStateToViewTicketsProps, null)(ViewTickets)


let AddTicket = (props) => {
    
    const _addTicket = async (event) => {
      event.preventDefault()
      console.log("in add _tick")
      const data = {
        name: event.target.name.value, 
        dni: event.target.dni.value,
        Tickets: 
        [{
            amount: event.target.amount.value,
            bet: event.target.bet.value,
            MatchId: event.target.partido.value
        }]
  
      }

      
      lg("add ticket data", data)
      
      props.addTicket(data)
      
      window.location.reload(false);
    }
//
//</form>
            
    return (
        
      <div style={mainComponentsStyle}>
            <h2>Add Ticket</h2>
            <form onSubmit={_addTicket}>
            Name<input style={formInputStyle} type="text" placeholder="name" name="name"/> 
            DNI<input style={formInputStyle} type="text" placeholder="dni" name="dni"/><br /> 
            Amount<input style={formInputStyle} type="text" placeholder="amount" name="amount"/> 
            Bet:<select style={formInputStyle} name="bet" id="bet">            
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="x">X</option>
              </select>
            
              <MatchesDropDown />
              <br />
              <button style={formButtonStyle} type="submit">Add</button>
              </form>

            
        </div>
    )
}

AddTicket = connect(
  null, 
  {addTicket}
)(AddTicket)

let EditMatchResult = (props) => {
  const comp_name=`result-${props.id}`;
  
  const _editMatch = async (event) => {
    const data = {
      id: props.id,
      result: event.target[comp_name].value,
    }
    
    lg("EDITMATCH", data)
    props.editMatchResult(data)
  }
  
  
  return (
    <div>
      <form onSubmit={_editMatch}>

        <select style={formInputStyle} name={comp_name} id="result">            
            <option value="-">-</option>
            <option value="one">1</option>
            <option value="two">2</option>
            <option value="x">X</option>
        </select>

        <button style={formButtonStyle} type="submit">Edit</button>
      </form>
    </div>

  )

}

EditMatchResult = connect(
  null, 
  {editMatchResult}
)(EditMatchResult)


const Match = ({id, result, team1, team2, odds, edit_mode}) => {
    console.log(odds)
    if(!edit_mode){
      return (
          <div style={matchStyle}>
              <div style={matchTeamsStyle}>
                {team1} - {team2} 
              </div>
              <br />
              <div style={matchOddsStyle}>
                <div style={individualOddStyle}>{odds.one}</div> 
                <div style={individualOddStyle}>{odds.x}</div> 
                <div style={individualOddStyle}>{odds.two}</div> 
              </div>
              <br />
              WINNER: {result}
              <br />
              <br />

          </div>
      )
    } else {
      return (
        <div>
            {team1} - {team2} <EditMatchResult id={id} result={result} />
        </div>
      )
    }
}

let ViewMatches = (props) => {
    //console.log(props)
    lg("VIEW MATCHES", props)
    const {matches} = props
    const [ editMode, setEditMode ] = useState(false)
    matches.edit_mode = editMode;

    const _style = {
      width: "50%",
      backgroundColor: "#f9d56e",
    }

    if(matches){
      return (
        
      <div style={mainComponentsStyle}>
        <Link to={"/matches_add"}>ADD</Link>
            <button onClick={() => setEditMode(!editMode)}>edit</button>
            <h2>Matches</h2>
            {matches.map(match =>
              <Match
                key={match.id}
                id={match.id}
                result={match.result}
                team1={match.team1}
                team2={match.team2}
                odds={match.Odd}
                edit_mode={editMode}
              />
            )}
            
        </div>
      )
  } else {
    return (
      <div style={_style}>No matches loaded yet</div>
    )
  }
}

const mapStateToViewMatchesProps = (state) => {
  
  lg("MAP STATE VIEW", state)
  return {
    matches: state.matches//getMatches()//api get matches
  }
}
ViewMatches = connect(mapStateToViewMatchesProps, null)(ViewMatches)


let AddMatch = (props) => {
    lg("PROPS_ADDMATCH", props)
    const _addMatch = async (event) => {
      console.log(event)
      event.preventDefault()
      const data = 
      {
        team1: event.target.team1.value,
        team2: event.target.team2.value,
        result: "-",
        Odd: {
          one:event.target.c1.value,
          two:event.target.c2.value,
          x:event.target.cx.value
        }
      } 
      console.log(data)
      
      event.target.team1.value = ''
      event.target.team2.value = ''
      
      event.target.c1.value = ''
      event.target.c2.value = ''
      event.target.cx.value = ''
      props.addMatch(data)
    }
  
    
    return (
        
      <div style={mainComponentsStyle}>
            <h2>Add Match</h2>
            <form onSubmit={_addMatch}>
                <h4>TEAMS:</h4>
                <input style={formInputStyle} type="text" placeholder="team1" name="team1" />
                <input style={formInputStyle} type="text" placeholder="team2" name="team2" />
                <br /> 
                <h4>ODDS:</h4>
                <input style={formInputStyle} type="text" placeholder="c1" name="c1"/>
                <input style={formInputStyle} type="text" placeholder="cx" name="cx" />
                <input style={formInputStyle} type="text" placeholder="c2" name="c2"/>
                <br /> 
            <button style={formButtonStyle} type="submit">Add</button>
            </form>


        </div>
    )
}

//esto podria ser abm generico: {alta:addMatch,baja:deleteMatch,modificacion:editMatch}
AddMatch = connect(
  null, 
  {addMatch}
)(AddMatch)

/////////////////////////////////////////////////////////////////

let MatchesDropDown = (props) => {
  //console.log(props)
  lg("MatchesDropDown", props)
  const {matches} = props
  //return (<div>ahre</div>)
  if(matches){
    return (
      <div>
          Match:
          <select style={formInputStyle} name="partido" id="partido">            
            {matches.map(m => 
            <option key={`${m.team1}-${m.team2}`} value={m.id}>{m.team1}-{m.team2}
            </option>)}
            
            </select>
      </div>
    )
  } else {
    return (
      <div>No matches loaded yet</div>
    )
  }
}

const mapStateToMatchesDropDownProps = (state) => {
  lg("MAP STATE VIEW", state)
  return {
    matches: state.matches
  }
}
MatchesDropDown = connect(mapStateToMatchesDropDownProps, null)(MatchesDropDown)

////////////////////////////////////////////////////////////////////////////////////////////

let Balance = (props) => {
   
    return (
      <div style={mainComponentsStyle}>
          <h3>Balance: ${props.amount}</h3>
      </div>
    )
}

const mapStateToBalanceProps = (state) => {
  
  lg("MAP BALANCE VIEW", state)
  return {
    amount: state.till
  }
}
Balance = connect(mapStateToBalanceProps, null)(Balance)

const Home = () => {
  return(
    <div></div>
  )
}

const NavBar = () => {
  return (
    <div style={navBarSide}>
        <br/>
        <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none' }}>
              <div style={navBarButton}>
                Home
              </div>
          </NavLink>
            
        <div className="ruler"></div>
        <br/>
         <NavLink
              exact
              to="/matches"
              style={{ textDecoration: 'none' }}>
              <div style={navBarButton}>
                   <span style={navBarButtonTextStyle}>Matches</span>
              </div>
          </NavLink>
          <br/>
        
          <div className="ruler"></div>
          
          <NavLink
              exact
              to="/tickets"
              style={{ textDecoration: 'none' }}>
              <div style={navBarButton}>
                Tickets
              </div>
          </NavLink>
          <br/>
        
          <div className="ruler"></div>
        
          <NavLink
              exact
              to="/balance"
              style={{ textDecoration: 'none' }}>
              
              
              <div style={navBarButton}>
                Balance
              </div>
          </NavLink>
          <br/>
        
    </div>
  )
}

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMatches())
      dispatch(getTickets())
      dispatch(getTill())
    },[dispatch]) 

    document.body.style = 'background-color: #e8505b;';

    return (
      
        <div style={rootStyle}>
          <div>
          <Router>
            <NavBar />

            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/matches" component={ViewMatches}/>
              <Route path="/tickets" component={ViewTickets}/>
              <Route path="/matches_add"><AddMatch /></Route>
              <Route path="/tickets_add"><AddTicket /></Route>
              <Route path="/balance" component={Balance}/>
            </Switch>
          
            
            </Router>
          </div>
    
            
        </div>
    )
}
//<ViewMatches />
//<AddMatch />
//
//<ViewTickets />
//<AddTicket />
//
//<br />    
//<Balance />

const store = createStore(
    appReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)