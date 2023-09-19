"use client";

import React from "react";
import SubHeader from "@/components/SubHeader/SubHeader";
import { useAgendarConsultaStore } from "@/store/agendarConsultaStore/agendarConsultaStore";
import Image from "next/image";
import { redirect } from "next/navigation";
import warningIcon from "@/../public/warning.svg";

export default function ErroAgendamentoPage() {
  const { agendamentoStatus, setAgendamentoStatus } = useAgendarConsultaStore();

  if (agendamentoStatus !== "error") {
    redirect("/agendar-consulta");
  }

  return (
    <main className="flex flex-col flex-1">
      <SubHeader
        text="Agendar Consulta"
        subText="Recupere seus pokémons em 5 segundos."
        crumbList={[
          {
            isLast: true,
            path: "/agendar-consulta",
            label: "Agendar Consulta",
          },
        ]}
        showBreadcrumb
      />

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="border border-[#df8686] bg-[#df86860a] flex flex-col items-center justify-center px-8 py-4 rounded-lg gap-5 max-w-[420px]">
          <p className="text-lg font-bold text-center sm:text-left">
            Houve um problema no agendamento
          </p>
          <Image src={warningIcon} alt="warning icon" />
          <p className="text-[#747474] text-sm font-normal text-center">
            Por favor, tente novamente.
          </p>
          <button
            className="text-sm font-bold text-white bg-customRed p-3 rounded-full"
            onClick={() => {
              setAgendamentoStatus("idle");
              redirect("/agendar-consulta");
            }}
          >
            Fazer novo agendamento
          </button>
        </div>
      </div>
    </main>
  );
}
