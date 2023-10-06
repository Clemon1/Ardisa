import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex
      width={"full"}
      bg={"#DEF5F4"}
      height={"90vh"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Box
        width={["100%", "80%", "40%", "38%", "33%"]}
        bg={"#ffffff"}
        rounded={12}
        height={"fit-content"}
        padding={4}>
        <Text fontSize={22} fontWeight={600} textAlign={"center"}>
          Login
        </Text>

        <FormControl mb={2}>
          <FormLabel>Email</FormLabel>
          <Input
            type='text'
            border={"#0D0C22 2px solid"}
            placeholder='Your Email Address'
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Password</FormLabel>
          <Input
            type='text'
            border={"#0D0C22 2px solid"}
            placeholder='Your Password'
          />
        </FormControl>
        <Button
          bg={"#0D0C22"}
          color={"#f4f4f4"}
          _hover={{}}
          width={"full"}
          rounded={12}>
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
