import React from 'react';
import { connect } from 'react-redux' 
import {eliminarProducto} from "../actions"

const BajaComponent = (props) => {
    return (
      <div>
        <form>
          Producto: <input></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

export default connect(null,{eliminarProducto})(BajaComponent)