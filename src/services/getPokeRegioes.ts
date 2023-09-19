interface GetPokeRegioesResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

export const getPokeRegioes = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/region/", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const statusText = res.statusText || "Erro desconhecido";
      throw new Error(
        `Ocorreu um erro ao chamar o serviço getPokeRegioes. Status code: ${res.status}. Status text: ${statusText}`
      );
    }

    const resJson: GetPokeRegioesResponse = await res.json();

    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
