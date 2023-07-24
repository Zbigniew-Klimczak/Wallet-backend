const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Name is required"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", user);

module.exports = User;
