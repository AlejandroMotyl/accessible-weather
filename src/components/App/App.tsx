import { useState } from "react";
import WeatherSearch from "../WeatherSearch/WeatherSearch";
import { fetchWeather, type Weather } from "../../service/API";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (city: string) => {
    if (!city.trim()) {
      alert("Please enter a city");
      return;
    }

    try {
      setLoader(true);
      setError(false);
      setWeather(null);
      console.log("Loader set to true");
      const weather = await fetchWeather(city);
      setWeather(weather);
    } catch {
      setWeather(null);
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <h1 className=" my-[40px] mb-[20px] text-3xl font-bold text-center">
        Weather Dashboard
      </h1>
      <WeatherSearch handleSubmit={handleSubmit} loader={loader} />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {weather && !loader && (
        <div
          aria-live="polite"
          className="my-[40px] flex gap-[10px] justify-center items-center text-2xl"
        >
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}

export default App;
