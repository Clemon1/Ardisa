"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Defining database schema
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    phoneNumber: String,
    avartar: String,
    bookmark: [],
    role: {
        type: String,
        enum: ["admin", "hostelOwner", "user"],
        default: "user",
    },
}, {
    timestamps: true,
});
const users = (0, mongoose_1.model)("users", userSchema);
exports.default = users;
