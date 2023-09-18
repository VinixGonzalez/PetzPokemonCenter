"use client";

import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import whitePokeball from "@/../public/images/white-pokeball.svg";

export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <Icon as={HamburgerIcon} color={"red.500"} fontSize={28} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="bg-customRed text-white">
          <DrawerCloseButton />
          <DrawerHeader>Centro Pokémon</DrawerHeader>
          <DrawerBody className="space-y-4">
            <p className="font-medium text-xl">PokéPetz</p>

            <ul className="flex flex-col gap-4 text-lg">
              <li className="group">
                <Link className="flex items-center gap-2" href={"/quem-somos"}>
                  <Image
                    src={whitePokeball}
                    width={24}
                    height={24}
                    alt="white pokeball"
                    className="group-hover:animate-spin"
                  />
                  Quem Somos
                </Link>
              </li>
              <li className="group">
                <Link
                  className="flex items-center gap-2"
                  href={"/agendar-consulta"}
                >
                  <Image
                    src={whitePokeball}
                    width={24}
                    height={24}
                    alt="white pokeball"
                    className="group-hover:animate-spin"
                  />
                  Agendar Consulta
                </Link>
              </li>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
