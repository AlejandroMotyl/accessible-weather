interface WeatherSearchProps {
  handleSubmit: (city: string) => Promise<void>;
  loader: boolean;
}

export default function WeatherSearch({
  handleSubmit,
  loader,
}: WeatherSearchProps) {
  const onSubmit = async (formData: FormData) => {
    const city = formData.get("city") as string;
    handleSubmit(city);
  };
  return (
    <form
      className="flex justify-center gap-x-[20px]"
      action={onSubmit}
      aria-label="Search weather by city"
      aria-busy={loader}
    >
      <label htmlFor="city" className="sr-only">
        City name
      </label>
      <input
        className="text-center text-3xl font-bold h-20 w-100 border border-red-500 rounded-[40px]"
        type="text"
        name="city"
        id="city"
        placeholder="Enter city"
        aria-label="City name"
        disabled={loader}
      />
      <button
        aria-label="Search weather"
        className=" text-3xl  flex justify-center items-center h-20 w-100 rounded-[40px] border border-blue-500 hover:bg-blue-500 focus:bg-blue-500"
        type="submit"
        disabled={loader}
      >
        Submit
      </button>
    </form>
  );
}
