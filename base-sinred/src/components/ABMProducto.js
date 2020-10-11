import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ABMProducto = (props) => {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state); // result: 'some_value'
     }, [location]);

    console.log(props)

    switch(props.tipoOperacion){
        case "ALTA":
            return (
                <div>
                    ALTA
                    <form>
                      Producto: <input></input><br/>
                      <button type="submit">Submit</button>
                    </form>
                </div>

            )
        case "BAJA":
            return (
                <div>BAJA
                    <form>
                    Producto: <input 
                    readOnly 
                    value={location.state.producto.descripcion}
                    ></input><br/>
                      <button type="submit">Eliminar</button>
                    </form>
                </div>
                
            )
        case "MODIFICACION":
            return (
                <div>Modificacion
                    <form>
                      Producto: <input 
                      value={location.state.producto.descripcion}
                      onChange={()=>{}}></input><br/>
                      <button type="submit">Modificar</button>
                    </form>
                </div>
            )
        
        default:
            return (
                <div>ERROR</div>
            )
        
    }
}
export default ABMProducto;