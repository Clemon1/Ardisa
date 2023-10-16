import users from "../model/usersModel";
import bookings from "../model/bookingModel";
import rentals from "../model/rentalModel";
// Function to recommend products for a user
export const recommendedHotels = async (userId: string) => {
  // Find the user by ID
  const user = await users.findById(userId).populate("bookmark");

  // Extract product IDs from the user's wishlist
  const wishlistRooms: any = user?.bookmark.map((book) => book);

  // Find orders for the user
  const userBooking = await bookings.find({ user: userId });

  // Extract product IDs from the user's orders
  const orderedProductIds = userBooking.map((book) => book.place);

  // Find products that other users have ordered and the user hasn't
  const recommendHotel = await rentals
    .find({
      _id: { $nin: wishlistRooms.concat(orderedProductIds) },
    })
    .limit(10); // Limit to the top 10 recommendations

  return recommendHotel;
};
