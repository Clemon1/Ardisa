"use client";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ top, height, handleLocation, handleSearch, filter }) => {
  return (
    <Flex
      width={["full", "80%", "80%", "86%", "85%"]}
      padding={4}
      gap={3}
      display={["none", "none", "none", "flex", "flex"]}
      zIndex={100}
      alignItems={"center"}
      position={"absolute"}
      rounded={28}
      height={height}
      top={top}
      bg={"#f4f4f4"}>
      <FormControl>
        <FormLabel fontWeight={600} fontSize={[14, 15, 15, 16, 16]}>
          Location
        </FormLabel>
        <Input
          width={"full"}
          type='text'
          placeholder='Search destination'
          rounded={14}
          onChange={handleLocation}
        />
      </FormControl>
      <Divider orientation='vertical' />

      <FormControl>
        <FormLabel fontSize={[14, 15, 15, 16, 16]} fontWeight={600}>
          Check In
        </FormLabel>
        <Input
          width={"full"}
          type='date'
          placeholder='Add dates'
          rounded={14}
        />
      </FormControl>
      <Divider orientation='vertical' />

      <FormControl width={"full"}>
        <FormLabel fontSize={[14, 15, 15, 16, 16]} fontWeight={600}>
          Check Out
        </FormLabel>
        <Input
          width={"full"}
          type='date'
          placeholder='Add dates'
          rounded={14}
        />
      </FormControl>
      <Divider orientation='vertical' />

      <FormControl>
        <FormLabel fontSize={[14, 15, 15, 16, 16]} fontWeight={600}>
          Guest
        </FormLabel>
        <Input type='number' placeholder='Add guests' rounded={14} />
      </FormControl>

      <Button
        bg={"#0D0C22"}
        fontWeight={600}
        onClick={handleSearch}
        color={"#f4f4f4"}
        _hover={{}}
        padding={8}
        rounded={20}>
        <Icon as={AiOutlineSearch} fontSize={28} fontWeight={600} />
      </Button>
    </Flex>
  );
};

export default Search;
