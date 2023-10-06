"use client";
import Image from "next/image";
import { chakra } from "@chakra-ui/react";
export const OurImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});
