export const getHorariosAtendimentoList = async (date: string) => {
  try {
    const res = await fetch(`/api/scheduling/time`, {
      method: "POST",
      body: JSON.stringify({ date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const statusText = res.statusText || "Erro desconhecido";
      throw new Error(
        `Ocorreu um erro ao chamar o serviço getHorariosAtendimentoList. Status code: ${res.status}. Status text: ${statusText}`
      );
    }

    const resJson = await res.json();

    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
