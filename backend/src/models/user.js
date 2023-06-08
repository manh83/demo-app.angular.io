import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    role: {
      type: String,
      default: "member",
    },
    carts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
