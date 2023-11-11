"use client";
import { ArdisaFetch } from "@/components/Middleware/AxiosInstance";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function SearchPage({ params }) {
  const {
    isLoading,
    data: Room,
    isError,
  } = useQuery({
    queryKey: ["hotels", params.search],
    queryFn: async () => {
      const res = await ArdisaFetch.get(
        `/v1/rentals/search?search=${params.search}`,
      );
      return res.data;
    },
  });
  console.log("params:", params);
  console.log("results", Room);
  return (
    <Flex width={"100%"}>
      <Flex width={"100%"} gap={2}>
        {Room && Room.length > 0 ? (
          Room.map((data, key) => (
            <Card key={key} width={"20%"} height={"6vh"} bg={"blue.400"}>
              <Text>{data.title}</Text>
            </Card>
          ))
        ) : (
          <>
            <Text>No search</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default SearchPage;
