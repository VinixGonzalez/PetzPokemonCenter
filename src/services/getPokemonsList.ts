interface GetPokemonsListResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

export const getPokemonsList = async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`
    );

    if (!res.ok) {
      const statusText = res.statusText || "Erro desconhecido";
      throw new Error(
        `Ocorreu um erro ao chamar o serviço getPokemonsList. Status code: ${res.status}. Status text: ${statusText}`
      );
    }

    const resJson: GetPokemonsListResponse = await res.json();

    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
