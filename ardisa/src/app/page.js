"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

import Img1 from "../assets/imag11.jpg";
import Search from "@/components/search/search";
import { OurImage } from "@/components/ImageOptimizer";

export default function Home() {
  return (
    <div>
      <Box
        width={"100%"}
        height={"100vh"}
        px={[1, 2, 30, 90, 100]}
        bg={"#DEF5F4"}>
        <Flex
          flexDirection={"column"}
          width={"full"}
          height={"100%"}
          alignItems={"center"}
          position={"relative"}>
          <Box
            width={"full"}
            position={"absolute"}
            rounded={28}
            bg={"rgba(0, 0, 0, 0.4)"}
            height={"80%"}
            zIndex={1}></Box>
          <Flex
            width={"full"}
            zIndex={100}
            flexDirection={"column"}
            height={"70%"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}>
            <Text
              color={"#fafafa"}
              fontSize={[45, 44, 48, 50, 50]}
              textAlign={"center"}
              fontWeight={600}>
              Find The Best Place to
            </Text>
            <br />
            <Text
              color={"#fafafa"}
              fontSize={[45, 44, 48, 50, 50]}
              textAlign={"center"}
              fontWeight={600}>
              Enjoy Your Time!
            </Text>
          </Flex>
          <Search top={"27.4rem"} height={"17%"} />

          <OurImage
            src={Img1}
            rounded={28}
            priority={false}
            objectFit={"cover"}
            width={"full"}
            alt='Images'
            height={"80%"}
          />
        </Flex>
      </Box>
    </div>
  );
}
