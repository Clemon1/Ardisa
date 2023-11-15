import { Schema, Types, model } from "mongoose";

interface IbookingService {
  userId: Types.ObjectId;
  place: Types.ObjectId;
  price: number;
  email: string;
  checkIN: Date;
  checkOUT: Date;
  numOfGuest: number;
  status: string;
}

const bookingSchema = new Schema<IbookingService>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "rentals",
      required: true,
    },
    email: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

const bookings = model("bookings", bookingSchema);
export default bookings;
