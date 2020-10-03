import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import ConsultaProducto from "./pages/ConsultaProducto"

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

const appReducer = combineReducers({
  productos: productReducer,
})


const App = () => {
  return (
    <div>
      <ConsultaProducto />
 
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