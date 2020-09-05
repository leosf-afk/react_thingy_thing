import React from 'react';

const Hello = (props) => {
  return (
    <div className="App">
        HEEEEEEEEEEEEEEEEELLO {props.name} you are {props.age} years old<br />
    </div>
  );

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
