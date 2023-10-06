import { Request, Response } from "express";
import rentals from "../model/rentalModel";
import users from "../model/usersModel";
// View all rental homes

export const viewHome = async (req: Request, res: Response) => {
  try {
    const findHome = await rentals.find();
    const newRentals = findHome.map((home) => {
      const averageRatingLenght: any = home.ratings?.length;
      let averageRating: number = 0;

      if (averageRating > 0) {
        const totalRating: any = home.ratings?.reduce(
          (acc, rating) => acc + rating,
          0,
        );
        averageRating = totalRating / averageRatingLenght;

        return {
          ...home,
          ratings: averageRating,
        };
      }
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

    res.status(200).json({ ...singleHome, rating: averageRating });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Recommendation Algorithm for users based on saved Previous bookings and Bookmarked homes
export const viewSuggestHome = async (req: Request, res: Response) => {};
//Search and Filter Rental Home
export const viewSearchFilter = async (req: Request, res: Response) => {};

// Create rental home
export const createRentalHomes = async (req: Request, res: Response) => {
  try {
    const rntHome = new rentals(req.body);
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

// Update existing rental home
export const updateRentalHomes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateHome = await rentals.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateHome);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Delete existing rental home
export const deleteRentalHomes = async (req: Request, res: Response) => {};
