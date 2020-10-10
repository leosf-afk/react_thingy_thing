import React from 'react'
import {
    BrowserRouter as Router,  Switch, Route, Link
  } from "react-router-dom"
import ConsultaProducto from "./pages/ConsultaProducto"
import ABMProducto from "./pages/ABMProducto"

const App = () => {
    const padding = {
        padding: 5
      }
    
    return (
        <Router>
            <div>
                <Link style={padding} to="/">Home</Link> 
                <Link style={padding} to="/productos">productos</Link>
                <Link style={padding} to="/pedidos">pedidos</Link>
            </div>
            <Switch>
                <Route path="/productos">
                    <ConsultaProducto/>
                </Route>
                <Route path="/pedidos">
                    <ABMProducto/>
                </Route>
                <Route path="/">
                    home
                </Route>
                <Route path="abm">
                    <ABMProducto tipo_formulario="ALTA"/>
                </Route>
            
            </Switch>
        <div>
        </div>
        </Router>
    )
}

export default App;