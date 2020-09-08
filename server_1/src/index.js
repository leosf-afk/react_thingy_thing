import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const API_URL = "https://restcountries.eu/"

const Filter = (props) => {
  const {handleFilterChange, filterValue} = props
  return (
    <div>
      filter <input onChange={handleFilterChange} value={filterValue}/><br />
    </div>
  )
}

const Country = (props) => {
  console.log(props)
  const {name, capital, population, languages, flag} = props.country
  
  return (
    <div>
      <h1>{name}</h1>
      capital {capital} <br />
      population {population} 
      <h2>Languages</h2>
      <ul>
        {languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>

      <img src={flag}alt={name} width="200" height="130"/> 
    </div>
  )
}

const Countries = (props) => {
  const {countriesToShow} = props

  if(countriesToShow.length == 1){
    return (
      <div>
      <Country country={countriesToShow[0]}/>
        
      </div>
    )
  } else if(countriesToShow.length >= 10){
    return (
      <div>
        Cannot display more than 10 countries;
      </div>
    )
  } else {
    return (
      <div>
        {props.countriesToShow.map(c => <p key={c.name}>{c.name}</p>)}
      </div>
    )
  }
  
}

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [ filterValue, setFilterValue ] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  useEffect(()=>{
    axios.get(API_URL+'rest/v2/all')
    .then(response => {
      console.log('all countries promies fullfiled')
      setCountries(response.data)
    })
  },[])

  const countriesToShow = showAll ? countries :
  countries.filter(
  c => c.name.toLowerCase().includes(filterValue.toLowerCase()))
 
  const handleFilterChange = (event) =>{
    setFilterValue(event.target.value)
    if(event.target.value === ''){
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

    return (
        <div >
        <Filter handleFilterChange={handleFilterChange} filterValue={filterValue} />
        <h2>Countries</h2>
        <Countries countriesToShow={countriesToShow}/>
      
        </div>
      );
 
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)