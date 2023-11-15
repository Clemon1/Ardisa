import * as dotenv from "dotenv";
import { Request, Response } from "express";
import bookings from "../model/bookingModel";
import Stripe from "stripe";
import { uuid } from "uuidv4";
import users from "../model/usersModel";
dotenv.config();

const stripe = new Stripe(`${process.env.Stripe_TestKey}`);

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
    const { userId, place, price, checkIN, checkOUT, numOfGuest, email } =
      req.body;
    if (!userId || !place || !price || !checkIN || !checkOUT || !numOfGuest) {
      return res.status(401).json("Details must not be empty");
    }
    const setBooking = new bookings({
      userId,
      place,
      price,
      email,
      checkIN,
      checkOUT,
      numOfGuest,
    });
    const createBookingsResponse = await setBooking.save();

    res.status(200).json(createBookingsResponse);
  } catch (err: any) {
    console.log("Payment error: ", err.message);
    return res.status(500).json(err.message);
  }
};

// Payments
// const createPayment = async (req: Request, res: Response) => {
//   const { userId, place, price, checkIN, checkOUT, numOfGuest, email } =
//     req.body;
//   try {
//     const customer = await stripe.customers.create({
//       email: email,
//       source: userId,
//     });
//     // const customer: Stripe.Response<Stripe.Customer> =     await stripe.customers.create({
//     //     email: email,
//     //     source: req.body.id,
//     //   });
//     // const payment = await stripe.checkout.sessions.create({
//     //   mode: "payment",
//     //   payment_method_types: ["card"],
//     //   customer: customer.id,
//     //   line_items: [
//     //     {
//     //       price_data: {
//     //         currency: "gbp",
//     //         product_data: {
//     //           name: place,
//     //         },
//     //         unit_amount: price * 100,
//     //       },
//     //       quantity: 1,
//     //     },
//     //   ],
//     //   success_url: `${process.env.success_Url}`,
//     //   cancel_url: `${process.env.cancel_Url}`,
//     // });

//     // if (payment) {

//     //     if (payment.url) {
//     //       // Save the booking to the database and then redirect to Stripe Checkout
//     //       console.log(payment.url);

//     //       return res.redirect(303, payment.url);
//     //     } else {
//     //       console.error("Payment error: No session URL");
//     //       return res.status(500).json("Payment error: No session URL");
//     //     }
//     //   } catch (err: any) {
//     //     console.log("Booking error: ", err.message);
//     //     return res.status(500).json(err.message);
//     //   }
//     //}

//     // console.error("Payment error: No session URL");
//     // return res.status(500).json("Payment error: No session URL");
//   } catch (err: any) {
//     console.log(err.message);
//   }
// };
// Update & Cancel booking
export const cancelBookings = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
