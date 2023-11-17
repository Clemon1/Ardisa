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
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAuthStore } from "@/Store/authStore";
import { useDarkMode } from "@/Store/darkModeStore";
import RouteProctector from "../Middleware/RouteProctector";

const Navbar = () => {
  const isUser = useAuthStore((state) => state.Users);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLogOut = useAuthStore((state) => state.onLogOut);

  const { darkMode, isDark } = useDarkMode();

  return (
    <div>
      <Flex
        width={"100%"}
        px={[1, 2, 30, 90, 100]}
        py={8}
        bg={!darkMode ? "#DEF5F4" : "gray.800"}
        transition={"0.6s ease-in"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"11vh"}>
        <Heading
          fontSize={24}
          fontWeight={700}
          color={!darkMode ? "gray.800" : "#def5f4"}>
          <Link href='/' _hover={{ textDecoration: "none" }}>
            Ardisa
          </Link>
        </Heading>

        <UnorderedList
          listStyleType={"none"}
          display={["none", "none", "none", "flex", "flex"]}
          gap={4}>
          <Link
            href='/'
            _hover={{ textDecoration: "none" }}
            color={!darkMode ? "gray.800" : "#def5f4"}>
            <ListItem padding={2} fontWeight={500}>
              Home
            </ListItem>
          </Link>
          <Link
            href='/hotels'
            _hover={{ textDecoration: "none" }}
            color={!darkMode ? "gray.800" : "#def5f4"}>
            <ListItem padding={2} fontWeight={500}>
              Accomodation
            </ListItem>
          </Link>
        </UnorderedList>
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={4}>
          <Button
            bg={!darkMode ? "#F9F8FF" : "gray.700"}
            transition={"0.6s ease-in"}
            _hover={{}}
            rounded={22}
            onClick={() => isDark()}>
            {!darkMode ? (
              <Icon as={MdDarkMode} fontSize={20} color={"gray.800"} />
            ) : (
              <Icon as={MdLightMode} fontSize={20} color={"#F9F8FF"} />
            )}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              bg={!darkMode ? "#F9F8FF" : "gray.700"}
              transition={"0.6s ease-in"}
              boxShadow={"lg"}
              rounded={18}
              color={!darkMode ? "gray.800" : "#F9F8FF"}
              leftIcon={<FaBarsStaggered />}>
              <Avatar
                name={isAuthenticated ? isUser.other.fullname : ""}
                size={"sm"}
              />
            </MenuButton>
            <MenuList zIndex={400} rounded={22} padding={2} boxShadow={"lg"}>
              {isAuthenticated ? (
                <>
                  <Link href={"/bookings"} _hover={{ textDecoration: "none" }}>
                    <MenuItem fontWeight={500}>Booking History</MenuItem>
                  </Link>
                  {/* <MenuItem fontWeight={500}>Wishlist</MenuItem>
                  <MenuItem fontWeight={500}>Notifications</MenuItem>
                  <MenuItem fontWeight={500}>Contact</MenuItem> */}
                  <Divider />
                  <Link href={"/profile"} _hover={{ textDecoration: "none" }}>
                    <MenuItem fontWeight={500}>Profile</MenuItem>
                  </Link>
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
