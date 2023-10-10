"use client";
import ProductCard from "@/components/Cards/ProductCard";
import Search from "@/components/search/search";
import { Box, Flex, Text } from "@chakra-ui/react";
import Img1 from "@/assets/imag11.jpg";
import products from "@/components/testJson/product.json";
import { useState } from "react";
import RouteProctector from "@/components/Middleware/RouteProctector";
export default function page() {
  const [favorites, setFavourites] = useState(true);
  const clickFavorites = () => {
    setFavourites(!favorites);
    console.log(" Added to favorites");
  };
  return (
    <RouteProctector>
      <div>
        <Box
          width={"full"}
          height={"200vh"}
          px={[2, 2, 10, 90, 100]}
          bg={"#DEF5F4"}
          position={"relative"}>
          <Search top={0} height={"8%"} />

          <Flex
            flexWrap={"wrap"}
            width={"full"}
            height={"88%"}
            alignContent={"flex-start"}
            gap={"15px"}
            top={"130px"}
            position={"relative"}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                photo={Img1}
                title={product.name}
                price={product.price}
                clickFavour={clickFavorites}
                favour={favorites}
                rating={4.3}
                address={product.summary}
              />
            ))}
          </Flex>
        </Box>
      </div>
    </RouteProctector>
  );
}
