import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider, useDispatch } from 'react-redux' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from "axios";
import {formInputStyle,formButtonStyle,formStyle} from "./styles";

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
        lg("MATCH REDUCER - GET MATCHES", action.data)
        return action.data
    default: 
      return state
  }
}

const ticketReducer = (state = [], action) => {
  switch(action.type){
    case "NEW_TICKET":
      lg("NEWTICKET", state)
      return state
    case "GET_TICKETS":
      lg("TICKETS REDUCER - GET TICKETS", action.data)
      return action.data

    default: 
      return state
  }
}

const tillReducer = (state = [], action) => {
  switch(action.type){
    case "GET_TILL_AMOUNT":
      return state
    case "UPDATE_TILL_AMOUNT":
      return state
      
    default: 
      return state
  }
}

//////////match actions
const addMatch = (data) => {
  return async dispatch => {
    const res = await api.post('/matches/add',  data);
    //const new_match = {team1:"San Lorenzo", team2:"Independiente",Odds:{"1":1.11,"x":3.33,"2":2.22}}
    dispatch({
      type: "NEW_MATCH",
      data: res.data.match
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

//////////ticket actions
const addTicket = (data) => {
  return async dispatch => {
    const res = await api.post('/tickets/generate',  data);
    
    //const new_match = {team1:"San Lorenzo", team2:"Independiente",Odds:{"1":1.11,"x":3.33,"2":2.22}}
    console.log(data)
    dispatch({
      type: "NEW_TICKET",
      data: {}
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

const updateMatchResult = (data) => {
  return async dispatch => {
    const res = await api.put('/matches/update',  data);
    
    dispatch({
      type: "UPDATE_MATCH",
      data: res.data.match
    })
  }
}

const appReducer = combineReducers({
    matches: matchReducer,
    tickets: ticketReducer,
    till: tillReducer,
})

const Ticket = (props) => {
   lg("!!!!!!!!!!!!!!!!!!", props)
    
    return (
        <div>
           person: {props.data.name} dni:{props.data.dni}<br />
           match: {props.data.team1}-{props.data.team2}<br />
           bet: {props.data.bet} match result: {props.data.match_result}<br />
           amount: ${props.data.amount}<br />
           state: {props.data.state} <br />
           <br /><br />
        </div>
    )
}

let ViewTickets = (props) => {
    const _style = {
      width: "50%",
      backgroundColor: "#f9d56e",
    }

    lg("IN VIEW TICKERS", props)

    
    return (
        <div style={_style}>
            <h2>tickets:</h2>
            
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
    
    const _addTicket = (event) => {
      console.log("in add _tick")
      lg("add ticket Event value", event.target.partido.value)
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
      
      props.addTicket(data)
    }

    return (
        <div style={formStyle}>
            <h2>Add Ticket:</h2>
            <form onSubmit={_addTicket}>
            Name<input style={formInputStyle} type="text" placeholder="name"/>
            DNI<input style={formInputStyle} type="text" placeholder="dni"/> 
            Amount<input style={formInputStyle} type="text" placeholder="amount"/>
              <MatchesDropDown />
              <select name="bet" id="bet">            
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="X">X</option>
              </select>
            
              <button style={formButtonStyle} type="submit">Add</button>
            

            </form>

        </div>
    )
}

AddTicket = connect(
  null, 
  {addTicket}
)(AddTicket)


const Match = ({team1, team2, odds}) => {
    console.log(odds)
    return (
        <div>
            {team1} - {team2} 
            <select>
                <option value="1">1</option>
                <option value="X">X</option>
                <option value="2">2</option>
            </select>
            <br />
              1: {odds.one} - x: {odds.x} - 2: {odds.two}
            <br />
            
        </div>
    )
}

let ViewMatches = (props) => {
    //console.log(props)
    lg("VIEW MATCHES", props)
    const {matches} = props
    //return (<div>ahre</div>)
    const _style = {
      width: "50%",
      backgroundColor: "#f9d56e",
    }
    if(matches){
      return (
        <div style={_style}>
            <h2>Matches:</h2>
            {matches.map(match =>
              <Match
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                odds={match.Odd}
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
      props.addMatch(data)
    }
  
    const team2_str = "taratata";
    return (
        <div style={formStyle}>
            <h2>Add Match</h2>
            <form onSubmit={_addMatch}>
                <h4>TEAMS:</h4>
                <input style={formInputStyle} type="text" placeholder="team1" name="team1" />
                <input style={formInputStyle} type="text" placeholder="team2" name="team2" value={team2_str} />
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

const Balance = () => {
    
    return (
        <div>
            Balance: 0
        </div>
    )
}

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMatches())
      dispatch(getTickets())
    },[dispatch]) 

    return (
        <div style={{backgroundColor: "#e8505b"}}>
            <ViewMatches />
            <AddMatch />
            
            <ViewTickets />
            <AddTicket />

        <br />    
        <Balance />    
        </div>
    )
}

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