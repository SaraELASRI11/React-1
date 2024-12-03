// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; 

import './Home.css'; 
import { FaCloud, FaChartPie, FaDatabase, FaLock } from 'react-icons/fa'; 

const Home = () => {
    return (
        <div className="home">
            <div className="header">
                <h1>Bienvenue sur la page d'accueil</h1>
                <p>
                    Bienvenue sur notre site dédié à l'Internet des objets (IoT) ! Ici, vous pouvez afficher
                    les données de température et d'humidité en temps réel sous forme de tableaux et de graphiques,
                    ainsi que consulter les données JSON. Utilisez le bouton ci-dessous pour accéder aux différentes pages.
                </p>
            </div>
            <div className="content">
                <div className="icons">
                    <FaCloud className="icon" />
                    <FaChartPie className="icon" />
                    <FaDatabase className="icon" />
                    <FaLock className="icon" />
                </div>
                
            </div>
        </div>
    );
};

export default Home; 