import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons ] = useState([
    {id:1, name: 'Arto Hellas', number: '040-123456' },
    {id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
    {id:3, name: 'Dan Abramov', number: '12-43-234345' },
    {id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const addPerson = (event) =>{
    event.preventDefault()

    let person_in_list = persons.map(x=>x.name).includes(newName)
    if(person_in_list){
      alert(`${newName} already in phonebook`)
    } else {
      const new_person = {
        name: newName,
        number: newNumber
 
      }
  
      setPersons(persons.concat(new_person))
    }
    
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilterValue(event.target.value)
    if(event.target.value === ''){
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
  
  const personsToShow = showAll ? persons :
    persons.filter(
    person => person.name.toLowerCase().includes(filterValue.toLowerCase()) 
    || person.number.includes(filterValue))

  return (
    <div>
      debug name: {newName}<br />
      debug number: {newNumber}<br />
      
      <h2>Phonebook</h2>
      filter <input onChange={handleFilterChange} value={filterValue}/><br />
      <br />
      add number:<br /> 
      <form onSubmit={addPerson}>
        <div>
        name: <input onChange={handleNameChange} value={newName}/><br />
        number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)