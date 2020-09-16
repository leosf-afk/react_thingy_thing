import { createStore,applyMiddleware } from "redux";
import betApp from "./reducers";
import thunk from "redux-thunk";

export default createStore(
    betApp, 
    applyMiddleware(thunk)
);
