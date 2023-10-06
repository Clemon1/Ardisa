import { Schema, model } from "mongoose";

interface IUser {
  fullname: string;
  avartar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isDeleted: boolean;
  bookmark: Array<string | number>;
  role: string;
}

// Defining database schema
const userSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  },
);

const users = model<IUser>("users", userSchema);

export default users;
