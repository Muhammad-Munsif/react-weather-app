import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const API_KEY = "580c204156709c4cc5083cdcd9761df2";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (event) => {
    event.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      // Store the fetched data in localStorage from the api 
      localStorage.setItem("lastWeatherData", JSON.stringify(response.data));
      setLoading(false);
      setCity("");
    } catch (err) {
      setError("City not found or API error. Please try again.");
      setWeatherData(null);
      setLoading(false);
    }
  };

  const loadLastWeather = () => {
    const lastData = localStorage.getItem("lastWeatherData");
    if (lastData) {
      setWeatherData(JSON.parse(lastData));
      setError("");
    } else {
      setError("No saved weather data found in local storage.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-5">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Weather App Condition
          </h1>
        </div>

        <form onSubmit={fetchWeatherData}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter city name"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out w-full"
            >
              Get Weather
            </button>
             <button
              type="button"
              onClick={loadLastWeather}
              className="bg-gray-500 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out w-full"
            >
              Load Last Saved Weather
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-4 text-center text-blue-500">Loading...</div>
        )}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}

        {weatherData && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-white p-3 rounded-lg w-full text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {weatherData.name}
              </h2>
            </div>
            <div className="flex items-center justify-between flex-wrap bg-white p-3 rounded-lg mb-2">
              <p className="text-base sm:text-lg font-bold">Temperature:</p>
              <span className="text-base sm:text-lg font-semibold">
                ** {Math.round(weatherData.main.temp)}°C **
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap bg-white rounded-lg p-3 mb-2">
              <p className="text-base sm:text-lg font-bold">Condition:</p>
              <span className="text-base sm:text-lg font-semibold">
                ** {weatherData.weather[0].description} **
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap bg-white rounded-lg p-3 mb-2">
              <p className="text-base sm:text-lg font-bold">Humidity:</p>
              <span className="text-base sm:text-lg font-semibold">
                ** {weatherData.main.humidity}% **
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap bg-white p-3 rounded-lg mb-2">
              <p className="text-base sm:text-lg font-bold">Wind Speed:</p>
            
              <span className="text-base sm:text-lg font-semibold text-right"> 
                ** {weatherData.wind.speed} m/s **
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
