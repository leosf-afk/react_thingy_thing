import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

const Filter = (props) => {
  const {handleFilterChange, filterValue} = props
  return (
    <div>
      filter <input onChange={handleFilterChange} value={filterValue}/><br />
    </div>
  )
}

const Persons = (props) => {
  const {personsToShow} = props
  return (
    <div>
      {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

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
      <Filter handleFilterChange={handleFilterChange} filterValue={filterValue} />
      <br />
      
      <PersonForm nameChanger={handleNameChange} numberChanger={handleNumberChange} addPerson={addPerson} nName={newName} nNumber={newNumber}/>
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
      
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)