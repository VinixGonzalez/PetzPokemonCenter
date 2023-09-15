import { PokeCenterButton } from "@/components/PokeCenterButton/PokeCenterButton";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <h1>welcome to pokecenter</h1>
      <div>
        <PokeCenterButton text="Centro Pokémon" animationTime={5000} />
      </div>
    </div>
  );
}
