"use client";

import React, { useState } from "react";
import { PokeCenterButton } from "../PokeCenterButton/PokeCenterButton";
import MobileDrawer from "../Drawer/MobileDrawer";

function Header() {
  return (
    <header className="w-full bg-white flex flex-wrap items-center px-12 py-5">
      <PokeCenterButton text="Centro Pokémon" />

      <div className="sm:hidden ml-auto">
        <MobileDrawer />
      </div>
    </header>
  );
}

export default Header;
