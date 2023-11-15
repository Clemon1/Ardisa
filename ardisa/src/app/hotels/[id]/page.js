"use client";
import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import Img1 from "@/assets/img22.jpg";
import { OurImage } from "@/components/ImageOptimizer";
import BookingForm from "@/components/BookingForm/BookingForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArdisaFetch } from "@/components/Middleware/AxiosInstance";
import { useState } from "react";
import { useAuthStore } from "@/Store/authStore";
import RouteProctector from "@/components/Middleware/RouteProctector";
import { headers } from "../../../../next.config";

function SingleHotel({ params }) {
  const { Users } = useAuthStore();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["hotels", params.id],
    queryFn: async () => {
      const res = await ArdisaFetch.get(`/v1/rentals/viewrooms/${params.id}`);
      return res.data;
    },
  });

  const [checkIN, setCheckIN] = useState("");
  const [checkOUT, setCheckOUT] = useState("");
  const [numOfGuest, setNoOfGuest] = useState(1);

  const body = {
    userId: Users.other._id,
    place: params.id,
    email: Users.other.email,
    price: data && data.singleHome.price,
    checkIN,
    checkOUT,
    numOfGuest,
  };
  const toast = useToast();
  console.log(body);
  const queryClient = useQueryClient();
  const bookingnMutation = useMutation({
    mutationFn: (body) => {
      return ArdisaFetch.post("/v1/booking/createBooking", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast({
        title: "Booked Successfully",
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
  const handleBooking = (e) => {
    e.preventDefault();
    bookingnMutation.mutateAsync(body);
  };

  if (isLoading) {
    return null;
  }

  return (
    <RouteProctector>
      <Flex
        flexDirection={"column"}
        width={"100%"}
        gap={4}
        bg={"#DEF5F4"}
        height={"fit-content"}
        px={[2, 2, 10, 90, 100]}>
        {data ? (
          <>
            <Flex width={"full"} height={"60vh"}>
              <Image
                src={data?.singleHome?.photos}
                rounded={22}
                width={"full"}
                height={"60vh"}
                objectFit={"cover"}
                alt='Image'
              />
            </Flex>
            <Flex
              width={"full"}
              justifyContent={"center"}
              alignItems={[
                "center",
                "center",
                "center",
                "flex-start",
                "flex-start",
              ]}
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
                    {data?.singleHome?.title}
                  </Text>
                  <Text> {data?.singleHome?.description} </Text>
                </Box>
              </Flex>
              <Box
                width={["100%", "100%", "100%", "fit-content", "35%"]}
                height={"100%"}
                position={[
                  "relative",
                  "relative",
                  "relative",
                  "relative",
                  "sticky",
                ]}
                top={0}>
                <BookingForm
                  handleSubmit={handleBooking}
                  price={data.singleHome.price || "Price not Available"}
                  rating={data.rating}
                  handleCheckIn={(e) => setCheckIN(e.target.value)}
                  handleCheckOut={(e) => setCheckOUT(e.target.value)}
                  handleGuest={(e) => setNoOfGuest(e.target.value)}
                />
              </Box>
            </Flex>
          </>
        ) : (
          <Box> {isLoading && <>...Loading </>}</Box>
        )}
      </Flex>
    </RouteProctector>
  );
}

export default SingleHotel;
