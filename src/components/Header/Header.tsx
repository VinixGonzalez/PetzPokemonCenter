import React from "react";
import { PokeCenterButton } from "../PokeCenterButton/PokeCenterButton";
import MobileDrawer from "../Drawer/MobileDrawer";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="w-full bg-white px-12 py-5 flex flex-wrap items-center justify-between">
        <PokeCenterButton text="Centro Pokémon" />

        <div className="sm:hidden ml-auto">
          <MobileDrawer />
        </div>

        <div className="hidden sm:flex items-center gap-7/5">
          <Link href={"/quem-somos"} className="text-sm font-normal">
            Quem Somos
          </Link>
          <Link
            href={"/agendar-consulta"}
            className="bg-customRed py-3 px-6 rounded-full text-white"
          >
            Agendar Consulta
          </Link>
        </div>
      </nav>
    </header>
  );
}
