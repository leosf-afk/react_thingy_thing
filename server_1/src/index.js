import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const API_URL = "https://restcountries.eu/"
const API_KEY = process.env.REACT_APP_API_KEY

function lg(wher, msg){
  console.log(`[${wher}]`)
  console.log(msg)
}

const Filter = (props) => {
  const {handleFilterChange, filterValue} = props
  return (
    <div>
      filter <input onChange={handleFilterChange} value={filterValue}/><br />
    </div>
  )
}

//export default class Weather extends React.Component {
//  
//  constructor(props) {
//    super(props);
//    const {city} = props
//    const [weatherData,setWeatherData] = useState({})
//    //var weatherData = {}
//    const api_u = "http://api.weatherstack.com/current?access_key=" + API_KEY.trim() + "&query=" + city
//  
//  }
//
//  componentDidMount() {
//  
//    axios.get(this.api_u)
//    .then(response => {
//      lg("PROMIES WEATHER","promise fullfiled")
//      console.log(response.data)
//      this.weatherData = response.data
//    }).catch(err => {
//     console.log(err)
//    })
//  }
//
//  render() {
//    console.log("RENDER", this.weatherData)
//    if(this.weatherData){
//      return (
//        <div>
//          <h1>Weather in {this.props.city}</h1>
//          {this.weatherData.current.temperature}
//        </div>
//      )
//    } else {
//      return (
//        <div>
//          <h1>Weather in {this.props.city}</h1>
//          error getting weather data
//        </div>
//      )
//    }
//  }
//}

const Weather = (props) => {
  const {city} = props
  const [weatherData,setWeatherData] = useState({current:{temperature:""}})
  const api_u = "http://api.weatherstack.com/current?access_key=" + API_KEY.trim() + "&query=" + city
  lg("WEATHER", api_u)

  useEffect(()=>{
  
    const fetch_weather = async () => {
      const result = await axios(
        api_u,
       );
       
      setWeatherData(result.data);
    }

    fetch_weather()
 
  } ,[])


  console.log("WEATHER", weatherData)

  if(weatherData.current.temperature !== ""){
    return (
      <div>
        <h1>Weather in {city}</h1>
        Temperature {weatherData.current.temperature} celsius<br />
        <img src={weatherData.current.weather_icons[0]}alt={"img"} width="50" height="50"/> <br />
        wind {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}<br />
      </div>
    )

  } else {
    return (
      <div>
        <h1>Weather in {city}</h1>
        loading...
      </div>
    )
  }
} 

const Country = (props) => {
  lg("country", props)
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

      <Weather city={capital}/>
    </div>
  )
}

const ShowCountryButton = (props) => {
  const [showCountry, setShowCountry] = useState(false)
  const {country, countries} = props

  const _country = countries.filter(c => {
    return c.name === country
  })

  lg(" show button", _country[0])
  
 
  const handleShowEvent = (event) =>{
    setShowCountry(!showCountry)
  }

  if(showCountry){
    return(    
      <div>
        <button onClick={handleShowEvent}>Show</button>
        <div id={_country[0].name} >
          <Country country={_country[0]}/>
        </div>
      </div>
    )
  } else {
    return(    
      <div>
        <button onClick={handleShowEvent}>Show</button>
      </div>
    )
  }
  
}


const Countries = (props) => {
  const {countriesToShow} = props

  if(countriesToShow.length === 1){
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
        {props.countriesToShow.map(c => <div key={c.name}>{c.name} <ShowCountryButton country={c.name} countries={countriesToShow}/></div>)}
      </div>
    )
  }
  
}

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  useEffect(()=>{
    axios.get(API_URL+'rest/v2/all')
    .then(response => {
      lg("in promise all countries","promise fullfiled")
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