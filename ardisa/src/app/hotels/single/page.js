import { Box, Flex, Text } from "@chakra-ui/react";
import Img1 from "@/assets/img22.jpg";
import { OurImage } from "@/components/ImageOptimizer";
import BookingForm from "@/components/BookingForm/BookingForm";

function SingleHotel() {
  return (
    <Flex
      flexDirection={"column"}
      width={"100%"}
      gap={4}
      bg={"#DEF5F4"}
      height={"fit-content"}
      px={[2, 2, 10, 90, 100]}>
      <Flex width={"full"} height={"60vh"}>
        <OurImage
          src={Img1}
          rounded={22}
          fill={true}
          objectFit={"cover"}
          priority={false}
          alt='Image'
        />
      </Flex>
      <Flex
        width={"full"}
        justifyContent={"center"}
        alignItems={["center", "center", "center", "flex-start", "flex-start"]}
        flexDirection={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
          "row",
        ]}
        gap={3}>
        <Flex
          width={["full", "full", "full", "full", "65%"]}
          height={"100vh"}
          boxShadow={"lg"}
          gap={2}
          padding={4}
          flexDirection={"column"}
          rounded={22}
          bg={"#F9F8FF"}>
          <Box width={"full"}>
            <Text fontSize={24} fontWeight={700} noOfLines={1}>
              CR7 Suii International Hotel
            </Text>
          </Box>
        </Flex>
        <Box
          width={["100%", "100%", "100%", "fit-content", "35%"]}
          height={"100%"}
          position={["relative", "relative", "relative", "relative", "sticky"]}
          top={0}>
          <BookingForm price={199} rating={4.5} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default SingleHotel;
