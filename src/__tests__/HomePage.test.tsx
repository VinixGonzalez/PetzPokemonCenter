/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("Should render without crash", () => {
    render(<HomePage />);

    const main = screen.getByTestId("main-home");

    expect(main).toBeInTheDocument();
  });
});
