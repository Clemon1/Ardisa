import { Request, Response } from "express";
import { Types } from "mongoose";
import rentals from "../model/rentalModel";
import users from "../model/usersModel";
import bookings from "../model/bookingModel";
import { getCollaborativeFilteringRecommendations } from "../middleware/recommendAlgo";
import cloudinary from "../middleware/cloudinary";
// View all rental homes
interface view {
  _doc: object;
}
// View all rooms
export const viewHome = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let findHome;
    search === ""
      ? (findHome = await rentals.find())
      : (findHome = await rentals.find({
          $or: [
            { address: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
            {
              checkIN: { $regex: search, $options: "i" },
            },
            { checkOut: { $regex: search, $options: "i" } },
          ],
        }));
    const newRentals = findHome.map((home) => {
      const averageRatingLenght: any = home.ratings?.length;
      let averageRating: number = 0;

      if (averageRating > 0) {
        const totalRating: any = home.ratings?.reduce(
          (acc, rating) => acc + rating,
          0,
        );
        averageRating = totalRating / averageRatingLenght;
      }
      return {
        _id: home._id,
        title: home.title,
        description: home.description,
        address: home.address,
        ratings: averageRating,
        photos: home.photos,
        perks: home.perks,
        price: home.price,
        maxGuest: home.maxGuest,
      };
    });
    res.status(200).json(newRentals);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// View Single Rental homes
export const viewSingleHome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleHome = await rentals.findById(id);
    let averageRating: number = 0;

    const totalLenght: any = singleHome?.ratings?.length;
    if (averageRating > 0) {
      const totalRatings: any = singleHome?.ratings?.reduce(
        (acc, rating) => acc + rating,
        0,
      );
      averageRating = totalRatings / totalLenght;
    }

    res.status(200).json({ singleHome, rating: averageRating });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Recommendation Algorithm for users based on saved Previous bookings and Bookmarked homes
export const viewSuggestHome = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const recommend = getCollaborativeFilteringRecommendations(userId);
    res.status(200).json(recommend);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Create rental home
export const createRentalHomes = async (req: Request, res: Response) => {
  try {
    const { title, description, address, perks, price, maxGuest } = req.body;
    const photo: any = req.file?.path;
    const cloudUpload = await cloudinary.uploader.upload(photo);
    const rntHome = new rentals({
      title,
      description,
      address,
      photos: cloudUpload.url,
      perks,
      price,
      maxGuest,
    });

    const newHome = await rntHome.save();
    res.status(200).json(newHome);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Bookmark rental home
export const bookmarkRentalHomes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productId } = req.params;
    const activeUser = await users.findById(id);
    // checking id user exist
    if (!activeUser) {
      return res.status(404).json("Please login to add to wishlist");
    }
    // checking if room exists in the bookmark
    const singleHome = await rentals.findById(productId);
    if (!singleHome) {
      return res.status(404).json("No room found");
    }
    // checking if room already exist in wishlist
    if (activeUser?.bookmark.includes(singleHome?.id)) {
      await users.findByIdAndUpdate(
        id,
        { $pull: { bookmark: productId } },
        { new: true },
      );
      res.status(400).json("Room removed from wishlist");
    } else {
      await users.findByIdAndUpdate(
        id,
        { $push: { bookmark: productId } },
        { new: true },
      );
      res.status(400).json("Room added to wishlist");
    }
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Room Recommendation
// export const roomRecommendation = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     // Retrieve the user's bookmarked rooms and bookings
//     const user = await users.findById(userId).populate("bookmark").exec();

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const bookmarkedRoomIds = user.bookmark.map((room: any) =>
//       room._id.toString(),
//     );

//     // Retrieve the user's booked rooms
//     const userBookings = await bookings.find({ userId });
//     const bookedRoomIds = userBookings.map((booking: any) =>
//       booking.place.toString(),
//     );

//     // Filter out the rentals that are in the bookmark but not booked
//     const recommendations = bookmarkedRoomIds.filter(
//       (roomId: string) => !bookedRoomIds.includes(roomId),
//     );

//     if (recommendations.length === 0) {
//       return res.json({ message: "No recommendations available" });
//     }

//     // Retrieve rental details for the recommended rooms
//     const recommendedRoomDetails = await rentals.find({
//       _id: { $in: recommendations },
//     });

//     // Process and format the rental details as needed
//     const refreshedProducts = recommendedRoomDetails.map((newProduct: any) => {
//       const ratingLength = newProduct.ratings.length;
//       let averageRating = 0;
//       if (ratingLength > 0) {
//         const totalRating = newProduct.ratings.reduce(
//           (rating: any, total: any) => rating + total,
//           0,
//         );
//         averageRating = totalRating / ratingLength;
//       }
//       return {
//         _id: newProduct._id,
//         title: newProduct.title,
//         description: newProduct.description,
//         address: newProduct.address,
//         ratings: averageRating,
//         photos: newProduct.photos,
//         perks: newProduct.perks,
//         price: newProduct.price,
//         maxGuest: newProduct.maxGuest,
//       };
//     });

//     res.status(200).json(refreshedProducts);
//   } catch (err: any) {
//     res.status(500).json(err.message);
//   }
// };
export const roomRecommendation = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Retrieve the user's bookings
    const userBookings = await bookings.find({ userId });

    // Extract property IDs from the user's bookings
    const userPropertyIds = userBookings.map((booking) => booking.place);

    // Find users who have booked similar properties
    const similarUsers = await bookings
      .find({ place: { $in: userPropertyIds }, userId: { $ne: userId } })
      .distinct("userId");

    // Extract property IDs from similar users' bookings
    const similarUserPropertyIds = await bookings
      .find({ userId: { $in: similarUsers } })
      .distinct("place");

    // Get rental recommendations based on what similar users are booking
    const recommendations = await rentals.aggregate([
      {
        $match: {
          _id: { $nin: [...userPropertyIds, ...similarUserPropertyIds] },
        },
      }, // Exclude already booked properties
      { $sample: { size: 2 } }, // Select 5 random rentals
    ]);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      error: "Error generating collaborative filtering recommendations",
    });
  }
};

// Update existing rental home
// export const updateRentalHomes = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, description, address, perks, price, maxGuest } = req.body;
//     const photo: any = req.file?.path;
//     // const cloudUpload = await cloudinary.upload(photo);

//     const hotel = {
//       title,
//       description,
//       address,
//       perks,
//       price,
//       maxGuest,
//     };
//     // if (req.file?.path) {
//     //   hotel.photos : photo.,
//     // }
//     const updateHome = await rentals.findByIdAndUpdate(
//       id,
//       { $set: hotel },
//       { new: true },
//     );
//     res.status(200).json(updateHome);
//   } catch (err: any) {
//     res.status(500).json(err.message);
//   }
// };
