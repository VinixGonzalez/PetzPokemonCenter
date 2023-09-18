/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Input, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useAgendarConsultaStore } from "@/store/agendarConsultaStore";
import { motion } from "framer-motion";
import { real, upperCaseFirstLetterHelper } from "@/utils/utils";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { setAgendamentoConsulta } from "@/services/setAgendamentoConsulta";
import { useRouter } from "next/navigation";

type CustomErrors = FieldErrors<
  AgendarConsultaFormSchemaType & { [key: string]: string }
>;

const agendarConsultaSchema = z.object({
  nome: z
    .string()
    .nonempty("O nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  sobrenome: z
    .string()
    .nonempty("O sobrenome é obrigatório.")
    .min(3, "O sobrenome deve ter no mínimo 3 caracteres.")
    .max(50, "O sobrenome deve ter no máximo 50 caracteres."),
  regiao: z.string().nonempty("A região é obrigatória."),
  cidade: z
    .string({ required_error: "A cidade é obrigatória." })
    .nonempty("A cidade é obrigatória."),
  datasAtendimento: z.string().nonempty("Selecione uma data de atendimento."),
  horariosAtendimento: z
    .string({ required_error: "Selecione um horário de atendimento." })
    .nonempty("Selecione um horário de atendimento."),
});

type AgendarConsultaFormSchemaType = z.infer<typeof agendarConsultaSchema>;

export default function AgendarConsultaForm() {
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

  const handleSubmitForm = async (form: AgendarConsultaFormSchemaType) => {
    const pokeList = Object.entries(form)
      .filter(([key]) => key.startsWith("poke-fieldId-"))
      .map(([, value]) => value);
    const payload = { ...form, pokeList };

    const res = await setAgendamento(payload);

    if (res === "error") {
      router.push("/agendar-consulta/erro-agendamento");
      return;
    }

    router.push("/agendar-consulta/sucesso-agendamento");
  };

  const handleAddPokeField = () => {
    if (pokeFields.length >= 6) {
      return;
    }

    const newFieldUUID = `poke-fieldId-${uuid()}`;

    setPokeFields((fields) => [...fields, newFieldUUID]);
  };

  const getCurrentSchema = () => {
    let dynamicSchema: { [key: string]: any } = {};
    pokeFields.forEach((field, index) => {
      dynamicSchema[field] = z.string().nonempty(`Selecione seu Pokémon.`);
    });

    return agendarConsultaSchema.augment(dynamicSchema);
  };

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    trigger,
    watch,
  } = useForm<AgendarConsultaFormSchemaType & { [key: string]: any }>({
    resolver: zodResolver(getCurrentSchema()),
  });

  const selectedRegion = watch("regiao");
  const selectedDatasAtendimento = watch("datasAtendimento");
  const customErrors: CustomErrors = errors;

  const handleRemovePoke = (field: string) => {
    setPokeFields((prevFields) => prevFields.filter((f) => f !== field));
    toast.success("Pokémon removido", { autoClose: 1000 });
  };

  useEffect(() => {
    getRegioes();
    getPokemons();
    getDatasAtendimento();
  }, []);

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

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <section id="user-info" className="mb-9">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="nome" className="text-xs font-bold">
              Nome
            </label>
            <Input
              id="nome"
              type="text"
              className="border"
              placeholder="Digite seu nome"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-red-600 text-xs sm:text-sm">
                {errors.nome.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="sobrenome" className="text-xs font-bold">
              Sobrenome
            </label>
            <Input
              id="sobrenome"
              type="text"
              className="border"
              placeholder="Digite seu sobrenome"
              {...register("sobrenome")}
            />
            {errors.sobrenome && (
              <p className="text-red-600 text-xs sm:text-sm">
                {errors.sobrenome.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="regiao" className="text-xs font-bold">
              Região
            </label>
            <Select
              id="regiao"
              placeholder="Selecione sua região"
              {...register("regiao")}
            >
              {regioes.map((regiao) => (
                <option key={regiao.value} value={regiao.id ?? regiao.value}>
                  {regiao.label}
                </option>
              ))}
            </Select>
            {errors.regiao && (
              <p className="text-red-600 text-xs sm:text-sm">
                {errors.regiao.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="cidade" className="text-xs font-bold">
              Cidade
            </label>
            <Select
              disabled={!selectedRegion}
              id="cidade"
              placeholder="Selecione sua cidade"
              {...register("cidade")}
            >
              {cidades.map((cidade) => (
                <option key={cidade.value} value={cidade.value}>
                  {cidade.label}
                </option>
              ))}
            </Select>
            {errors.cidade && (
              <p className="text-red-600 text-xs sm:text-sm">
                {errors.cidade.message}
              </p>
            )}
          </div>
        </div>
      </section>
      <section id="team-info" className="mb-9">
        <div className="flex items-end justify-between mb-3">
          <div className="space-y-1">
            <p className="text-xs font-bold">Cadastre seu time</p>
            <p className="text-xs font-medium">
              Atendemos até 06 pokémons por vez
            </p>
          </div>

          <div id="pokemons">
            <small className="text-xs font-bold">
              Pokémons: {pokeFields.length}/6
            </small>
          </div>
        </div>

        <motion.button
          disabled={pokeFields.length >= 6}
          type="button"
          className="mb-6 flex border border-[#1D1D1D] disabled:border-gray-400 rounded-full disabled:cursor-not-allowed disabled:text-gray-400 p-3 items-center gap-3 hover:bg-customRed hover:text-white disabled:hover:bg-gray-200 hover:border-transparent"
          onClick={handleAddPokeField}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <span className="text-xs font-bold">
            Adicionar novo pokémon ao time...
          </span>
          <span>+</span>
        </motion.button>

        {pokeFields.map((field, index) => (
          <div key={index} className="flex flex-col mb-6">
            <div className="flex items-center">
              <div className="w-1/3">
                <label
                  htmlFor={`${field}${index + 1}`}
                  className="text-xs font-bold cursor-pointer"
                >
                  Pokémon 0{index + 1}
                </label>
              </div>
              <div className="flex w-full items-center gap-4">
                <Select
                  className=""
                  id={`${field}${index + 1}`}
                  placeholder="Selecione seu Pokémon"
                  {...register(field)}
                >
                  {pokemons.map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name}>
                      {upperCaseFirstLetterHelper(pokemon.name)}
                    </option>
                  ))}
                </Select>
                <button type="button" onClick={() => handleRemovePoke(field)}>
                  ❌
                </button>
              </div>
            </div>
            {customErrors[field] && errors[field]?.message && (
              <div className="flex items-center justify-end">
                <p className="text-red-600 text-xs sm:text-sm">
                  {errors[field]?.message as string}
                </p>
              </div>
            )}
          </div>
        ))}
      </section>
      <section
        id="date-info"
        className="flex flex-col sm:flex-row justify-between gap-4 mb-9"
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs font-bold" htmlFor="datasAtendimento">
            Data para Atendimento
          </label>
          <Select
            id="datasAtendimento"
            placeholder="Selecione uma data"
            {...register("datasAtendimento")}
          >
            {datasAtendimento.map((data) => (
              <option value={data} key={data}>
                {data}
              </option>
            ))}
          </Select>
          {errors.datasAtendimento && (
            <p className="text-red-600 text-xs sm:text-sm">
              {errors.datasAtendimento.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs font-bold" htmlFor="horariosAtendimento">
            Horário de Atendimento
          </label>
          <Select
            disabled={!selectedDatasAtendimento}
            id="horariosAtendimento"
            className=""
            placeholder="Selecione um horário"
            {...register("horariosAtendimento")}
          >
            {horariosAtendimento?.map((data) => (
              <option value={data} key={data}>
                {data}
              </option>
            ))}
          </Select>
          {errors.horariosAtendimento && (
            <p className="text-red-600 text-xs sm:text-sm">
              {errors.horariosAtendimento.message}
            </p>
          )}
        </div>
      </section>
      <hr className="my-6" />
      <section id="resume-info" className="text-sm font-normal text-[#747474]">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p>Número de pokémons a serem atendidos:</p>
            <p>0{pokeFields.length}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Atendimento unitário por pokémon:</p>
            <p>{real.format(70)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Subtotal:</p>
            <p>{real.format(pokeFields.length * 70)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Taxa geracional*:</p>
            <p>{real.format(2.1)}</p>
          </div>
          <small className="text-[0.5rem]">
            *adicionamos uma taxa de 3%, multiplicado pelo número da geração
            mais alta do time, com limite de até 30%
          </small>
        </div>

        <div className="flex items-center justify-between mt-8">
          <p className="text-2xl font-semibold text-[#1d1d1d]">
            Valor Total: {real.format(pokeFields.length * 70 + 2.1)}
          </p>
          <button
            type="submit"
            className="p-3 bg-customRed text-white text-sm font-bold rounded-full"
          >
            Concluir Agendamento
          </button>
        </div>
      </section>
    </form>
  );
}
