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
exports.recommendedHotels = void 0;
const usersModel_1 = __importDefault(require("../model/usersModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const rentalModel_1 = __importDefault(require("../model/rentalModel"));
// Function to recommend products for a user
const recommendedHotels = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by ID
    const user = yield usersModel_1.default.findById(userId).populate("bookmark");
    // Extract product IDs from the user's wishlist
    const wishlistRooms = user === null || user === void 0 ? void 0 : user.bookmark.map((book) => book);
    // Find orders for the user
    const userBooking = yield bookingModel_1.default.find({ user: userId });
    // Extract product IDs from the user's orders
    const orderedProductIds = userBooking.map((book) => book.place);
    // Find products that other users have ordered and the user hasn't
    const recommendHotel = yield rentalModel_1.default
        .find({
        _id: { $nin: wishlistRooms.concat(orderedProductIds) },
    })
        .limit(10); // Limit to the top 10 recommendations
    return recommendHotel;
});
exports.recommendedHotels = recommendedHotels;
