import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './style.css';
import Appbar from '../Frontend/Appbar';
import Navbar from '../Frontend/Navbar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Navbar />
      </div>
    </Router>
  );
};
export default App;
