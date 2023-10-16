"use client";
import ProductCard from "@/components/Cards/ProductCard";
import Search from "@/components/search/search";
import { Box, Flex, Text } from "@chakra-ui/react";
import Img1 from "@/assets/imag11.jpg";
import products from "@/components/testJson/product.json";
import { useState } from "react";
import RouteProctector from "@/components/Middleware/RouteProctector";
import { useDarkMode } from "@/Store/darkModeStore";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/Store/authStore";
import { ArdisaFetch } from "@/components/Middleware/AxiosInstance";
import { useSearchParams } from "next/navigation";

export default function page() {
  const user = useAuthStore((state) => state.Users);
  const searchParams = useSearchParams();
  let location = "";

  const searchData = async (location) => {
    const res = await ArdisaFetch.get(
      `/v1/rentals/viewrooms/?search=${location}`,
    );
    return res.data;
  };
  const { isLoading, data, isError } = useQuery({
    queryKey: ["hotels", location],
    queryFn: searchData,
  });

  const [favorites, setFavourites] = useState("");
  const clickFavorites = () => {
    setFavourites(!favorites);
    console.log(" Added to favorites");
  };

  const { darkMode } = useDarkMode();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <span>Error</span>;
  }
  return (
    <RouteProctector>
      <div>
        <Box
          width={"full"}
          height={"200vh"}
          px={[2, 2, 10, 90, 100]}
          bg={!darkMode ? "#DEF5F4" : "gray.800"}
          transition={"0.6s ease-in"}
          position={"relative"}>
          <Search
            top={0}
            height={"8%"}
            handleLocation={(value) => setLocation(value)}
          />

          <Flex
            flexWrap={"wrap"}
            width={"full"}
            height={"88%"}
            alignContent={"flex-start"}
            gap={"15px"}
            top={"130px"}
            position={"relative"}>
            {data.length > 0 ? (
              data.map((product) => (
                <ProductCard
                  key={product.id}
                  photo={product.photos}
                  bg={!darkMode ? "#F9F8FF" : "#0c131d"}
                  title={product.title}
                  price={product.price}
                  color={!darkMode ? "gray.800" : "#F9F8FF"}
                  clickFavour={clickFavorites}
                  favour={""} // Check if the product is in favorites
                  rating={product.ratings}
                  address={product.address}
                  link={product._id}
                />
              ))
            ) : (
              <Box width={"100%"} height={"100vh"}>
                {isLoading && <>...Loading</>}{" "}
              </Box>
            )}
          </Flex>
        </Box>
      </div>
    </RouteProctector>
  );
}
