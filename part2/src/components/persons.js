import React from 'react'
import personService from '../services/persons'

const DeletePersonButton = (props) => {
    const {person} = props

    const handleDeletionEvent = (event) => {
        if (window.confirm(`Are you sure that you want to delete ${person.name}?`)) {
            personService.deletePerson(person.id).then(alert("deleted succesfuly"))
        }
    }
    return(    
        <div>
          <button onClick={handleDeletionEvent}>Delete Person</button>
        </div>
      )
} 

const Persons = (props) => {
    const {personsToShow} = props
    return (
        <div>
            {personsToShow.map(person => <div key={person.name}>{person.name} {person.number} <DeletePersonButton person={person}/></div>)} 
        </div>
    )
}
 
export default Persons;