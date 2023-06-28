import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status:{
      type : String,
      default: "Chờ sử lý",
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
