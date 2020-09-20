import React, {useEffect,useState} from "react";
import {generateTicket, getMatches} from "../actions"
import {connect} from "react-redux";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
      //console.log(value)
      setValue(e.target.value);
  }

  return { value, setValue, onChange };
};

const GenerateTicket = ({isFetching, matches, getMatches, generateTicket}) => {
    useEffect(()=>{
        getMatches()
    },[getMatches])

    //console.log(matches)
    
    const name = useInput("");
    const dni = useInput("");
    const partido = useInput("");
    const amount = useInput("");
    const bet = useInput("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        //const payload = {
        //    team1: team1.value,
        //    team2: team2.value
        //}

        //console.log("PAYLOAD")
        //console.log(payload)

        const ticketData = {
            "name": name.value, 
            "dni": dni.value,
            "Tickets": 
            [{
                "amount": 23300.00,
                "bet": bet.value,
                "MatchId": partido.value
            }]
        }

        console.log(ticketData)
        generateTicket(ticketData);
        name.setValue("");
        dni.setValue("");
        amount.setValue("");
    }

    if(!isFetching){
    return (
        <div>
            <h2>Create Ticket</h2>
            <form onSubmit={handleSubmit}>
            
            <input
                   type="text"
                   placeholder="name"
                   value={name.value}
                   onChange={name.onChange}
                />
                <input
                   type="text"
                   placeholder="dni"
                   value={dni.value}
                   onChange={dni.onChange}
                /> <br/>
                
                <input
                   type="text"
                   placeholder="amount"
                   value={amount.value}
                   onChange={amount.onChange}
                />
            


            <select name="partido" id="partido"
                   value={partido.value}
                   onChange={partido.onChange}
            >
            
            {matches.matches.data.map(m => <option key={`${m.team1}-${m.team2}`} value={m.id}>{m.team1}-{m.team2}</option>)}
            
            </select>
            <select name="bet" id="bet"
                   value={bet.value}
                   onChange={bet.onChange}
            >
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="X">X</option>
            
            </select>
            
            
                
            <button type="submit">Add</button>
            </form>

        </div>
    )
    } else {
        return (<div></div>)
    }
}

const mapStateToProps = (props) => {
    //console.log("MAP STATE TO PROPS")
    //console.log(props)
    const m = {
        isFetching: props.matches.isFetching,
        matches: props.matches
    }
    return m
};

export default connect(mapStateToProps, { getMatches, generateTicket })(GenerateTicket);