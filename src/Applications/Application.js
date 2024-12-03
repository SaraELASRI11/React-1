import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Application.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Pagination,
    Typography,
    TableSortLabel,
} from '@mui/material';

const Application = () => {
    const [application, setApplication] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState('asc'); // Ordre de tri
    const [orderBy, setOrderBy] = useState('temp'); // Tri uniquement par temp
    const itemsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        // Fonction pour récupérer les données existantes
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.220.15:8000/api/sensor_data/');
                if (response.ok) {
                    const data = await response.json();
                    setApplication(data);
                } else {
                    console.error('Erreur lors de la récupération des données.');
                }
            } catch (error) {
                console.error('Erreur :', error);
            }
        };

        fetchData();
    }, []);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(application.length / itemsPerPage);

    // Gérer le changement de page
    const handlePageChange = (_, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Fonction pour trier les données (uniquement par temp)
    const handleSort = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = [...application].sort((a, b) => {
        // Tri uniquement par temp
        if (orderBy === 'temp') {
            return order === 'asc' ? a.temp - b.temp : b.temp - a.temp;
        }
        return 0;
    });

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Données du Capteur IoT
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/add')}>
                    Ajouter
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate('/graphs')}>
                    Voir les Graphiques
                </Button>
            </div>

            <TableContainer component={Paper} style={{ maxWidth: '90%', margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === 'temp'}
                                    direction={orderBy === 'temp' ? order : 'asc'}
                                    onClick={() => handleSort('temp')}
                                >
                                    Température (°C)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Humidité (%)</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{item.temp}</TableCell>
                                <TableCell align="center">{item.hum}</TableCell>
                                <TableCell align="center">
                                    {new Date(item.dt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default Application;
