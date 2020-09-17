import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {connect} from "react-redux"

//import store from "./store"

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

const mapStateToProps = (state) => ({  });

export default connect(mapStateToProps)(App);