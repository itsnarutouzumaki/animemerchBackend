import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      match: {
        validator: /^[0-9]{10}$/,
        message: "Phone number must be a 10-digit number.",
      },
    },
    gender: { 
      type: String,
      required: [true, "Gender is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    addresses: [{
      type: Schema.Types.ObjectId,
      ref: "Address"
    }],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    avatar: {
      type: String, 
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart"
    },
    accessToken: {
      type: String,
      default: null, 
    },
    refreshToken: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

User Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User Schema.methods.generateAndStoreTokens = async function () {
  const accessToken = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });

  const refreshToken = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION, 
  });

  this.accessToken = accessToken;
  this.refreshToken = refreshToken;

  await this.save();

  return { accessToken, refreshToken };
};


export const User = mongoose.model("User ", UserSchema);