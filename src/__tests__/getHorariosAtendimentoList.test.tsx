/**
 * @jest-environment jsdom
 */

import { getHorariosAtendimentoList } from "@/services/getHorariosAtendimentoList";

describe("getDatasAtendimentoList function", () => {
  it("Should return a valid response when given a valid date", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
    global.fetch = mockFetch;

    await getHorariosAtendimentoList("2022-01-01");

    expect(mockFetch).toHaveBeenCalledWith("/api/scheduling/time", {
      method: "POST",
      body: JSON.stringify({ date: "2022-01-01" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  it("should throw an error when the response status is not ok", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });
    global.fetch = mockFetch;

    await expect(getHorariosAtendimentoList("2022-01-01")).rejects.toThrow(
      "Ocorreu um erro ao chamar o serviço getHorariosAtendimentoList. Status code: 500. Status text: Internal Server Error"
    );
  });
});
