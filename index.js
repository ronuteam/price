const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({origin:'*'}));
const port = 3000;


app.get('/klines', async (req, res) => {
  try {
    const binanceBaseUrl = 'https://api.binance.com/api/v3/klines';
    const queryParams = req.query;

    // Construct the URL with query parameters
    const url = new URL(binanceBaseUrl);
    Object.keys(queryParams).forEach(key => {
      url.searchParams.append(key, queryParams[key]);
    });

    // Make the request to the Binance API
    const response = await axios.get(url.toString());
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});


app.get('/price', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el precio' });
  }
});

app.get('/price_btc', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el precio' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
