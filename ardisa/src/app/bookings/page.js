"use client";
import { useDarkMode } from "@/Store/darkModeStore";
import {
  Badge,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Box,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArdisaFetch } from "@/components/Middleware/AxiosInstance";
import { useAuthStore } from "@/Store/authStore";
import { format, formatDistance } from "date-fns";
function Bookings() {
  const { darkMode } = useDarkMode();
  const { Users, isAuthenticated } = useAuthStore();
  const userId = Users.other._id;
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", userId],
    queryFn: async () => {
      const res = await ArdisaFetch.get(
        `/v1/booking/viewBooking/user?userId=${userId}`,
      );
      return res.data;
    },
  });
  console.log(data);
  console.log(userId);
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      px={[1, 2, 30, 90, 90]}
      bg={!darkMode ? "#DEF5F4" : "gray.800"}
      justifyContent={"center"}
      transition={"0.6s ease-in"}>
      <TableContainer
        bg={!darkMode ? "#f4f4f4" : "gray.700"}
        color={!darkMode ? "gray.800" : "#DEF5F4"}
        rounded={22}
        padding={4}
        transition={"0.6s ease-in"}
        height={"fit-content"}>
        <Table
          variant='striped'
          transition={"0.6s ease-in"}
          colorScheme={!darkMode ? "teal" : "blackAlpha"}
          color={!darkMode ? "gray.800" : "#DEF5F4"}>
          <Thead>
            <Tr>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"}>Name</Th>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"}>Price</Th>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"} isNumeric>
                Days
              </Th>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"}>Check-In</Th>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"}>Check-OUT</Th>
              <Th color={!darkMode ? "gray.600" : "#DEF5F4"}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 ? (
              data.map((data) => (
                <Tr>
                  <Td>{data.place.title}</Td>
                  <Td>£{data.price}</Td>
                  <Td>
                    {formatDistance(
                      new Date(data.checkIN),
                      new Date(data.checkOUT),
                      [],
                    )}
                  </Td>
                  <Td>{format(new Date(data.checkIN), "MM/dd/yyyy")}</Td>
                  <Td>{format(new Date(data.checkOUT), "MM/dd/yyyy")}</Td>

                  <Td>
                    <Badge padding={2} rounded={22} colorScheme='green'>
                      {data.status}
                    </Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Box>No data found</Box>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default Bookings;
