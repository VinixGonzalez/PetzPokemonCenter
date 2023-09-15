/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { PokeCenterButton } from "@/components/PokeCenterButton/PokeCenterButton";

describe("PokeCenter Button", () => {
  it("Should render the button with given text prop", () => {
    render(<PokeCenterButton text="Centro Pokémon" />);

    const button = screen.getByRole("button", {
      name: /Centro Pokémon/i,
    });

    expect(button).toBeInTheDocument();
  });
});
