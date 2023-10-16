"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/Store/authStore";
import { ArdisaFetch } from "@/components/Middleware/AxiosInstance";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.onSuccess);
  const queryCLient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const loginMutation = useMutation({
    mutationFn: async (body) => {
      const res = await ArdisaFetch.post(`/ardisa/admin/login`, body);
      authUser(res.data);
    },
    onSuccess: () => {
      queryCLient.invalidateQueries(["auth"]);
      router.push("/hotels");
      toast({
        title: "Logged in Successfully",
        status: "success",
        position: "top",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log("error", error.response.data);
      toast({
        title: error.response.data,
        status: "error",
        position: "top",
        variant: "top-accent",
        duration: 4000,
        isClosable: true,
      });
    },
  });
  const dataBody = {
    email,
    password,
  };
  console.log(dataBody);
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutateAsync(dataBody);
  };
  return (
    <div>
      <Flex
        width={"full"}
        bg={"#DEF5F4"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Box
          width={["100%", "80%", "40%", "38%", "33%"]}
          bg={"#ffffff"}
          rounded={22}
          height={"fit-content"}
          padding={4}>
          <form onSubmit={handleLogin}>
            <Text fontSize={22} fontWeight={600} textAlign={"center"}>
              Login
            </Text>

            <FormControl mb={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type='text'
                border={"#0D0C22 2px solid"}
                rounded={24}
                placeholder='Your Email Address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                border={"#0D0C22 2px solid"}
                placeholder='Your Password'
                rounded={24}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              bg={"#0D0C22"}
              color={"#f4f4f4"}
              type='submit'
              _hover={{}}
              width={"full"}
              rounded={12}>
              Login
            </Button>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default Login;
