import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux';

const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
  
    const onChange = (e) => setValue(e.target.value);
  
    return { value, setValue, onChange };
};


const appReducer = combineReducers({
    
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

const ViewMatches = () => {
    
    return (
        <div>
            matches:
            <Match />
            <Match />
            <Match />
        </div>
    )
}

const AddMatch = ({dispatch}) => {
    const team1 = {}
    const team2 = {}
    const cotizacion1 = {}
    const cotizacionx = {}
    const cotizacion2 = {}
    return (
        <div>
            add Match
            <form onSubmit={()=>{}}>
                <input
                   type="text"
                   placeholder="team1"
                   value={team1.value}
                   onChange={team1.onChange}
                />
                <input
                   type="text"
                   placeholder="team2"
                   value={team2.value}
                   onChange={team2.onChange}
                />
                <br /> 
                <input
                   type="text"
                   placeholder="c1"
                   value={cotizacion1.value}
                   onChange={cotizacion1.onChange}
                />
                
                <input
                   type="text"
                   placeholder="cx"
                   value={cotizacionx.value}
                   onChange={cotizacionx.onChange}
                />
                
                <input
                   type="text"
                   placeholder="c2"
                   value={cotizacion2.value}
                   onChange={cotizacion2.onChange}
                />
            <button type="submit">Add</button>
            </form>

        </div>
    )
}

const Balance = () => {
    
    return (
        <div>
            Balance: 0
        </div>
    )
}

const App = () => {
    //const dispatch  = useDispatch()
    //useEffect(() => {
    //}, [dispatch])


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

export default App