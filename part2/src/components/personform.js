import React from 'react'

const PersonForm = (props) => {
  const {nameChanger, numberChanger, addPerson, nName, nNumber} = props
  return (
    <div>
      add number:<br /> 
      <form onSubmit={addPerson}>
        <div>
        name: <input onChange={nameChanger} value={nName}/><br />
        number: <input onChange={numberChanger} value={nNumber}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
  
export default PersonForm;