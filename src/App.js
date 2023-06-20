/*
/ STEPS
// 1) make an input
// 2) the input accepts a users input, capturing the city
// 3) Capture the information inside state
// 4) Make a button
// 5) When the user clicks on the button, it will fire off the API requests
// 6) Right now capturing a city name - find API that takes the city name to spit out lat and long - https://restcountries.com/v3.1/name/Germany
// 7) After we receive the country information, we call the weather API with the lat and long
// 8)display the information
*/

import React from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";

// Putting an API key (hard coded) not recommended.


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputQuery: "",
      currentCity: "",
      currentTemperature: "",
      weatherType: "",
      weatherDescription: "",
      weatherIconcode: "",
      weatherForecastTime1: "",
      forecastTemperature1: "",
      forecastDescription1: "",
      forecastIconCode1: "",
      weatherForecastTime2: "",
      forecastTemperature2: "",
      forecastDescription2: "",
      forecastIconCode2: "",
      weatherForecastTime3: "",
      forecastTemperature3: "",
      forecastDescription3: "",
      forecastIconCode3: "",
      weatherForecastTime4: "",
      forecastTemperature4: "",
      forecastDescription4: "",
      forecastIconCode4: "",
      weatherForecastTime5: "",
      forecastTemperature5: "",
      forecastDescription5: "",
      forecastIconCode5: "",
    };
  }

  handleChange = (e) => {
    this.setState({ cityInputQuery: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputQuery}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      /* "lat": 1.2899175,
    "lon": 103.8519072,
    "country": "SG" */
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      /*{
  "coord": {
    "lon": 103.8519,
    "lat": 1.2899
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 300.06,
    "feels_like": 303.63,
    "temp_min": 298.23,
    "temp_max": 300.98,
    "pressure": 1009,
    "humidity": 90
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.54,
    "deg": 20
  },
  "clouds": {
    "all": 75
  },
  "dt": 1687216621,
  "sys": {
    "type": 1,
    "id": 9470,
    "country": "SG",
    "sunrise": 1687215609,
    "sunset": 1687259511
  },
  "timezone": 28800,
  "id": 1880252,
  "name": "Singapore",
  "cod": 200
} */
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        this.setState({
          cityInputQuery: "",
          currentCity: weatherData.name,
          currentTemperature: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDescription: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
    // This portion is for forecast data
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputQuery}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData.list);
        console.log("WeatherData 1:", weatherData.list[1]);
        console.log("WeatherData 1:", weatherData.list[1].dt_txt);
        console.log("WeatherData 1:", weatherData.list[1].main.temp);
        console.log(
          "WeatherData 1:",
          weatherData.list[1].weather[0].description
        );

        console.log(weatherData.list[2]);
        console.log(weatherData.list[3]);
        console.log(weatherData.list[4]);
        console.log(weatherData.list[5]);
        this.setState({
          weatherForecastTime1: weatherData.list[1].dt_txt,
          forecastTemperature1: weatherData.list[1].main.temp,
          forecastDescription1: weatherData.list[1].weather[0].description,
          forecastIconCode1: weatherData.list[1].weather[0].icon,
          weatherForecastTime2: weatherData.list[2].dt_txt,
          forecastTemperature2: weatherData.list[2].main.temp,
          forecastDescription2: weatherData.list[2].weather[0].description,
          forecastIconCode2: weatherData.list[2].weather[0].icon,
          weatherForecastTime3: weatherData.list[3].dt_txt,
          forecastTemperature3: weatherData.list[3].main.temp,
          forecastDescription3: weatherData.list[3].weather[0].description,
          forecastIconCode3: weatherData.list[3].weather[0].icon,
          weatherForecastTime4: weatherData.list[4].dt_txt,
          forecastTemperature4: weatherData.list[4].main.temp,
          forecastDescription4: weatherData.list[4].weather[0].description,
          forecastIconCode4: weatherData.list[4].weather[0].icon,
          weatherForecastTime5: weatherData.list[5].dt_txt,
          forecastTemperature5: weatherData.list[5].main.temp,
          forecastDescription5: weatherData.list[5].weather[0].description,
          forecastIconCode5: weatherData.list[5].weather[0].icon,
        });
        console.log("I eat bread");
        /** 
        for (let i=0; i<weatherData.list.length; i++){
          
        this.setState({
          weatherForecastTime:weatherData.list[i].dt_txt,
          forecastTemperature:weatherData.list[i].main.temp,
          forecastDescription:weatherData.list[i].weather[i].description,
          forecastIconCode:weatherData.list[i].weather[i].icon,
          
        });
      }
      */
      });
  };
  /* weatherForecastTime:"",
      forecastTemperature:"",
      forecastType:"",
      forecastDescription:"",
      forecastIconCode:"", */
  // setting the initial state of the information needed.

  render() {
    const weatherInformation = this.state.currentCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
        />
        <p>Current City: {this.state.currentCity}</p>
        <p>Current Temperature:{this.state.currentTemperature}</p>
        <p>
          Current Weather: {this.state.weatherType},
          {this.state.weatherDescription}
        </p>
        <br />

        <p>Forecast Time:{this.state.weatherForecastTime1}</p>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.forecastIconCode1}@2x.png`}
          alt="weather-icon"
        />
        <p>Forecast Temperature: {this.state.forecastTemperature1}</p>
        <p>Forecast Description: {this.state.forecastDescription1}</p>

        <br />

        <p>Forecast Time:{this.state.weatherForecastTime2}</p>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.forecastIconCode2}@2x.png`}
          alt="weather-icon"
        />
        <p>Forecast Temperature: {this.state.forecastTemperature2}</p>
        <p>Forecast Description: {this.state.forecastDescription2}</p>

        <br />

        <p>Forecast Time:{this.state.weatherForecastTime3}</p>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.forecastIconCode3}@2x.png`}
          alt="weather-icon"
        />
        <p>Forecast Temperature: {this.state.forecastTemperature3}</p>
        <p>Forecast Description: {this.state.forecastDescription3}</p>

        <br />

        <p>Forecast Time:{this.state.weatherForecastTime4}</p>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.forecastIconCode4}@2x.png`}
          alt="weather-icon"
        />
        <p>Forecast Temperature: {this.state.forecastTemperature4}</p>
        <p>Forecast Description: {this.state.forecastDescription4}</p>

        <br />

        <p>Forecast Time:{this.state.weatherForecastTime5}</p>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.forecastIconCode5}@2x.png`}
          alt="weather-icon"
        />
        <p>Forecast Temperature: {this.state.forecastTemperature5}</p>
        <p>Forecast Description: {this.state.forecastDescription5}</p>
      </div>
    ) : (
      <p>PLease enter a city name to get weather data. </p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <label>
              {"City: "}
              <input
                type="text"
                value={this.state.cityInputQuery}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Check Weather" />
          </form>
          {weatherInformation}
        </header>
      </div>
    );
  }
}

export default App;
