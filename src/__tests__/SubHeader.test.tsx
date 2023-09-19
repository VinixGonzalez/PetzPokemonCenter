/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SubHeader from "@/components/SubHeader/SubHeader";

describe("SubHeader component", () => {
  it("Should render the SubHeader", async () => {
    const text = "Test Text";
    const subText = "Test Subtext";

    render(<SubHeader text={text} subText={subText} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(subText)).toBeInTheDocument();
  });
  it("Should render the component with showBreadcrumb and crumbList props", () => {
    const crumbList = [
      { label: "HomePage", path: "/", isLast: false },
      { label: "TestPage", path: "/test-page", isLast: true },
    ];

    render(
      <SubHeader text="Test SubHeader!" crumbList={crumbList} showBreadcrumb />
    );

    expect(screen.getByText("HomePage")).toBeInTheDocument();
    expect(screen.getByText("TestPage")).toBeInTheDocument();
  });
  it("Should render the component without subText and crumbList props", () => {
    const text = "Test Text";

    render(<SubHeader text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByText("Test Subtext")).toBeNull();
  });
});
