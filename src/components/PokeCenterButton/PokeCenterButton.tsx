"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import whitePokeball from "@/../public/images/white-pokeball.svg";
import { usePokeCenterButtonHelper } from "./PokeCenterButton.helper";
import Link from "next/link";

interface PokeCenterButtonProps {
  text: string;
  animationTime?: number;
}

export const PokeCenterButton: React.FC<PokeCenterButtonProps> = ({
  text,
  animationTime,
}) => {
  const { buttonVariants, controls, showText, setShowText } =
    usePokeCenterButtonHelper(animationTime);

  return (
    <motion.div
      initial="initial"
      animate={controls}
      variants={buttonVariants}
      style={{ transition: "width 0.1s", height: "62px" }}
      onMouseEnter={() => {
        setShowText(true);
        controls.start("initial");
      }}
      onMouseLeave={() => {
        setShowText(false);
        controls.start("afterTimeout");
      }}
      className={`bg-customRed flex items-center rounded-full pl-3 group`}
      layout
    >
      <Link href={"/"} className="flex items-center space-x-2">
        <Image
          src={whitePokeball}
          alt="white pokeball icon"
          className="group-hover:animate-spin"
        />
        {showText && <p className={`whitespace-nowrap text-white`}>{text}</p>}
      </Link>
    </motion.div>
  );
};
