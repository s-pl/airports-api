const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const airportsPath = path.join(__dirname, './airports.json');
const airports = JSON.parse(fs.readFileSync(airportsPath, 'utf8'));


app.get('/airports/:IATA', (req, res) => {
  const { IATA } = req.params;
  const airport = airports.find(airport => airport.code === IATA.toUpperCase());

  if (airport) {
    res.json(airport);
  } else {
    res.status(404).json({ error: 'Aeropuerto no encontrado' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
