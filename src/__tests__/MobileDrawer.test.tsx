/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileDrawer from "@/components/Drawer/MobileDrawer";

describe("MobileDrawer component", () => {
  it("Should render the MobileDrawer and open when click on hamburger menu icon", async () => {
    render(<MobileDrawer />);

    const hamburgerIcon = screen.getByTestId("HamburgerMenu");

    await userEvent.click(hamburgerIcon);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
