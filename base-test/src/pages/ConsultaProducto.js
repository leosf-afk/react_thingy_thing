import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux' 
import {getAllProductos} from "../actions";

import ABMProducto from "./ABMProducto"
import {
    BrowserRouter as Router,  Switch, Route, Link, useRouteMatch
  } from "react-router-dom"


const ConsultaProducto = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllProductos())
    },[dispatch]) 
    let match = useRouteMatch();

    console.log("COMPONENT", props)
    if(!props.isFetching){
        
        return (
            <Router>
            <div>
                <Link to={`${match.url}/agregar`}>Agregar</Link>
                <Link to={`${match.url}/editar`}>Editar</Link>
                <Link to={`${match.url}/eliminar`}>Eliminar</Link>
            
            </div>
            <Switch>
                <Route path={`${match.url}/agregar`}>
                    <ABMProducto tipo_formulario="ALTA"/>
                </Route>
                <Route path={`${match.url}/editar`}>
                    <ABMProducto tipo_formulario="MODIFICACION"/>
                </Route>
                <Route path={`${match.url}/eliminar`}>
                    <ABMProducto tipo_formulario="BAJA"/>
                </Route>
            </Switch>
            <div>
                Productos:
                {props.productos.data.map(producto =>
                <div key={producto.descripcion+producto.codigo}>{producto.descripcion}<button>X</button><button>E</button></div>)}
            </div>
            </Router>            
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