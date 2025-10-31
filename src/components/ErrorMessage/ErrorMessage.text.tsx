import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage component", () => {
  test("renders default error message", () => {
    render(<ErrorMessage />);
    expect(screen.getByRole("status")).toHaveTextContent(/There was an error/i);
  });

  test("shows provided error message", () => {
    render(
      <ErrorMessage error={{ name: "Error", message: "Network issue" }} />
    );
    expect(screen.getByText(/Network issue/i)).toBeInTheDocument();
  });
});
