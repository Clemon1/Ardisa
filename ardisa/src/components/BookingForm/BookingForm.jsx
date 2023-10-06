"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

function BookingForm({
  handleSubmit,
  handleCheckIn,
  handleCheckOut,
  handleGuest,
  rating,
  price,
}) {
  return (
    <Flex
      width={"full"}
      bg={"#ffffff"}
      rounded={22}
      boxShadow={"lg"}
      flexDirection={"column"}
      height={"fit-content"}
      padding={4}>
      <Flex
        width={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Flex>
          <Text fontSize={24} fontWeight={500}>
            ${price}
          </Text>
          <Text alignSelf={"center"} fontSize={16} fontWeight={400}>
            /nights
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={AiFillStar} fontSize={20} />
          <Text fontWeight={500}>{rating}</Text>
        </Flex>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Flex width={"full"} gap={1} mb={2}>
          <FormControl>
            <FormLabel>Check-In</FormLabel>
            <Input
              border={"#0D0C22 2px solid"}
              rounded={22}
              type='date'
              onChange={handleCheckIn}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Check-Out</FormLabel>
            <Input
              border={"#0D0C22 2px solid"}
              rounded={22}
              type='date'
              placeholder='Your Fullname'
              onChange={handleCheckOut}
            />
          </FormControl>
        </Flex>
        <FormControl width={"full"} mb={2}>
          <FormLabel>Guests</FormLabel>
          <Select
            border={"#0D0C22 2px solid"}
            rounded={22}
            placeholder='Number Of Guests'>
            <option value='option1'>1</option>
            <option value='option2'>2</option>
            <option value='option3'>3</option>
          </Select>
        </FormControl>
        <Button
          bg={"#0D0C22"}
          type='submit'
          fontSize={14}
          fontWeight={600}
          color={"#f4f4f4"}
          _hover={{}}
          width={"full"}
          rounded={22}>
          BOOK NOW
        </Button>
      </form>
    </Flex>
  );
}

export default BookingForm;
