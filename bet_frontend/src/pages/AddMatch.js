import React from "react";
import {addMatch} from "../actions"
import { useState } from "react";
import {connect} from "react-redux";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => setValue(e.target.value);

  return { value, setValue, onChange };
};

const AddMatch = ({addMatch}) => {
    const team1 = useInput("");
    const team2 = useInput("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            team1: team1.value,
            team2: team2.value
        }

        console.log("PAYLOAD")
        console.log(payload)

        addMatch(payload);
    }

    return (
        <div>
            <h2>Add Matches</h2>
            <form onSubmit={handleSubmit}>
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
                
            <button type="submit">Add</button>
            </form>

        </div>
    )
}

export default connect(null, { addMatch })(AddMatch);