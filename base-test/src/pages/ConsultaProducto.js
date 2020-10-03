import React from 'react';
import { connect } from 'react-redux' 

const ConsultaProducto = (props) => {
    return (
        <div>
            Productos:
            {props.productos.map(producto =>
            <div key={producto.id}>{producto.descripcion}<button>X</button><button>E</button></div>)}
        </div>
    )
}
  
const mapStateToProps = (state) => {
    return {
      productos: state.productos
    }
}

export default connect(mapStateToProps, null)(ConsultaProducto)
  