import React, { useState } from 'react';
import axios from 'axios'; // You might need to install axios: npm install axios

const Weather = () => {
    const API_KEY = "580c204156709c4cc5083cdcd9761df2";

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async (event) => {
        event.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError('');
        
        try {
            // Remove the extra space from your key here in the call if you are hardcoding
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setLoading(false);
        } catch (err) {
            setError('City not found or API error. Please try again.');
            setWeatherData(null);
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>Weather App Condition</h1>
                </div>
                
                <form onSubmit={fetchWeatherData}>
                    <div className='flex flex-col gap-4'>
                        <input 
                            type="text" 
                            placeholder='Enter city name' 
                            required 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />
                        <button 
                            type="submit"
                            className='bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out'
                        >
                            Get Weather
                        </button>
                    </div>
                </form>

                {loading && <div className="mt-4 text-center text-blue-500">Loading...</div>}
                {error && <div className="mt-4 text-center text-red-500">{error}</div>}

                {weatherData && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{weatherData.name}</h2>
                        <p className="text-lg">Temperature: **{Math.round(weatherData.main.temp)}°C**</p>
                        <p className="text-lg">Condition: **{weatherData.weather[0].description}**</p>
                        <p className="text-lg">Humidity: **{weatherData.main.humidity}%**</p>
                        <p className="text-lg">Wind Speed: **{weatherData.wind.speed} m/s**</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
