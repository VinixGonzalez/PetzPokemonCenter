/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import PokeCenterButton from "@/components/PokeCenterButton/PokeCenterButton";

describe("PokeCenter Button", () => {
  it("Should render the button with given text prop", () => {
    render(<PokeCenterButton text="Centro Pokémon" />);

    const button = screen.getByRole("link", {
      name: /Centro Pokémon/i,
    });

    expect(button).toBeInTheDocument();
  });
  it("Should display text when hovered", () => {
    render(<PokeCenterButton text="Centro Pokémon" />);
    const button = screen.getByRole("link", { name: /Centro Pokémon/i });

    fireEvent.mouseEnter(button);
    expect(screen.getByText("Centro Pokémon")).toBeInTheDocument();
  });
  it("Should navigate to Home page on button click", () => {
    render(<PokeCenterButton text="Centro Pokémon" />);
    const button = screen.getByRole("link", { name: /Centro Pokémon/i });
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/");
  });
});
