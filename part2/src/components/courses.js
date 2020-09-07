import React, { useState } from 'react'

const Header = (course) => {
    return (
      <h2>{course.course}</h2>
    )
  }
  
  
  const Part = ({name, exercises}) => {
    console.log(exercises)
    return (
      <div>
        <p>
          part: {name} <br />
          exercises: {exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercisesn={part.exercises} /> )}
      </div>
    )
  }
  
  const Course = ({name, parts}) => {
    return (
      <div>
        <Header course={name}/>
        <Content parts={parts}/>
      </div>
    )
  }
  
  const Courses = ({courses}) => {
    return (
      <div>
      <h1>Courses:</h1>
        {courses.map(course => <Course key={course.id} name={course.name} parts={course.parts} /> )}
        
      </div>
    )
  }

export default Courses 