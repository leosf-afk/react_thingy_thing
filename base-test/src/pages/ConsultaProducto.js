import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux' 
import {getAllProductos} from "../actions";

const ConsultaProducto = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllProductos())
    },[dispatch]) 
    
    console.log("COMPONENT", props)
    if(!props.isFetching){
        return (
            <div>
                Productos:
                {props.productos.data.map(producto =>
                <div key={producto.codigo}>{producto.descripcion}<button>X</button><button>E</button></div>)}
            </div>
        )
    } else {
        return (
            <div>
                Cargando...
            </div>
        )
    }
}
  
const mapStateToProps = (state) => {
    console.log("STATE", state)
    return {
        isFetching: state.productos.isFetching,
        productos: state.productos.data
    }
}

export default connect(mapStateToProps, null)(ConsultaProducto)