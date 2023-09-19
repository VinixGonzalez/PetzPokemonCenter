/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer/Footer";

describe("Footer component", () => {
  it("Should render the Footer", async () => {
    render(<Footer />);

    const footer = screen.getByTestId("Footer");

    expect(footer).toBeInTheDocument();
  });
  it("Should render the Footer with the paragraph", async () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /Todas as marcas e ilustrações utilizadas são de seus resepctivos donos./
      )
    ).toBeInTheDocument();
  });
});
