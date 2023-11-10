"use client";
import {
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { OurImage } from "../ImageOptimizer";

import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

const ProductCard = ({
  title,
  rating,
  photo,
  address,
  price,
  bg,
  color,
  clickFavour,
  favour,
  link,
}) => {
  return (
    <Card
      flex={" 1 1 1"}
      width={["48%", "48%", "31%", "28%", "24%"]}
      height={"60vh"}
      bg={bg}
      color={color}
      transition={"0.6s ease-in"}
      rounded={24}
      position={"relative"}>
      {/* <WishListBtn
        onClick={clickFavour}
        position={"absolute"}
        top={"15px"}
        right={"15px"}
        icon={
          !favour ? (
            <Icon as={AiOutlineHeart} transition='all 0.15s ease' />
          ) : (
            <Icon
              as={AiFillHeart}
              color={"red.600"}
              transition='all 0.15s ease'
            />
          )
        }
      /> */}
      <Image
        src={photo}
        rounded={24}
        objectFit={"cover"}
        width={"full"}
        height={"80%"}
      />
      <Link
        padding={0}
        href={`/hotels/${link}`}
        width={"fit-content"}
        height={"fit-content"}>
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
            <Text
              fontSize={16}
              color={"gray.500"}
              fontWeight={400}
              noOfLines={1}>
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
      </Link>
    </Card>
  );
};

export default ProductCard;
