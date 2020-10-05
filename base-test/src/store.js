import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from "./reducers"

export default createStore(
  appReducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)