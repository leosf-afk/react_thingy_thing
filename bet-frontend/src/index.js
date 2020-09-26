import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider, useDispatch } from 'react-redux' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from "axios";

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
    default: 
      return state
  }
}


const addMatch = (data) => {
  return async dispatch => {
    //const new_match = await api.addMatch(data)..
    const new_match = {team1:"San Lorenzo", team2:"Independiente",Odds:{"1":1.11,"x":3.33,"2":2.22}}
    dispatch({
      type: "NEW_MATCH",
      data: new_match
    })
  }
}

const getMatches = () => {
    return async dispatch => {
    //const new_match = await api.addMatch(data)..
    const matches = 
        [
          {team1:"Boca", team2:"Racing",Odds:{"1":1.11,"x":3.33,"2":2.22}},
          {team1:"Banfield", team2:"Lanus",Odds:{"1":1.11,"x":3.33,"2":2.22}},
        ]
      
    dispatch({
      type: "GET_MATCHES",
      data: matches
    })
  }

}

const appReducer = combineReducers({
    matches: matchReducer,
    tickets: ticketReducer
})

const Ticket = () => {
    
    return (
        <div>
            ticket
        </div>
    )
}

const ViewTickets = () => {
    
    return (
        <div>
            tickets:
            <Ticket />
            <Ticket />
            <Ticket />
        </div>
    )
}

const AddTicket = ({dispatch}) => {
    
    return (
        <div>
            add ticket
        </div>
    )
}


const Match = ({team1, team2}) => {
    
    return (
        <div>
            {team1} - {team2} 
            <select>
                <option value="1">1</option>
                <option value="X">X</option>
                <option value="2">2</option>
            </select>
            
        </div>
    )
}

let ViewMatches = (props) => {
    //console.log(props)
    lg("VIEW MATCHES", props)
    const {matches} = props
    //return (<div>ahre</div>)
    if(matches){
      return (
        <div>
            matches:
            {matches.map(match =>
              <Match
                key={match.id}
                team1={match.team1}
                team2={match.team2}
              />
            )}
            
        </div>
      )
  } else {
    return (
      <div>No matches loaded yet</div>
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
    lg("PROPS_ADDMATHC", props)
    const _addMatch = async (event) => {
      console.log(event)
      event.preventDefault()
      const data = 
      {
        team1: event.target.team1.value
      } 
      console.log(data)
      
      event.target.team1.value = ''
      event.target.team2.value = ''
      props.addMatch(data)
    }
  
    return (
        <div>
            add Match
            <form onSubmit={_addMatch}>
                <input type="text" placeholder="team1" name="team1" />
                <input type="text" placeholder="team2" name="team2" />
                <br /> 
                <input type="text" placeholder="c1" name="c1"/>
                <input type="text" placeholder="cx" name="cx" />
                <input type="text" placeholder="c2" name="c2"/>
            <button type="submit">Add</button>
            </form>

        </div>
    )
}

AddMatch = connect(
  null, 
  {addMatch}
)(AddMatch)

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
  },[dispatch]) 

    return (
        <div>
        <h1>Matches</h1>
            <ViewMatches />
            <AddMatch />
            
        <h1>Tickets</h1>
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