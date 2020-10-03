import AltaComponent from "../components/AltaComponent"
import BajaComponent from "../components/BajaComponent"
import ModificarComponent from "../components/ModificacionComponent"
import React from 'react';

const ABMProductoComponent = (props) => {
    switch(props.tipo_formulario){
      case "ALTA":
        return (<div><AltaComponent /></div>)
      case "BAJA":
        return (<div><BajaComponent /></div>)
      case "MODIFICACION":
        return (<div><ModificarComponent /></div>)
      default:
        return (<div>ERROR</div>)
      }
    
  }
  
export default ABMProductoComponent