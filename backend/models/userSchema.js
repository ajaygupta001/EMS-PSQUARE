import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      isEmail: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should be at least 8 chars",
      },
    },
    role: { type: String, enum: ["admin", "hr", "employee"], default: "hr" },
    sessionExpiresAt: { type: Date },
   
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
