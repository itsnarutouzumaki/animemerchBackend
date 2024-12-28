import mongoose, { Schema } from "mongoose";

// Define the Address schema
const AddressSchema = new Schema({
  houseNumber: {
    type: String,
    required: [true, "House number is required."],
  },
  street: {
    type: String,
    required: [true, "Street is required."],
  },
  locality: {
    type: String,
    required: [true, "Locality is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required."],
    match: {
      validator: /^[1-9][0-9]{5}$/,
      message:
        "Postal code must be a 6-digit number starting with a non-zero digit.",
    },
  },
  country: {
    type: String,
    default: "India",
  },
  landmark: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required."],
    match: {
      validator: /^[0-9]{10}$/,
      message: "Phone number must be a 10-digit number.",
    },
  },
});

export const Address = mongoose.model("Address", AddressSchema);
