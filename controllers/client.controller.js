const client_model = require("../models/client.model");
const { validationResult } = require("express-validator");

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    } else {
      const filter = { client_id: req.body.client_id };
      const update = {
        name: req.body.client_name,
        email: req.body.client_email,
        phone_number: req.body.client_phone_number,
        total_bill: req.body.total_bill,
      };

      const client = await client_model
        .findOneAndUpdate(filter, update, {
          new: true,
        })
        .then((data) => {
          res.send({
            status: true,
            data: data,
            message: "Client Details Updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: false,
            message: err.message,
          });
        });
    }
  } catch (e) {
    res.status(500).send({ status: false, message: e.message });
  }
};



exports.max_total_bill = async (req, res) => {
  try {
    client_model.aggregate([
      {$sort:{"total_bill": -1}},
      {$lookup:{from:"agencies",localField:"agency_id",foreignField:"agency_id",as:"agency_details"}},
      {$unwind : "$agency_details" },
      {$project:{
        client_name: "$name",
        total_bill_amount: "$total_bill",
        agency_name: "$agency_details.name",
      }}
    ]).then((data) => {
      res.send({
        status: true,
        data: data,
        message: "Top Client(s) Details Retrieved successfully",
      });
    });
  } catch (e) {
    res.status(500).send({ status: false, message: e.message });
  }
};
