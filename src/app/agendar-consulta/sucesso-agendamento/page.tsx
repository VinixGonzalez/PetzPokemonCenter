"use client";

import React, { useEffect, useState } from "react";
import SubHeader from "@/components/SubHeader/SubHeader";
import { useAgendarConsultaStore } from "@/store/agendarConsultaStore/agendarConsultaStore";
import { redirect } from "next/navigation";
import Image from "next/image";
import checkIcon from "@/../public/check.svg";
import Confetti from "react-confetti";

export default function SucecssoAgendamentoPage() {
  const { agendamentoStatus, agendamento, setAgendamentoStatus } =
    useAgendarConsultaStore();

  if (agendamentoStatus !== "success") {
    redirect("/agendar-consulta");
  }

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col flex-1">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          run={showConfetti}
        />
      )}

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
          <p className="text-xl font-bold">Consulta Agendada</p>
          <Image src={checkIcon} alt="check icon" />
          <p className="text-[#747474] text-sm font-normal text-center">{`Seu agendamento para dia ${agendamento.datasAtendimento}, às ${agendamento.horariosAtendimento}, para 0${agendamento.pokeList.length}x Pokémon(s) foi realizado com sucesso!`}</p>
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
