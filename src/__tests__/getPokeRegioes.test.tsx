/**
 * @jest-environment jsdom
 */

import { getPokeRegioes } from "@/services/getPokeRegioes";

global.fetch = jest.fn();

describe("getPokeRegioes function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully fetch poke regions", async () => {
    const mockData = {
      count: 2,
      results: [
        { name: "region1", url: "url1" },
        { name: "region2", url: "url2" },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await getPokeRegioes();
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the fetch response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as any);

    await expect(getPokeRegioes()).rejects.toThrow(
      "Ocorreu um erro ao chamar o serviço getPokeRegioes. Status code: 400. Status text: Bad Request"
    );
  });

  it("should throw an error if the fetch itself fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getPokeRegioes()).rejects.toThrow("Network error");
  });
});
