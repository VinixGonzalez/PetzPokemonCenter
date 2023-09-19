"use client";

import { useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export const usePokeCenterButtonHelper = (animationTime: number = 5000) => {
  const buttonVariants = {
    initial: { width: "200px" },
    afterTimeout: { width: "62px" },
    onHover: { width: "200px" },
  };

  const controls = useAnimation();
  const [showText, setShowText] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      controls.start("afterTimeout");
      setShowText(false);
    }, animationTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animationTime, controls]);

  return {
    buttonVariants,
    showText,
    controls,
    setShowText,
  };
};
