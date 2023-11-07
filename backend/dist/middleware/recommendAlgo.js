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
exports.getCollaborativeFilteringRecommendations = void 0;
const rentalModel_1 = __importDefault(require("../model/rentalModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
// Function to get collaborative filtering recommendations for a user
function getCollaborativeFilteringRecommendations(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the bookings made by the user
            const userBookings = yield bookingModel_1.default.find({ userId }).exec();
            // Extract the rental IDs from the user's bookings
            const rentalIds = userBookings.map((booking) => booking.place);
            // Find rentals booked by users who booked the same rentals
            const similarUserBookings = yield bookingModel_1.default
                .find({
                place: { $in: rentalIds },
                userId: { $ne: userId }, // Exclude the current user
            })
                .exec();
            // Extract rental IDs from bookings of similar users
            const similarRentalIds = similarUserBookings.map((booking) => booking.place);
            // Find rentals that were booked by similar users but not by the current user
            const recommendations = yield rentalModel_1.default
                .find({
                _id: { $in: similarRentalIds, $nin: rentalIds }, // Exclude rentals booked by the current user
                // Include rentals booked by similar users
            })
                .limit(5) // Limit the number of recommendations
                .exec();
            return recommendations;
        }
        catch (error) {
            console.error(error.message);
        }
    });
}
exports.getCollaborativeFilteringRecommendations = getCollaborativeFilteringRecommendations;
// Example usage: Get collaborative filtering recommendations for a specific user
// const userIdToRecommendFor = "your-user-id";
// getCollaborativeFilteringRecommendations(userIdToRecommendFor)
//   .then((recommendations) => {
//     console.log("Collaborative Filtering Recommendations:", recommendations);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
