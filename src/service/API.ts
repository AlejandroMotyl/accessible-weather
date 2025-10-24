import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create();

interface FetchWeatherRep {
  name: string;
  country: string;
  lat: string;
  lon: string;
}
interface Conditions {
  id: number;
  main: string;
  description: string;
}
export interface Weather {
  main: { temp: number };
  feels_like: number;
  clouds: number;
  weather: Conditions[];
}

export const fetchWeather = async (city: string): Promise<Weather> => {
  const cords = await api.get<FetchWeatherRep[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const weather = await api.get<Weather>(
    `${BASE_URL}/weather?lat=${cords.data[0].lat}&lon=${cords.data[0].lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
  );
  return weather.data;
};
