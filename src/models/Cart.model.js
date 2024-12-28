import mongoose, { Schema } from "mongoose";

// Define the Cart schema
const CartSchema = new Schema({
  Items: [
    {
      Item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Export the Cart model
export const Cart = mongoose.model("Cart", CartSchema);