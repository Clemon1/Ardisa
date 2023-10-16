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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const bookingController_1 = require("../controller/bookingController");
const recommendation_1 = require("../controller/recommendation");
router.get("/viewBooking", bookingController_1.viewAllBookings);
router.get("/viewBooking/user", bookingController_1.viewUserBookings);
router.get("/user-booking-recommendations/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const numRecommendations = 5;
    try {
        const recommendations = yield (0, recommendation_1.calculateUserBookingRecommendations)(userId, numRecommendations);
        res.json(recommendations);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error fetching user booking recommendations" });
    }
}));
router.get("/viewAll/:id", bookingController_1.viewSingleBooking);
router.post("/createBooking", bookingController_1.createBookings);
exports.default = router;
