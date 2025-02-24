const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const airportsPath = path.join(__dirname, './airports.json');
const airports = JSON.parse(fs.readFileSync(airportsPath, 'utf8'));


app.get('/airports', (req, res) => {
  res.json(airports);
});


app.get('/airports/:IATA', (req, res) => {
  const { IATA } = req.params;
  const airport = airports.find(airport => airport.code === IATA.toUpperCase());

  if (airport) {
    res.json(airport);
  } else {
    res.status(404).json({ error: 'Aeropuerto no encontrado' });
  }
});


app.get('/airports/city/:city', (req, res) => {
  const { city } = req.params;
  const results = airports.filter(airport => 
    airport.city.toLowerCase() === city.toLowerCase()
  );

  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'No se encontraron aeropuertos en esta ciudad' });
  }
});

app.get('/airports/country/:country', (req, res) => {
  const { country } = req.params;
  const results = airports.filter(airport => 
    airport.country.toLowerCase() === country.toLowerCase()
  );

  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'No se encontraron aeropuertos en este país' });
  }
});


app.get('/airports/:IATA/carriers', (req, res) => {
  const { IATA } = req.params;
  const airport = airports.find(airport => airport.code === IATA.toUpperCase());

  if (airport) {
    res.json({ 
      airport: airport.name, 
      carriers: airport.carriers 
    });
  } else {
    res.status(404).json({ error: 'Aeropuerto no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
