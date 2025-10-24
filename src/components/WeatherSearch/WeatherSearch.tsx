import { fetchWeather, type Weather } from "../../service/API";

export default function WeatherSearch({
  setWeather,
}: {
  setWeather: (weather: Weather | null) => void;
}) {
  const onSubmit = async (formData: FormData) => {
    const city = formData.get("city") as string;
    if (city?.trim() !== "") {
      const weather = await fetchWeather(city);

      try {
        setWeather(weather);
      } catch {
        setWeather(null);
      }
    } else {
      alert("Empty input");
    }
  };
  return (
    <form
      className="flex justify-center gap-x-[20px]"
      action={onSubmit}
      aria-label="Search weather by city"
    >
      <input
        className="text-center text-3xl font-bold h-20 w-100 border border-red-500 rounded-[40px]"
        type="text"
        name="city"
        id="city"
        placeholder="Enter city"
        aria-label="City name"
      />
      <button
        className="flex justify-center items-center h-20 w-100 rounded-[40px] border border-blue-500 hover:bg-blue-500 focus:bg-blue-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
