"use client";

import { useAuthStore } from "@/Store/authStore";
import { useDarkMode } from "@/Store/darkModeStore";
import RouteProctector from "@/components/Middleware/RouteProctector";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Profile() {
  const { darkMode } = useDarkMode();
  const { Users, isAuthenticated } = useAuthStore();
  return (
    <RouteProctector>
      <Center
        width={"100%"}
        height={"100vh"}
        transition={"0.6s ease-in"}
        py={6}
        bg={!darkMode ? "#DEF5F4" : "gray.800"}>
        <Box
          maxW={["270px", "270px", "270px", "270px", "370px"]}
          w={"full"}
          transition={"0.6s ease-in"}
          bg={!darkMode ? "#f4f4f4" : "gray.800"}
          color={!darkMode ? "gray.800" : "#F9F8FF"}
          boxShadow={"2xl"}
          rounded={12}
          overflow={"hidden"}>
          <Image
            h={"140px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit='cover'
            alt='#'
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"2xl"}
              name={isAuthenticated ? Users.other.fullname : ""}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500}>
                {isAuthenticated ? Users.other.fullname : ""}
              </Heading>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>
                  {isAuthenticated ? Users.other.bookmark.length : 0}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Wishlist
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>13</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Orders
                </Text>
              </Stack>
            </Stack>

            <Button
              w={"full"}
              mt={8}
              transition={"0.6s ease-in"}
              bg={!darkMode ? "gray.800" : "#DEF5F4"}
              color={!darkMode ? "#DEF5F4" : "gray.800"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}>
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Center>
    </RouteProctector>
  );
}
