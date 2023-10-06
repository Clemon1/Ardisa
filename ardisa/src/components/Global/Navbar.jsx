"use client";
import {
  Button,
  Flex,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FaBarsStaggered } from "react-icons/fa6";

import React from "react";

export default function Navbar() {
  return (
    <Flex
      width={"100%"}
      px={[1, 2, 30, 90, 100]}
      py={8}
      bg={"#DEF5F4"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={"11vh"}>
      <Heading fontSize={24} fontWeight={700}>
        <Link href='/'>Ardisa</Link>
      </Heading>

      <UnorderedList
        listStyleType={"none"}
        display={["none", "none", "none", "flex", "flex"]}
        gap={4}>
        <Link href='/'>
          <ListItem padding={2}>Home</ListItem>
        </Link>
        <Link href='/hotels'>
          <ListItem padding={2}>Accomodation</ListItem>
        </Link>
        <ListItem padding={2}>Settings </ListItem>
        <ListItem padding={2}> Contact </ListItem>
      </UnorderedList>
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={4}
        display={["none", "none", "none", "flex", "flex"]}>
        <Link href={"/Register"}>
          <Button bg={"#0D0C22"} color={"#f4f4f4"} rounded={10} px={8} py={6}>
            Register
          </Button>
        </Link>
        <Link href={"/Login"}>
          <Button bg={"#F9F8FF"} rounded={10} px={8} py={6} color={"#0D0C22"}>
            Login
          </Button>
        </Link>
      </Flex>

      <Button
        display={["flex", "flex", "flex", "none", "none"]}
        bg={"#0D0C22"}
        color={"#f4f4f4"}
        rounded={14}
        _hover={{}}
        px={8}
        py={6}>
        <Icon as={FaBarsStaggered} fontSize={20} />
      </Button>
    </Flex>
  );
}
