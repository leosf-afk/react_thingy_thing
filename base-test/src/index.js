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
    case 'NEW_PRODUCT':
      return [...state, action.data]
    default: 
      return state
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

const ABMComp = (props) => {
  return (
    <div>
      <form>
        Producto: <input></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Consulta />
      <ABMComp />
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