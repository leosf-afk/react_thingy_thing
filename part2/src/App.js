import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    console.log("effect")
    personService.getAll().then(p => {setPersons(p)})
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()

    let person_in_list = persons.map(x=>x.name).includes(newName)
    if(person_in_list){
      

      if (window.confirm(`${newName} already in phonebook, do you want to replace ${newName} number?`)) {
        const new_person = {
          name: newName,
          number: newNumber
        }

        const person_id = persons.filter(p => p.name===newName)[0].id
        personService.update(person_id, new_person)
        .then(
          p => {
            alert("updated succesfuly")
            setNewName('')
            setNewNumber('')
            setPersons(persons)
          })
      }
    } else {
      const new_person = {
        name: newName,
        number: newNumber
      }
  
      //setPersons(persons.concat(new_person))
      personService.create(new_person).then(
        p => {
          setPersons(persons.concat(p))
          setNewName('')
          setNewNumber('')
        }
      )
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
