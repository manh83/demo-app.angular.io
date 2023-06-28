import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
