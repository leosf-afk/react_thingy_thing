import React from 'react';
import ReactDOM from 'react-dom';

import { connect, Provider, useDispatch } from 'react-redux' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = [
  {
    id: "asdf1",
    descripcion: 'producto 1',
  },
  {
    id: "asdf2",
    descripcion: 'producto 2',
  },
  {
    id: "asdf3",
    descripcion: 'producto 3',
  },
  {
    id: "asdf4",
    descripcion: 'producto 4',
  }
]


const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NUEVO_PRODUCTO':
      return [...state, action.data]
    case 'ELIMINAR_PRODUCTO':
      return state
    case 'EDITAR_PRODUCTO':
      return state
    default: 
      return state
  }
}

const agregarProducto = (data) => {
  return dispatch => {
    dispatch({
      type: "NUEVO_PRODUCTO",
      data: data.producto
    })
  }
}

const editarProducto = (data) => {
  return dispatch => {
    dispatch({
      type: "EDITAR_PRODUCTO",
      data: data.producto
    })
  }
}

const eliminarProducto = (id_producto) => {
  return dispatch => {
    dispatch({
      type: "ELIMINAR_PRODUCTO",
      id: id_producto
    })
  }
}



const appReducer = combineReducers({
  productos: productReducer,
})


let Consulta = (props) => {
  return (
    <div>
        Productos:
        {props.productos.map(producto =>
        <div key={producto.id}>{producto.descripcion}</div>)}
    </div>
  )
}

const mapStateToConsultaProps = (state) => {
  return {
    productos: state.productos
  }
}
Consulta = connect(mapStateToConsultaProps, null)(Consulta)

let AltaComp = (props) => {
  return (
    <div>
      <form>
        Producto: <input></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
AltaComp = connect(null, {agregarProducto})(AltaComp)

let BajaComp = (props) => {
  return (
    <div>
      <form>
        Producto: <input></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
BajaComp = connect(null,{eliminarProducto})(BajaComp)

let ModificarComp = (props) => {
  return (
    <div>
      <form>
        Producto: <input></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
ModificarComp = connect(null,{editarProducto})(ModificarComp)

const ABMComp = (props) => {
  switch(props.tipo_formulario){
    case "ALTA":
      return (<div><AltaComp /></div>)
    case "BAJA":
      return (<div><BajaComp /></div>)
    case "MODIFICACION":
      return (<div><ModificarComp /></div>)
    default:
      return (<div>ERROR</div>)
    }
  
}


const App = () => {
  return (
    <div>
      <Consulta />
      <ABMComp tipo_formulario={"ALTA"}/>
 
    </div>
  )
}

const store = createStore(
  appReducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)