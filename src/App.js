// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Homes/Home.css';
import Home from './Homes/Home';
import Application from './Applications/Application';  
import AddData from './AddDatas/AddData';
import Graphs from './Graphes/Graph';
import './App.css';
function App() {
    return (
        
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Accueil</Link> | <Link to="/application">Application</Link>
                </nav>

                {/* Définition des routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/application" element={<Application />} />
                    <Route path="/add" element={<AddData />} />
                    <Route path="/graphs" element={<Graphs />} /> 


                </Routes>
            </div>
        </Router>
    );
}

export default App;
