import { useState } from "react";
import WeatherSearch from "../WeatherSearch/WeatherSearch";
import type { Weather } from "../../service/API";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  return (
    <>
      <h1 className="mb-[20px] text-3xl font-bold text-center">
        Weather Dashboard
      </h1>
      <WeatherSearch setWeather={setWeather} />
      {weather && (
        <div className="mt-4 flex gap-[10px] justify-center items-center text-2xl">
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}

export default App;
