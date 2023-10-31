const axios = require('axios');

const city = 'Seoul';
const apiKey = '88696efc50f0ce92ae2a33fec6ab7645';
const apiURI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

axios.get(apiURI)
  .then(response => {
    var data = response.data;
    var temp = String((data.main.temp - 272)).substring(0, 3); // 현재 온도
    var tempMax = String((data.main.temp_max - 272)).substring(0, 3); // 최고 온도
    var tempMin = String((data.main.temp_min - 272)).substring(0, 3); // 최저 온도
    var humidity = data.main.humidity; // 습도
    var location = data.name; // 지역
    console.log('지역 : ' + location + ' 현재 온도 : ' + temp + '도, 최고 온도 : ' + tempMax + '도, 최저 온도 : ' + tempMin + '도, 습도 : ' + humidity + '%');
    // POST 요청을 보내는 부분
    return axios.post('여기에 삽입', {
      location: location,
      temperature: temp,
      maxTemperature: tempMax,
      minTemperature: tempMin,
      humidity: humidity
    });
  })
  .then(response => {
    console.log('POST 완료');
  })
  .catch(error => {
    console.error(error);
  });
