const mongoose = require("mongoose");

const agency_schema = mongoose.Schema(
  {
    agency_id: {
      type: String,
      require: true,
      unique:true,
      // index:true,
    },
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    phone_number: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("agency", agency_schema);
