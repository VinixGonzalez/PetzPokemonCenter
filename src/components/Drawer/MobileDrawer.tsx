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
  Input,
  DrawerFooter,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import Link from "next/link";

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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody className="space-y-4">
            <p className="font-medium text-xl">PokéPetz</p>

            <ul className="flex flex-col gap-4">
              <li>
                <Link href={"/quem-somos"}>Quem Somos</Link>
              </li>
              <li>
                <Link href={"/quem-somos"}>Agendar Consulta</Link>
              </li>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
