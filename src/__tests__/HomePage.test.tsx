import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("Should render without crash", () => {
    render(<HomePage />);

    const header = screen.getByRole("heading", {
      name: /welcome to pokecenter/i,
    });

    expect(header).toBeInTheDocument();
  });
});
