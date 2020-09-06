import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return(
    <tr><td>{text}</td><td>{value}</td> <br /></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const _all = bad+neutral+good
  const average = (good+bad*-1)/_all
  const positive_p = (good*100)/_all + "%"
  
  if(_all === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <h1>Tatistics</h1>
        <table>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={_all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive_p} />
        </table>
      </div>
    )
  }


}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allOpinions, setAll] = useState({})
  

  const handler = (_state, _setter) => {
    let f = () => { _setter(_state+1) }
    return f
  }

  const handleBadClick = handler(bad,setBad)
  const handleGoodClick = handler(good,setGood)
  const handleNeutralClick = handler(neutral,setNeutral)
  
  //const handleNeutralClick = () => {
  //  //setAll(allClicks.concat('L'))
  //  setNeutral(neutral+1)
  //}
  //const handleGoodClick = () => {
  //  setGood(good+1)
  //}

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>

        <Button onClick={handleGoodClick} text="Good" />
        <Button onClick={handleNeutralClick} text="Neutral" />
        <Button onClick={handleBadClick} text="Bad" />

        <Statistics bad={bad} neutral={neutral} good={good}/>
      </div>
    </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))