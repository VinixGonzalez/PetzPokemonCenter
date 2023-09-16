/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Header from "@/components/Header/Header";

describe("PokeCenter Header", () => {
  it("Should render the Header", () => {
    render(<Header />);

    const button = screen.getByRole("button", {
      name: /Centro Pokémon/i,
    });

    expect(button).toBeInTheDocument();
  });
});
