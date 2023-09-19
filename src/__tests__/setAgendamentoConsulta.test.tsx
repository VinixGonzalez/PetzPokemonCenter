/**
 * @jest-environment jsdom
 */

import { setAgendamentoConsulta } from "@/services/setAgendamentoConsulta";
import { AgendamentoConsultaProps } from "@/store/agendarConsultaStore/agendarConsultaStore";

global.fetch = jest.fn();

describe("setAgendamentoConsulta function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAgendamento: AgendamentoConsultaProps = {
    cidade: "test city",
    datasAtendimento: "19/09/2023",
    horariosAtendimento: "09:00:00",
    nome: "test name",
    sobrenome: "test surname",
    pokeList: ["test1", "test2"],
    regiao: "test region",
  };

  it("should successfully set agendamento consulta and return the status", async () => {
    const mockData = {
      agendamentoStatus: "success",
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await setAgendamentoConsulta(mockAgendamento);
    expect(result).toEqual("success");
  });

  it("should return 'error' if the fetch response is not ok", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as any);

    const result = await setAgendamentoConsulta(mockAgendamento);
    expect(result).toEqual("error");
  });

  it("should throw an error if the fetch itself fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(setAgendamentoConsulta(mockAgendamento)).rejects.toThrow(
      "Network error"
    );
  });
});
