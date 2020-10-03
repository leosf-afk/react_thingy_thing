import React from 'react';
import { connect } from 'react-redux' 
import {agregarProducto} from "../actions"


const AltaComponent = (props) => {
    return (
      <div>
        <form>
          Producto: <input></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
  
export default connect(null, {agregarProducto})(AltaComponent)
