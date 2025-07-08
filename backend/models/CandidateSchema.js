import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    position:{type: String},
    phone: { type: String },
    skills: [String],
    experience:{
      type: String
    },
    resume: String,
    status: {
      type: String,
      enum: ["pending", "selected", "new"],
      default: "pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
