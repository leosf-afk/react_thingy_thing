import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const Anecdotes = () => {
  const max_point_index = points.indexOf(Math.max(...points))
  console.log(max_point_index)
  
  if(Math.max(...points) === 0){
    return (
      <div>
      <h1>Anecdote with most votes</h1>
      <p>all anectodetes has 0 points</p>
      </div>
    )
  } else {
    return (
      <div>
      
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[max_point_index]}</p>
      </div>
      
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [p_, setp] = useState(0)

  const handler = (_state, _setter) => {
    return () => {
      if(_state+1 > anecdotes.length-1){
        _setter(0)
      } else {
        _setter(_state+1)
      } 
    }
    //return f
  }

  const handleNext = handler(selected,setSelected)
  const handlePoints = () => {
      points[selected]++;
      setp(p_+1)
  }

  return (
    <div>
      {props.anecdotes[selected]}<br />
      has {props.points[selected]} votes<br />
      <Button onClick={handleNext} text="Next" />
      <Button onClick={handlePoints} text="Vote" />

      <br />
     <Anecdotes />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = [0,0,0,0,0,0]

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)