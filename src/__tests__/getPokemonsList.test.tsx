/**
 * @jest-environment jsdom
 */

import { getPokemonsList } from "@/services/getPokemonsList";

global.fetch = jest.fn();

describe("getPokemonsList function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully fetch pokemons list", async () => {
    const mockData = {
      count: 2,
      results: [
        { name: "pokemon1", url: "url1" },
        { name: "pokemon2", url: "url2" },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await getPokemonsList();
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the fetch response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as any);

    await expect(getPokemonsList()).rejects.toThrow(
      "Ocorreu um erro ao chamar o serviço getPokemonsList. Status code: 400. Status text: Bad Request"
    );
  });

  it("should throw an error if the fetch itself fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getPokemonsList()).rejects.toThrow("Network error");
  });
});
