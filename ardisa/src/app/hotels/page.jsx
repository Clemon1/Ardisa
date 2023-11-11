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
import { useSearchParams, useRouter } from "next/navigation";

export default function page() {
  const { Users, isAuthenticated } = useAuthStore();

  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [locate, setLocate] = useState("");
  const router = useRouter();
  const hanSearch = (e) => {
    e.preventDefault();
    router.push(`/hotels/search/${location}`);
  };
  const searchData = async (locate) => {
    const res = await ArdisaFetch.get(
      `/v1/rentals/viewrooms/?search=${locate}`,
    );
    return res.data;
  };

  const userId = isAuthenticated ? Users.other._id : null;
  const recommendData = async () => {
    const res = await ArdisaFetch.get(`/v1/rentals/recommendations/${userId}`);
    console.log(res.data);
    return res.data;
  };

  const { isLoading, data, isError } = useQuery({
    queryKey: ["hotels", locate],
    queryFn: searchData,
  });
  const { data: recommend } = useQuery({
    queryKey: ["recommend"],
    queryFn: recommendData,
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
          py={2}
          bg={!darkMode ? "#DEF5F4" : "gray.800"}
          transition={"0.6s ease-in"}
          position={"relative"}>
          <Search
            top={0}
            height={"8%"}
            handleLocation={(e) => setLocation(e.target.value)}
            handleSearch={hanSearch}
          />

          <Flex
            flexWrap={"wrap"}
            width={"full"}
            height={"100vh"}
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
                  rating={product.ratings}
                  address={product.address}
                  link={product._id}
                />
              ))
            ) : (
              <Box width={"100%"} height={"100vh"}>
                {isLoading && <>...Loading</>}
              </Box>
            )}
          </Flex>
          <Box width={"100%"}>
            <Box>
              <Text fontSize={24} fontWeight={500}>
                System Recommendation
              </Text>
            </Box>
            <Flex
              width={"100%"}
              height={"100%"}
              justifyContent={"flex-start"}
              gap={2}
              top={"130px"}
              position={"relative"}>
              {recommend && recommend.length > 0 ? (
                recommend.map((product) => (
                  <ProductCard
                    key={product.id}
                    photo={product.photos}
                    bg={!darkMode ? "#F9F8FF" : "#0c131d"}
                    title={product.title}
                    price={product.price}
                    color={!darkMode ? "gray.800" : "#F9F8FF"}
                    rating={product.ratings}
                    address={product.address}
                    link={product._id}
                  />
                ))
              ) : (
                <>
                  <Text>No recommendation found</Text>
                </>
              )}
            </Flex>
          </Box>
        </Box>
      </div>
    </RouteProctector>
  );
}
