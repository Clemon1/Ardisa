"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookings = exports.createBookings = exports.viewSingleBooking = exports.viewUserBookings = exports.viewAllBookings = void 0;
const dotenv = __importStar(require("dotenv"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const stripe_1 = __importDefault(require("stripe"));
dotenv.config();
const stripe = new stripe_1.default(`${process.env.Stripe_TestKey}`);
// View all bookings
const viewAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield bookingModel_1.default.find();
        res.status(200).json(allBookings);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewAllBookings = viewAllBookings;
//View user bookings
const viewUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const userBookings = yield bookingModel_1.default
            .find({ userId })
            .populate("place")
            .exec();
        res.status(200).json(userBookings);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewUserBookings = viewUserBookings;
// View single Booking
const viewSingleBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleBooking = yield bookingModel_1.default.findById(id);
        res.status(200).json(singleBooking);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewSingleBooking = viewSingleBooking;
// Create a new Booking
const createBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, place, price, checkIN, checkOUT, numOfGuest, email } = req.body;
        if (!userId || !place || !price || !checkIN || !checkOUT || !numOfGuest) {
            return res.status(401).json("Details must not be empty");
        }
        const setBooking = new bookingModel_1.default({
            userId,
            place,
            price,
            email,
            checkIN,
            checkOUT,
            numOfGuest,
        });
        const createBookingsResponse = yield setBooking.save();
        res.status(200).json(createBookingsResponse);
    }
    catch (err) {
        console.log("Payment error: ", err.message);
        return res.status(500).json(err.message);
    }
});
exports.createBookings = createBookings;
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
const cancelBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.cancelBookings = cancelBookings;
