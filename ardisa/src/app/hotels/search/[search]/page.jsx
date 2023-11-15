"use client";
import ProductCard from "@/components/Cards/ProductCard";
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
    <Flex width={"100%"} height={"100vh"} bg={"#DEF5F4"}>
      <Flex width={"100%"} gap={2} padding={4}>
        {Room && Room.length > 0 ? (
          Room.map((product, key) => (
            <ProductCard
              key={key}
              photo={product.photos}
              // bg={!darkMode ? "#F9F8FF" : "#0c131d"}
              title={product.title}
              price={product.price}
              // color={!darkMode ? "gray.800" : "#F9F8FF"}
              rating={product.ratings}
              address={product.address}
              link={product._id}
            />
          ))
        ) : (
          <>
            <Flex
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"60vh"}>
              <Text fontSize={24} fontWeight={500}>
                No results found!
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default SearchPage;
