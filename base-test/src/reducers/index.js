import {combineReducers} from "redux"
import productReducer from "./productoReducer"

export default combineReducers({
    productos: productReducer,
  })
