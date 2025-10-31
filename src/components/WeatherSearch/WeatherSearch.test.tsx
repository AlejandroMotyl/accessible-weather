// WeatherSearch.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherSearch from "./WeatherSearch";

describe("WeatherSearch", () => {
  test("renders input and button", () => {
    render(<WeatherSearch handleSubmit={async () => {}} loader={false} />);
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("shows alert on empty input", () => {
    window.alert = vi.fn();
    render(
      <WeatherSearch
        handleSubmit={async (city: string) => {
          if (!city.trim()) {
            alert("Please enter a city");
            return;
          }
        }}
        loader={false}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Please enter a city");
  });

  test("calls handleSubmit with city", async () => {
    const mockSubmit = vi.fn(async () => {});
    render(<WeatherSearch handleSubmit={mockSubmit} loader={false} />);
    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Kyiv" } });
    fireEvent.click(button);

    // Ждем завершення асинхронного сабміту
    await new Promise(process.nextTick);

    expect(mockSubmit).toHaveBeenCalledWith("Kyiv");
  });

  test("disables input and button when loading", () => {
    render(<WeatherSearch handleSubmit={async () => {}} loader={true} />);
    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole("button");

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
