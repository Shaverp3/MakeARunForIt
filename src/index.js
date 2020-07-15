import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeARunForIt from './components/MakeARunForIt';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom"



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <MakeARunForIt />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

