import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }, [])

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

export default App;
