import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Graph.css'; // Assurez-vous que votre fichier CSS est bien importé

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Graph = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('day'); // 'day' ou 'month'
    const [selectedDate, setSelectedDate] = useState('');  // Pour filtrer par jour
    const [selectedMonth, setSelectedMonth] = useState(''); // Pour filtrer par mois
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.220.15:8000/api/sensor_data/');
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    setLoading(false);
                } else {
                    console.error("Erreur lors de la récupération des données.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Erreur :", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Appliquer le filtre en fonction du type sélectionné
        let filtered = data;
        if (filterType === 'day' && selectedDate) {
            filtered = data.filter(item => {
                const itemDate = new Date(item.dt);
                return itemDate.toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
            });
        } else if (filterType === 'month' && selectedMonth) {
            filtered = data.filter(item => {
                const itemDate = new Date(item.dt);
                return itemDate.getMonth() === new Date(selectedMonth).getMonth() &&
                       itemDate.getFullYear() === new Date(selectedMonth).getFullYear();
            });
        }
        setFilteredData(filtered);
    }, [filterType, selectedDate, selectedMonth, data]);

    if (loading) {
        return <p className="loading-message">Chargement des graphiques...</p>;
    }

    const tempChartData = {
        labels: filteredData.map(item => new Date(item.dt).toLocaleDateString()),
        datasets: [
            {
                label: 'Température (°C)',
                data: filteredData.map(item => item.temp),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    const humChartData = {
        labels: filteredData.map(item => new Date(item.dt).toLocaleDateString()),
        datasets: [
            {
                label: 'Humidité (%)',
                data: filteredData.map(item => item.hum),
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Température et Humidité',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Valeur',
                },
            },
        },
    };

    return (
        <div className="graph-container">
            <h1>Graphiques de Température et Humidité</h1>

            {/* Section de filtrage */}
            <div className="filter-container">
                <label>
                    Filtrer par :
                    <select
                        className="filter-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="day">Jour</option>
                        <option value="month">Mois</option>
                    </select>
                </label>
            </div>

            {/* Sélection de la date ou du mois */}
            {filterType === 'day' && (
                <div className="filter-container">
                    <label>
                        Sélectionnez une date :
                        <input
                            className="date-input"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {filterType === 'month' && (
                <div className="filter-container">
                    <label>
                        Sélectionnez un mois :
                        <input
                            className="month-input"
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {/* Graphique de Température */}
            {!loading && (
                <div className="temp-graph">
                    <h2>Température (°C)</h2>
                    <Line data={tempChartData} options={options} />
                </div>
            )}

            {/* Graphique d'Humidité */}
            {!loading && (
                <div className="hum-graph">
                    <h2>Humidité (%)</h2>
                    <Line data={humChartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default Graph;
