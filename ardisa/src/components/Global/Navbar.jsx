"use client";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Link } from "@chakra-ui/next-js";
import { FaBarsStaggered } from "react-icons/fa6";

import { useAuthStore } from "@/Store/authStore";

const Navbar = () => {
  const isUser = useAuthStore((state) => state.Users);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLogOut = useAuthStore((state) => state.onLogOut);

  return (
    <div>
      <Flex
        width={"100%"}
        px={[1, 2, 30, 90, 100]}
        py={8}
        bg={"#DEF5F4"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"11vh"}>
        <Heading fontSize={24} fontWeight={700}>
          <Link href='/' _hover={{ textDecoration: "none" }}>
            Ardisa
          </Link>
        </Heading>

        <UnorderedList
          listStyleType={"none"}
          display={["none", "none", "none", "flex", "flex"]}
          gap={4}>
          <Link href='/' _hover={{ textDecoration: "none" }}>
            <ListItem padding={2} fontWeight={500}>
              Home
            </ListItem>
          </Link>
          <Link href='/hotels' _hover={{ textDecoration: "none" }}>
            <ListItem padding={2} fontWeight={500}>
              Accomodation
            </ListItem>
          </Link>
        </UnorderedList>
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={4}>
          <Menu>
            <MenuButton
              as={Button}
              bg={"#F9F8FF"}
              boxShadow={"lg"}
              rounded={22}
              leftIcon={<FaBarsStaggered />}>
              <Avatar
                name={isAuthenticated ? isUser.other.fullname : ""}
                size={"sm"}
              />
            </MenuButton>
            <MenuList zIndex={400} rounded={22} padding={2} boxShadow={"lg"}>
              {isAuthenticated ? (
                <>
                  <MenuItem fontWeight={500}>Booking History</MenuItem>
                  <MenuItem fontWeight={500}>Wishlist</MenuItem>
                  <MenuItem fontWeight={500}>Notifications</MenuItem>
                  <MenuItem fontWeight={500}>Contact</MenuItem>
                  <Divider />
                  <MenuItem fontWeight={500}>Profile</MenuItem>
                  <MenuItem fontWeight={500} onClick={() => isLogOut()}>
                    LogOut
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem fontWeight={500}>Contact</MenuItem>
                  <Link href={"/Login"} _hover={{ textDecoration: "none" }}>
                    <MenuItem fontWeight={500} fontSize={16}>
                      Login
                    </MenuItem>
                  </Link>
                  <Link href={"/Register"} _hover={{ textDecoration: "none" }}>
                    <MenuItem fontWeight={500} fontSize={16}>
                      SignUp
                    </MenuItem>
                  </Link>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </div>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
