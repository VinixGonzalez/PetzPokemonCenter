import React from "react";

export default function Footer() {
  return (
    <footer
      data-testid="Footer"
      className="bg-[#1D1D1D] h-[72px] flex items-center justify-center"
    >
      <p className="text-white text-xs sm:text-sm font-normal text-center sm:text-left">
        Todas as marcas e ilustrações utilizadas
        <br className="sm:hidden" /> são de seus respectivos donos.
      </p>
    </footer>
  );
}
