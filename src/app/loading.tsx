"use client";

import React from "react";
import Image from "next/image";
import pokeBall from "@/../public/images/white-pokeball.svg";

function loading() {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 w-full h-screen bg-black/30">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-2xl">Carregando...</h1>
        <Image src={pokeBall} alt="poke ball image" className="animate-spin" />
      </div>
    </div>
  );
}

export default loading;
