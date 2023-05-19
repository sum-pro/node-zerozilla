const agency_model = require("../models/agency.model");
const client_model = require("../models/client.model");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    } else {
      const agent = new agency_model({
        agency_id: req.body.agency_id,
        name: req.body.agency_name,
        address1: req.body.agency_address1,
        address2: req.body.agency_address2,
        state: req.body.agency_state,
        city: req.body.agency_city,
        phone_number: req.body.agency_phone_number,
      });
      agent
        .save()
        .then(async (data) => {
          const client = new client_model({
            client_id: req.body.client_id,
            agency_id: data.agency_id,
            name: req.body.client_name,
            email: req.body.client_email,
            phone_number: req.body.client_phone_number,
            total_bill: req.body.total_bill,
          });

          client
            .save()
            .then(async (data) => {
              res.send({
                status: true,
                message: "Agent and Client Added successfully",
              });
            })
            .catch((err) => {
              res.status(500).send({
                status: false,
                message: err.message,
              });
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
    res
      .status(500)
      .send({ status: false, message: e.message});
  }
};
