interface GetPokeCidadesResponse {
  id: number;
  locations: Array<{ name: string; url: string }>;
}

export const getPokeCidades = async (regionId: string) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/region/${regionId}`);

    if (!res.ok) {
      const statusText = res.statusText || "Erro desconhecido";
      throw new Error(
        `Ocorreu um erro ao chamar o serviço getPokeCidades. Status code: ${res.status}. Status text: ${statusText}`
      );
    }

    const resJson: GetPokeCidadesResponse = await res.json();

    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
