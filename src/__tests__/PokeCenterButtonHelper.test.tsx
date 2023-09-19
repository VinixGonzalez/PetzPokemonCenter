/**
 * @jest-environment jsdom
 */

import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { usePokeCenterButtonHelper } from "@/components/PokeCenterButton/PokeCenterButton.helper";

function TestHookComponent() {
  const hookResults = usePokeCenterButtonHelper();
  return <div data-testid="hook-results">{JSON.stringify(hookResults)}</div>;
}

describe("PokeCenterButtonHelper Hook", () => {
  it("Should return an object with the expected properties", () => {
    render(<TestHookComponent />);
    const results = screen.getByTestId("hook-results");
    expect(JSON.parse(results.textContent!)).toHaveProperty("buttonVariants");
    expect(JSON.parse(results.textContent!)).toHaveProperty("showText");
    expect(JSON.parse(results.textContent!)).toHaveProperty("controls");
  });
  it("Should change showText to false after default timeout", async () => {
    jest.useFakeTimers();
    render(<TestHookComponent />);

    let results = screen.getByTestId("hook-results");
    expect(JSON.parse(results.textContent!).showText).toBe(true);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      results = screen.getByTestId("hook-results");
      expect(JSON.parse(results.textContent!).showText).toBe(false);
    });

    jest.useRealTimers();
  });
  it("Should change showText to false after custom timeout", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => usePokeCenterButtonHelper(100));

    expect(result.current.showText).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.showText).toBe(false);

    jest.useRealTimers();
  });
});
