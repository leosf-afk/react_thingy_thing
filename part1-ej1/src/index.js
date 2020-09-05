import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
  return (
    <h1>{course.course}</h1>
  )
}


const Part = (part) => {
  return (
    <div>
      <p>
        part: {part.name} exercises: {part.exercises}
      </p>
    </div>
  )
}

const Content = (parts) => {
  console.log(parts)
  return (
    <div>
    <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises}/>
    <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises}/>
    <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises}/>
      
    </div>
  )

}

const Total = (exercises) => {
  console.log(exercises.exercises)
  return(<div>
    <p>Number of exercises {exercises.exercises.reduce((a, b) => a + b, 0)}</p>
  </div>)
}

//exercises.reduce((a, b) => a + b, 0)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  var parts = [{name:part1,exercises:exercises1},{name:part2,exercises:exercises2},{name:part3,exercises:exercises3}]
      
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total exercises={[exercises1,exercises2,exercises3]}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))