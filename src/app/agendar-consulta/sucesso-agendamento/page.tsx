"use client";

import SubHeader from "@/components/SubHeader/SubHeader";
import { useAgendarConsultaStore } from "@/store/agendarConsultaStore";
import { redirect } from "next/navigation";
import React from "react";

export default function SucecssoAgendamentoPage() {
  const { agendamentoStatus } = useAgendarConsultaStore();

  if (agendamentoStatus !== "success") {
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
      <div>sucesso</div>
    </main>
  );
}
