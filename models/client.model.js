const mongoose = require("mongoose");

const client_schema = mongoose.Schema(
  {
    client_id: {
      type: String,
      require: true,
      unique: true,
      // index:true,
    },
    agency_id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    phone_number: {
      type: String,
      unique: true,
      require: true,
    },
    total_bill: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("client", client_schema);
