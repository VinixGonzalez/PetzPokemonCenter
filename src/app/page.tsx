import { PokeCenterButton } from "@/components/PokeCenterButton/PokeCenterButton";
import React from "react";

export default function HomePage() {
  return (
    <main
      data-testid="main-home"
      className="flex flex-1 items-center justify-center bg-center bg-cover bg-no-repeat bg-home"
    >
      <h1 className="text-white text-2xbase font-bold text-center">
        Cuidamos bem do seu pokémon,
        <br /> para ele cuidar bem de você
      </h1>
    </main>
  );
}
