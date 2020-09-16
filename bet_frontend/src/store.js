import { createStore,applyMiddleware } from "redux";
import betApp from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    betApp,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
