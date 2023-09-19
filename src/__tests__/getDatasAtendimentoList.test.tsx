/**
 * @jest-environment jsdom
 */

import { getDatasAtendimentoList } from "@/services/getDatasAtendimentoList";

describe("getDatasAtendimentoList function", () => {
  it("Should return an object with a dateStringArray property", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ dateStringArray: [] }),
    });
    global.fetch = mockFetch;

    const result = await getDatasAtendimentoList();

    expect(result).toHaveProperty("dateStringArray");
    expect(Array.isArray(result.dateStringArray)).toBe(true);

    expect(mockFetch).toHaveBeenCalledWith("/api/scheduling/date");
  });
  it("Should return an array of strings in dateStringArray property", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValue({ dateStringArray: ["2022-01-01", "2022-01-02"] }),
    });
    global.fetch = mockFetch;

    const result = await getDatasAtendimentoList();

    expect(Array.isArray(result.dateStringArray)).toBe(true);
    expect(result.dateStringArray).toEqual(["2022-01-01", "2022-01-02"]);

    expect(mockFetch).toHaveBeenCalledWith("/api/scheduling/date");
  });
  it("Should throw an error when API call fails", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Internal Server Error",
    });
    global.fetch = mockFetch;

    await expect(getDatasAtendimentoList()).rejects.toThrow(
      "Ocorreu um erro ao chamar o serviço getDatasAtendimentoList. Status code: undefined. Status text: Internal Server Error"
    );

    expect(mockFetch).toHaveBeenCalledWith("/api/scheduling/date");
  });
});
