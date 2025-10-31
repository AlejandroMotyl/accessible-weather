import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  test("renders loading message", () => {
    render(<Loader />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Loading, please wait.../i
    );
  });
});
