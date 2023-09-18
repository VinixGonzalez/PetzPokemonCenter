interface GetDatasAtendimentoListResponse {
  dateStringArray: Array<string>;
}

export const getDatasAtendimentoList = async () => {
  try {
    const res = await fetch(`/api/scheduling/date`);

    if (!res.ok) {
      const statusText = res.statusText || "Erro desconhecido";
      throw new Error(
        `Ocorreu um erro ao chamar o serviço getDatasAtendimentoList. Status code: ${res.status}. Status text: ${statusText}`
      );
    }

    const resJson: GetDatasAtendimentoListResponse = await res.json();

    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
