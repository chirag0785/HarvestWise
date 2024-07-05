import React from 'react'
import { useSelector } from 'react-redux'

const WeatherData = () => {
    const data = useSelector((state) => state.weather.weather);
    
    if (Object.keys(data).length == 0) {
        return null;
    }
    
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={`https://openweathermap.org/img/wn/${data.weatherDetails.icon}@4x.png`} alt="Weather icon"/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data?.weatherDetails.main}</div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{data?.name}</h2>
                    <div className="mt-2 text-gray-500">
                        <p className="mt-2">
                            <span className="font-bold">Temperature:</span> {Math.ceil(data?.temperatureDetails.temp - 273)}°C
                        </p>
                        <p className="mt-2">
                            <span className="font-bold">Pressure:</span> {data?.temperatureDetails.pressure} hPa
                        </p>
                        <p className="mt-2">
                            <span className="font-bold">Wind Speed:</span> {data?.windspeed} m/s
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherData