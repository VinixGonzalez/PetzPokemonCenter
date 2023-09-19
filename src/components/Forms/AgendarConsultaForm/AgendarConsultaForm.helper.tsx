import { useAgendarConsultaStore } from "@/store/agendarConsultaStore/agendarConsultaStore";
import {
  AgendarConsultaFormSchemaType,
  agendarConsultaSchema,
} from "@/store/agendarConsultaStore/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { z } from "zod";
import { extractLevelFromName } from "@/utils/utils";

const VALOR_UNITARIO = 70;

type CustomErrors = FieldErrors<
  AgendarConsultaFormSchemaType & { [key: string]: string }
>;

export const useAgendarConsultaFormHelper = () => {
  const router = useRouter();

  const {
    getRegioes,
    regioes,
    getCidades,
    cidades,
    getPokemons,
    pokemons,
    getDatasAtendimento,
    datasAtendimento,
    getHorariosAtendimento,
    horariosAtendimento,
    setAgendamento,
  } = useAgendarConsultaStore();

  const [pokeFields, setPokeFields] = useState<string[]>([]);

  const getCurrentSchema = () => {
    let dynamicSchema: { [key: string]: any } = {};
    pokeFields.forEach((field) => {
      dynamicSchema[field] = z.string().nonempty(`Selecione seu Pokémon.`);
    });

    return agendarConsultaSchema.augment(dynamicSchema);
  };

  const handleAddPokeField = () => {
    if (pokeFields.length >= 6) {
      return;
    }

    const newFieldUUID = `poke-fieldId-${uuid()}`;
    setPokeFields((fields) => [...fields, newFieldUUID]);
  };

  const handleRemovePoke = (field: string) => {
    setPokeFields((prevFields) => prevFields.filter((f) => f !== field));
    toast.success("Pokémon removido", { autoClose: 1000 });
  };

  const handleSubmitForm = async (form: AgendarConsultaFormSchemaType) => {
    const pokeList = Object.entries(form)
      .filter(([key]) => key.startsWith("poke-fieldId-"))
      .map(([, value]) => value);
    const payload = { ...form, pokeList };

    if (pokeList.length === 0) {
      toast.error("Adicione ao menos um Pokémon ao time.");
      return;
    }

    const res = await setAgendamento(payload);

    if (res === "error") {
      router.push("/agendar-consulta/erro-agendamento");
      return;
    }

    router.push("/agendar-consulta/sucesso-agendamento");
  };

  const calcularTaxaGeracional = () => {
    const levels = pokeFields.map((field) => {
      const selectedPokemonName = watch(field);
      return extractLevelFromName(selectedPokemonName);
    });

    if (levels.length <= 0) return 0;

    const maxLevel = Math.max(...levels);

    const taxaGeracional = Math.min(maxLevel * 0.03, 0.3);

    return taxaGeracional;
  };

  const calcularValorTotal = (totalPokes: number) => {
    return (
      totalPokes * VALOR_UNITARIO +
      calcularTaxaGeracional() * (totalPokes * VALOR_UNITARIO)
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AgendarConsultaFormSchemaType & { [key: string]: any }>({
    resolver: zodResolver(getCurrentSchema()),
  });

  const selectedRegion = watch("regiao");
  const selectedDatasAtendimento = watch("datasAtendimento");
  const customErrors: CustomErrors = errors;

  useEffect(() => {
    getRegioes();
    getPokemons();
    getDatasAtendimento();
  }, [getDatasAtendimento, getPokemons, getRegioes]);

  useEffect(() => {
    if (!selectedRegion) return;

    console.log("Buscando cidades...");

    getCidades(selectedRegion);
  }, [getCidades, selectedRegion]);

  useEffect(() => {
    if (!selectedDatasAtendimento) return;

    console.log("Buscando horarios...");

    getHorariosAtendimento(selectedDatasAtendimento);
  }, [getHorariosAtendimento, selectedDatasAtendimento]);

  return {
    register,
    handleSubmit,
    handleSubmitForm,
    handleAddPokeField,
    handleRemovePoke,
    calcularTaxaGeracional,
    calcularValorTotal,
    errors,
    regioes,
    selectedRegion,
    cidades,
    pokeFields,
    pokemons,
    customErrors,
    datasAtendimento,
    selectedDatasAtendimento,
    horariosAtendimento,
    VALOR_UNITARIO,
  };
};
