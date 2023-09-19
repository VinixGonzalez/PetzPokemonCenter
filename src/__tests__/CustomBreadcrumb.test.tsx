/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";

describe("CustomBreadcrumb component", () => {
  it("Should render the CustomBreadcrumb", () => {
    const crumbList = [
      { isLast: false, path: "/page1", label: "Page 1" },
      { isLast: false, path: "/page2", label: "Page 2" },
      { isLast: true, path: "/page3", label: "Page 3" },
    ];

    render(<CustomBreadcrumb crumbList={crumbList} />);

    crumbList.forEach((crumb) => {
      expect(screen.getByText(crumb.label)).toBeInTheDocument();
    });
  });
});
