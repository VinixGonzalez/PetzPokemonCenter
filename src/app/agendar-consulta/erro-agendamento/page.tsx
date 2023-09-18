"use client";

import AgendarConsultaForm from "@/components/Forms/AgendarConsulaForm/AgendarConsultaForm";
import SubHeader from "@/components/SubHeader/SubHeader";
import { useAgendarConsultaStore } from "@/store/agendarConsultaStore";
import { redirect } from "next/navigation";
import React from "react";

export default function ErroAgendamentoPage() {
  const { agendamentoStatus } = useAgendarConsultaStore();

  if (agendamentoStatus !== "error") {
    redirect("/agendar-consulta");
  }

  return (
    <main className="flex flex-col">
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

      <div>erro</div>
    </main>
  );
}
