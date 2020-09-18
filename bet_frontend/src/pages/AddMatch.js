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
    const equipo1 = useInput("");
    const equipo2 = useInput("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            Equipo1: equipo1.value,
            Equipo2: equipo2.value
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
                   placeholder="equipo1"
                   value={equipo1.value}
                   onChange={equipo1.onChange}
                />
                <input
                   type="text"
                   placeholder="equipo2"
                   value={equipo2.value}
                   onChange={equipo2.onChange}
                />
                
            <button type="submit">Add</button>
            </form>

        </div>
    )
}

export default connect(null, { addMatch })(AddMatch);