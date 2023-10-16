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
exports.calculateUserBookingRecommendations = exports.getRecommendations = void 0;
const rentalModel_1 = __importDefault(require("../model/rentalModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const calculateFeatureScore = (feature, userPreference) => feature.toLowerCase().includes(userPreference.toLowerCase()) ? 1 : 0;
// Define a function to calculate the perks score
const calculatePerksScore = (rentalPerks, userPerks) => {
    const commonPerks = rentalPerks.filter((perk) => userPerks.includes(perk));
    return commonPerks.length / userPerks.length;
};
// Define a function to calculate the price score
const calculatePriceScore = (rentalPrice, userPrice) => {
    const maxPriceDifference = 1000; // Adjust this based on your use case
    const priceDifference = Math.abs(rentalPrice - userPrice);
    return 1 - Math.min(1, priceDifference / maxPriceDifference);
};
// Define a function to calculate the recommendation score
const calculateRecommendationScore = (rental, userPreferences) => {
    const weights = {
        title: 0.2,
        description: 0.3,
        perks: 0.2,
        price: 0.3,
    };
    const score = Object.keys(weights).reduce((total, feature) => {
        if (rental[feature] && userPreferences[feature]) {
            return (total +
                weights[feature] *
                    calculateFeatureScore(rental[feature], userPreferences[feature]));
        }
        return total;
    }, 0);
    return score;
};
// Define a function to get recommendations
const getRecommendations = (userId, numRecommendations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableRentals = yield rentalModel_1.default.find({ isDeleted: false });
        // Fetch user preferences based on userId from your user model
        const userPreferences = {}; // Retrieve user preferences here
        const recommendations = availableRentals.map((rental) => {
            const score = calculateRecommendationScore(rental, userPreferences);
            return { rental, score };
        });
        recommendations.sort((a, b) => b.score - a.score);
        return recommendations
            .slice(0, numRecommendations)
            .map((rec) => rec.rental);
    }
    catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
});
exports.getRecommendations = getRecommendations;
// Define a function to calculate user booking recommendations
const calculateUserBookingRecommendations = (userId, numRecommendations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch user's bookings
        const userBookings = yield bookingModel_1.default.find({ userId });
        // Extract place IDs from the user's bookings
        const placeIds = userBookings.map((booking) => booking.place);
        // Fetch recommendations based on the places booked by the user
        const recommendations = yield rentalModel_1.default.find({
            isDeleted: false,
            _id: { $nin: placeIds }, // Exclude places already booked by the user
        });
        return recommendations.slice(0, numRecommendations);
    }
    catch (error) {
        console.error("Error fetching user booking recommendations:", error);
        throw error;
    }
});
exports.calculateUserBookingRecommendations = calculateUserBookingRecommendations;
// Create a new endpoint for user booking recommendations
// ... Keep the previous endpoints and listeners ...
// ...
