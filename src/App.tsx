import React from 'react';
import { Routes, Route } from "react-router-dom";
import Airports from "./components/Airports";
import FlightsSchedule from "./components/FlightsSchedule";
import './App.css';


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Airports/>}>
                <Route path='/airports/:airportName' element={<FlightsSchedule/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
