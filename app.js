const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

const city = 'Seoul';
const apiKey = '88696efc50f0ce92ae2a33fec6ab7645';
const apiURI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

app.get('/weather', (req, res) => {
  axios.get(apiURI)
    .then(response => {
      var data = response.data;
      var temp = String((data.main.temp - 273.15).toFixed(2));
      var tempMax = String((data.main.temp_max - 273.15).toFixed(2));
      var tempMin = String((data.main.temp_min - 273.15).toFixed(2));
      var humidity = data.main.humidity;
      var location = data.name;
      res.send({
        '지역': location,
        '현재 온도': temp,
        '최고 온도': tempMax,
        '최저 온도': tempMin,
        '습도': humidity +"%"
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while fetching weather data');
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
