"use strict";
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
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
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
        const { userId, place, price, checkIN, checkOUT, numOfGuest } = req.body;
        if (!userId || !place || !price || !checkIN || !checkOUT || !numOfGuest) {
            return res.status(401).json("Details must not be empty");
        }
        const setBooking = new bookingModel_1.default({
            userId,
            place,
            price,
            checkIN,
            checkOUT,
            numOfGuest,
        });
        const createBookingsResponse = yield setBooking.save();
        res.status(200).json(createBookingsResponse);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.createBookings = createBookings;
// Update & Cancel booking
const cancelBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.cancelBookings = cancelBookings;
