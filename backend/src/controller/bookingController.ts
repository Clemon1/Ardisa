import { Request, Response } from "express";
import bookings from "../model/bookingModel";
import users from "../model/usersModel";

// View all bookings

export const viewAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await bookings.find();
    res.status(200).json(allBookings);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//View user bookings
export const viewUserBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const userBookings = await bookings
      .find({ userId })
      .populate("place")
      .exec();
    res.status(200).json(userBookings);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// View single Booking
export const viewSingleBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleBooking = await bookings.findById(id);
    res.status(200).json(singleBooking);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Create a new Booking
export const createBookings = async (req: Request, res: Response) => {
  try {
    const { userId, place, price, checkIN, checkOUT, numOfGuest } = req.body;
    if (!userId || !place || !price || !checkIN || !checkOUT || !numOfGuest) {
      return res.status(401).json("Details must not be empty");
    }
    const setBooking = new bookings({
      userId,
      place,
      price,
      checkIN,
      checkOUT,
      numOfGuest,
    });
    const createBookingsResponse = await setBooking.save();
    res.status(200).json(createBookingsResponse);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Update & Cancel booking
export const cancelBookings = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
