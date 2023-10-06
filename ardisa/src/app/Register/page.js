"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuthStore } from "@/Store/authStore";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter();
  const authStore = useAuthStore((state) => state.onSuccess);
  const viewUser = useAuthStore((state) => state.Users);
  const queryClient = useQueryClient();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataBody = {
    fullname,
    email,
    password,
  };
  console.log(viewUser);
  const createAuth = useMutation({
    mutationFn: async (body) => {
      const res = await axios.post(
        "http://localhost:4000/ardisa/admin/register",
        body,
      );
      authStore(res.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      router.push("/hotels");
    },
  });

  console.log(dataBody);
  const handleRegistration = (e) => {
    e.preventDefault();
    createAuth.mutateAsync(dataBody);
  };
  return (
    <Flex
      width={"full"}
      bg={"#DEF5F4"}
      height={"90vh"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Box
        width={["100%", "75%", "55%", "35%", "33%"]}
        bg={"#F9F8FF"}
        rounded={22}
        height={"fit-content"}
        padding={4}>
        <form onSubmit={handleRegistration}>
          {createAuth.isError && <Text>{createAuth.error.response.data}</Text>}
          {createAuth.isSuccess && <Text>registration Sucessful</Text>}

          <Text fontSize={22} fontWeight={600} textAlign={"center"}>
            Register
          </Text>
          <FormControl mb={2}>
            <FormLabel>Fullname</FormLabel>
            <Input
              border={"#0D0C22 2px solid"}
              rounded={24}
              type='text'
              placeholder='Your Fullname'
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Input
              type='text'
              rounded={24}
              border={"#0D0C22 2px solid"}
              placeholder='Your Email Address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              rounded={24}
              border={"#0D0C22 2px solid"}
              placeholder='Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            bg={"#0D0C22"}
            type='submit'
            color={"#F9F8FF"}
            _hover={{}}
            width={"full"}
            rounded={24}>
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
