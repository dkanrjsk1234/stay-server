const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = '88696efc50f0ce92ae2a33fec6ab7645';

app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weatherData = await getWeatherData(city);

    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    return {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      HighTemperature: weatherData.main.temp_max,
      LowTemperature: weatherData.main.temp_min,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
    };
  } catch (error) {
    throw new Error('Error fetching weather data from OpenWeather API');
  }
}

app.listen(port, () => {
  console.log(`Server address : http://localhost:${port}`);
});
