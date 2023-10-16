"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    place: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "rentals",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    checkIN: {
        type: Date,
        required: true,
    },
    checkOUT: {
        type: Date,
        required: true,
    },
    numOfGuest: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled"],
        default: "active",
    },
}, {
    timestamps: true,
});
const bookings = (0, mongoose_1.model)("bookings", bookingSchema);
exports.default = bookings;
