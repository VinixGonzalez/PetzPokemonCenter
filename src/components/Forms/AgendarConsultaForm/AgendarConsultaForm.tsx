"use client";

import React from "react";
import { Input, Select } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { real, upperCaseFirstLetterHelper } from "@/utils/utils";

import { useAgendarConsultaFormHelper } from "./AgendarConsultaForm.helper";

export default function AgendarConsultaForm() {
  const {
    register,
    handleSubmit,
    handleSubmitForm,
    handleAddPokeField,
    handleRemovePoke,
    calcularTaxaGeracional,
    calcularValorTotal,
    errors,
    regioes,
    cidades,
    pokeFields,
    pokemons,
    customErrors,
    datasAtendimento,
    horariosAtendimento,
    VALOR_UNITARIO,
  } = useAgendarConsultaFormHelper();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      data-testid="FormAgendarConsulta"
    >
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
              disabled={regioes.length <= 0}
              id="regiao"
              placeholder="Selecione sua região"
              {...register("regiao")}
            >
              {regioes.map((regiao) => (
                <option key={regiao.value} value={regiao.id as string}>
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
              disabled={cidades.length <= 0}
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
        <div className="flex items-start sm:items-end justify-between mb-3 text-xs flex-col sm:flex-row">
          <div className="space-y-1">
            <p className="font-bold">Cadastre seu time</p>
            <p className="font-medium">Atendemos até 06 pokémons por vez</p>
          </div>

          <div id="pokemons" className="mt-2 sm:mt-0">
            <small className="font-bold text-xs">
              Pokémons: {pokeFields.length}/6
            </small>
          </div>
        </div>

        <motion.button
          data-testid="AddPokeBtn"
          disabled={pokeFields.length >= 6}
          type="button"
          className="w-full sm:w-fit mb-6 flex border border-[#1D1D1D] disabled:border-gray-400 rounded-full disabled:cursor-not-allowed disabled:text-gray-400 p-3 items-center justify-evenly gap-3 hover:bg-customRed hover:text-white disabled:hover:bg-gray-200 hover:border-transparent"
          onClick={handleAddPokeField}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <span className="text-xs font-bold">
            Adicionar novo pokémon ao time...
          </span>
          <span className="text-lg font-bold">+</span>
        </motion.button>

        {pokeFields.map((field, index) => (
          <div key={field} className="flex flex-col mb-6">
            <div className="flex items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
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
                    <option
                      key={pokemon.name}
                      value={`${pokemon.name} (lvl: ${pokemon.level})`}
                    >
                      {upperCaseFirstLetterHelper(pokemon.name)} - (lvl:{" "}
                      {pokemon.level})
                    </option>
                  ))}
                </Select>
                <button
                  data-testid="RemovePokeBtn"
                  type="button"
                  onClick={() => handleRemovePoke(field)}
                >
                  ❌
                </button>
              </div>
            </div>
            {customErrors[field] && errors[field]?.message && (
              <div className="flex items-center justify-start mt-2 sm:mt-0">
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
            disabled={datasAtendimento.length <= 0}
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
            disabled={horariosAtendimento.length <= 0}
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
        <div className="space-y-3 sm:space-y-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0">
            <p>Número de pokémons a serem atendidos:</p>
            <p className="text-lg sm:text-sm">0{pokeFields.length}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0">
            <p>Atendimento unitário por pokémon:</p>
            <p className="text-lg sm:text-sm">{real.format(VALOR_UNITARIO)}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0">
            <p>Subtotal:</p>
            <p className="text-lg sm:text-sm">
              {real.format(pokeFields.length * VALOR_UNITARIO)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0">
            <p>Taxa geracional*:</p>
            <p className="text-lg sm:text-sm">
              {real.format(
                calcularTaxaGeracional() * (pokeFields.length * VALOR_UNITARIO)
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0">
            <small className="text-xs sm:text-[0.5rem]">
              *adicionamos uma taxa de 3%, multiplicado pelo level mais alto dos
              Pokémons do time, com limite de até 30%
            </small>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
          <p className="text-2xl font-semibold text-[#1d1d1d]">
            Valor Total: {real.format(calcularValorTotal(pokeFields.length))}
          </p>
          <motion.button
            type="submit"
            className="p-3 bg-customRed text-white text-sm font-bold rounded-full w-full sm:w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Concluir Agendamento
          </motion.button>
        </div>
      </section>
    </form>
  );
}
