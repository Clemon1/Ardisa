"use client";
import { Box, Card, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { OurImage } from "../ImageOptimizer";
import WishListBtn from "./WishlistButton";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";

const ProductCard = ({
  title,
  rating,
  photo,
  address,
  price,
  clickFavour,
  favour,
}) => {
  return (
    <Card
      flex={" 1 1 1"}
      width={["48%", "48%", "31%", "28%", "24%"]}
      height={"38%"}
      bg={"#F9F8FF"}
      rounded={24}
      position={"relative"}>
      <WishListBtn
        onClick={clickFavour}
        position={"absolute"}
        top={"15px"}
        right={"15px"}
        icon={
          favour ? (
            <Icon as={AiOutlineHeart} transition='all 0.15s ease' />
          ) : (
            <Icon
              as={AiFillHeart}
              color={"red.600"}
              transition='all 0.15s ease'
            />
          )
        }
      />
      <OurImage
        src={photo}
        rounded={24}
        objectFit={"cover"}
        width={"full"}
        priority={false}
        alt='Image'
        height={"80%"}
      />

      <Flex
        width={"full"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        py={6}
        px={4}
        height={"35%"}>
        <Flex
          width={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Text fontSize={17} fontWeight={600} noOfLines={1}>
            {title}
          </Text>
          <Flex>
            <Icon as={AiFillStar} color={"yellow.400"} fontSize={22} />
            <Text fontWeight={400}>{rating}</Text>
          </Flex>
        </Flex>
        <Flex width={"full"}>
          <Text fontSize={16} color={"gray.500"} fontWeight={400} noOfLines={1}>
            {address}
          </Text>
        </Flex>
        <Flex width={"full"} gap={1}>
          <Text fontSize={17} fontWeight={600}>
            <>$</>
            {price}
          </Text>
          <Text fontSize={16} fontWeight={400}>
            /night
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProductCard;
