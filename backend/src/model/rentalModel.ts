import { Schema, model, Types } from "mongoose";

interface IRentalService {
  owner: Types.ObjectId;
  title: string;
  description: string;
  address: string;
  ratings?: Array<number>;
  photos?: Array<string>;
  perks: Array<string>;
  price: number;
  bookedDates: [];
  maxGuest: number;
  isDeleted: boolean;
}

const rentalSchema = new Schema<IRentalService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    perks: [
      {
        type: String,
        required: true,
      },
    ],
    ratings: [
      {
        type: Number,
        default: 0,
        Max: 5,
      },
    ],
    photos: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    maxGuest: {
      type: Number,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const rentals = model<IRentalService>("rentals", rentalSchema);
export default rentals;
