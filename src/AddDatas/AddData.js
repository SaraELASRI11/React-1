import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
    const [temp, setTemp] = useState('');
    const [hum, setHum] = useState('');
    const [message, setMessage] = useState('');  // État pour gérer le message de confirmation
    const navigate = useNavigate();

    const handleAddData = async () => {
        if (!temp || !hum) {
            setMessage("Veuillez remplir tous les champs.");
            return;
        }

        const newData = {
            temp: parseFloat(temp),
            hum: parseFloat(hum),
        };

        try {
            const response = await fetch('http://localhost:8000/api/sensor_data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                setMessage("Les données ont été enregistrées avec succès !");
                setTemp('');  // Réinitialiser les champs
                setHum('');
            } else {
                setMessage("Erreur lors de l'enregistrement des données.");
            }
        } catch (error) {
            setMessage("Erreur : " + error.message);
        }
    };

    return (
        <div className="add-data">
            <h1>Ajouter des Données</h1>
            {message && <p className="message">{message}</p>}  {/* Affichage du message */}
            <input
                type="number"
                placeholder="Température (°C)"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
            />
            <input
                type="number"
                placeholder="Humidité (%)"
                value={hum}
                onChange={(e) => setHum(e.target.value)}
            />
            <button onClick={handleAddData}>Enregistrer</button>
            <button onClick={() => navigate('/')}>Annuler</button> {/* Retour à la page d'accueil */}
        </div>
    );
};

export default AddData;
