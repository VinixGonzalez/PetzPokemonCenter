import AgendarConsultaForm from "@/components/Forms/AgendarConsultaForm/AgendarConsultaForm";
import SubHeader from "@/components/SubHeader/SubHeader";
import React from "react";

export default function AgendarConsultaPage() {
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
      <section
        id="agendar-consulta-content"
        className="flex flex-col flex-1 max-w-7xl gap-12 mx-auto p-8 text-[#1d1d1d]"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          Preencha o formulário abaixo para agendar sua consulta
        </h2>

        <AgendarConsultaForm />
      </section>
    </main>
  );
}
