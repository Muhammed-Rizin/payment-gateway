import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    _id: { type: String, required: true },
    value: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Counter = model("counter", schema);

export default Counter;
