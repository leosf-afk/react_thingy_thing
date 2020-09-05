import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const App = () => {
  const [counter, setCounter ] = useState(0)

  //setTimeout(
  //  ()=>setCounter(counter+1),1000
  //)


  const increseaByOne = () => setCounter(counter+1)
  const setToZero = () => setCounter(0)

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div>
      {counter}
      
      <button onClick={increseaByOne}>+</button><br />
      <button onClick={setToZero}>reset</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))

