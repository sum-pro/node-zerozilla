const mongoose = require("mongoose");

const user_schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    tokens: [{ type: Object }],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", user_schema);
