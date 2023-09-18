import { getDatasAtendimentoList } from "@/services/getDatasAtendimentoList";
import { getHorariosAtendimentoList } from "@/services/getHorariosAtendimentoList";
import { getPokeCidades } from "@/services/getPokeCidades";
import { getPokeRegioes } from "@/services/getPokeRegioes";
import { getPokemonsList } from "@/services/getPokemonsList";
import { setAgendamentoConsulta } from "@/services/setAgendamentoConsulta";
import { upperCaseFirstLetterHelper } from "@/utils/utils";
import { create } from "zustand";

interface Regiao {
  label: string;
  value: string;
  id: string | null;
}

interface Cidade {
  label: string;
  value: string;
}

interface Pokemon {
  name: string;
  url: string;
}

export interface AgendamentoConsultaProps {
  cidade: string;
  datasAtendimento: string;
  horariosAtendimento: string;
  nome: string;
  sobrenome: string;
  pokeList: Array<string>;
  regiao: string;
  [key: string]: string | Array<string>;
}

export type AgendamentoStatusType = "idle" | "success" | "error";

interface AgendarConsultaStoreState {
  regioes: Array<Regiao>;
  getRegioes: () => void;
  cidades: Array<Cidade>;
  getCidades: (regionId: string) => void;
  pokemons: Array<Pokemon>;
  getPokemons: () => void;
  datasAtendimento: Array<string>;
  getDatasAtendimento: () => void;
  horariosAtendimento: Array<string>;
  getHorariosAtendimento: (date: string) => void;
  agendamentoStatus: AgendamentoStatusType;
  agendamento: AgendamentoConsultaProps;
  setAgendamento: (
    agendamento: AgendamentoConsultaProps
  ) => Promise<AgendamentoStatusType>;
  setAgendamentoStatus: (status: AgendamentoStatusType) => void;
}

export const useAgendarConsultaStore = create<AgendarConsultaStoreState>(
  (set, get) => ({
    regioes: [],
    getRegioes: async () => {
      const regioes = await getPokeRegioes();

      const regioesSelect = regioes?.results.map((regiao) => {
        const regexId = regiao.url.match(/\/(\d+)\/$/);
        const regiaoId = regexId && regexId[1];

        return {
          label: upperCaseFirstLetterHelper(regiao.name),
          value: regiao.name,
          id: regiaoId,
        };
      });

      set({ regioes: regioesSelect });
    },
    cidades: [],
    getCidades: async (regionId: string) => {
      const cities = await getPokeCidades(regionId);

      const locationsSelect = cities?.locations
        .filter((loc) => loc.name.includes("town") || loc.name.includes("city"))
        .map((cidade) => ({
          label: upperCaseFirstLetterHelper(cidade.name),
          value: cidade.name,
        }));

      set({ cidades: locationsSelect });
    },
    pokemons: [],
    getPokemons: async () => {
      const pokemonsList = await getPokemonsList();
      set({ pokemons: pokemonsList.results });
    },
    datasAtendimento: [],
    getDatasAtendimento: async () => {
      const datas = await getDatasAtendimentoList();
      set({ datasAtendimento: datas.dateStringArray });
    },
    horariosAtendimento: [],
    getHorariosAtendimento: async (date: string) => {
      const horarios = await getHorariosAtendimentoList(date);
      set({ horariosAtendimento: horarios.horariosAtendimento });
    },
    agendamentoStatus: "idle",
    agendamento: {} as AgendamentoConsultaProps,
    setAgendamento: async (
      agendamento: AgendamentoConsultaProps
    ): Promise<AgendamentoStatusType> => {
      const res = await setAgendamentoConsulta(agendamento);
      if (res === "error") {
        set({
          agendamento: {} as AgendamentoConsultaProps,
          agendamentoStatus: "error",
        });
        return "error";
      }
      set({ agendamento, agendamentoStatus: "success" });
      return "success";
    },
    setAgendamentoStatus: (status: AgendamentoStatusType) => {
      set({ agendamentoStatus: status });
    },
  })
);
