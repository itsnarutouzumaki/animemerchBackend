import mongoose, { Schema } from "mongoose";

// Define the seller schema
const sellerSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Address is required"],
    },
    Inventory: [{
      type: Schema.Types.ObjectId,
      ref: "Item",
    }],
    GSTIN: {
      type: String,
      required: [true, "GSTIN is required"],
      unique: [true, "GSTIN must be unique"],
    },
    Orders: [{
      type: Schema.Types.ObjectId,
      ref: "Order",
    }]
  },
  { timestamps: true }
);

// Export the Seller model
export const Seller = mongoose.model("Seller", sellerSchema);