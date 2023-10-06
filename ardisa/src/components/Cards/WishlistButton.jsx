"use client";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
const WishListBtn = (props) => {
  return (
    <IconButton
      padding={2}
      fontSize={25}
      rounded={"full"}
      _hover={{ transform: "scale(1.1)" }}
      sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
      transition='all 0.15s ease'
      {...props}
    />
  );
};

export default WishListBtn;
