import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

import * as API from "../../service/API";

describe("App integration", () => {
  test("shows loader, then weather data on successful API call", async () => {
    const fakeWeather = {
      main: { temp: 72 },
      feels_like: 70,
      clouds: 20,
      weather: [{ id: 1, main: "Clear", description: "clear sky" }],
    };
    vi.spyOn(API, "fetchWeather").mockResolvedValueOnce(fakeWeather);

    render(<App />);

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    expect(screen.getByText(/loading, please wait.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/temperature: 72/i)).toBeInTheDocument();
      expect(screen.getByText(/weather: Clear/i)).toBeInTheDocument();
      expect(screen.getByText(/condition: clear sky/i)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/loading, please wait.../i)
    ).not.toBeInTheDocument();
  });

  test("shows error message when API call fails", async () => {
    vi.spyOn(API, "fetchWeather").mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<App />);

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.click(button);

    expect(screen.getByText(/Loading, please wait.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/there was an error/i)).toBeInTheDocument();
      expect(screen.getByText(/\(Network error\)/i)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/Loading, please wait.../i)
    ).not.toBeInTheDocument();
  });
});
