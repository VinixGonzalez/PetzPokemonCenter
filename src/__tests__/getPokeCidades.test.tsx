/**
 * @jest-environment jsdom
 */

import { getPokeCidades } from "@/services/getPokeCidades";

global.fetch = jest.fn();

describe("getPokeCidades function", () => {
  it("should successfully fetch cities for a given region", async () => {
    const mockData = {
      id: 1,
      locations: [
        { name: "city1", url: "url1" },
        { name: "city2", url: "url2" },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await getPokeCidades("1");
    expect(result).toEqual(mockData);
  });
  it("should throw an error if the fetch response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as any);

    await expect(getPokeCidades("1")).rejects.toThrow(
      "Ocorreu um erro ao chamar o serviço getPokeCidades. Status code: 400. Status text: Bad Request"
    );
  });
  it("should throw an error if the fetch itself fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getPokeCidades("1")).rejects.toThrow("Network error");
  });
});
