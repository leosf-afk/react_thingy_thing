import React from 'react';
import { connect } from 'react-redux' 
import {editarProducto} from "../actions"

const ModificarComponent = (props) => {
    return (
      <div>
        <form>
          Producto: <input></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

export default connect(null,{editarProducto})(ModificarComponent)