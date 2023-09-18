import {
  AgendamentoConsultaProps,
  AgendamentoStatusType,
} from "@/store/agendarConsultaStore";

interface CreateAgendamentoConsultaResponse {
  agendamentoStatus: AgendamentoStatusType;
}

export const setAgendamentoConsulta = async (
  agendamento: AgendamentoConsultaProps
): Promise<AgendamentoStatusType> => {
  try {
    const res = await fetch(`/api/scheduling/create`, {
      method: "POST",
      body: JSON.stringify({ agendamento }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log(
        `Ocorreu um erro ao chamar o serviço setAgendamentoConsulta. Status code: ${res.status}. Status text: ${res.statusText}`
      );
      return "error";
    }

    const resJson: CreateAgendamentoConsultaResponse = await res.json();

    return resJson.agendamentoStatus;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
