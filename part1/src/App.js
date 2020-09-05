import React from 'react';

const Hello = ({ name, age }) => {  
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>HELLOSSS</h1>
      <Hello name="Pepe" age={14}/>    
      <Hello name="Micho" age={33+33}/>    
      <Hello name="Tito" age={1+1}/>    
      <Hello name="Mauro" age={1+1}/>    
    </div>
  );
}

export default App;
