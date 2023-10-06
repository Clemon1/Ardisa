import { Schema, Types, model } from "mongoose";

interface IbookingService {
  userId: Types.ObjectId;
  place: Types.ObjectId;
  price: number;
  checkIN: Date;
  checkOUT: Date;
  numberOfGuest: number;
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
  },
  {
    timestamps: true,
  },
);

const bookings = model("bookings", bookingSchema);
export default bookings;
