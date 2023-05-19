const { check } = require("express-validator");
const agency_model = require("../../models/agency.model");
const client_model = require("../../models/client.model");

exports.create = [
    
    //agency
    check("agency_id", "agency_id is required").not().isEmpty()
    .custom(async (value) => {
        const isExists = await agency_model.find({ agency_id: value });
        if (isExists.length > 0) {
          throw new Error('agency_id already exists');
        }
      }),
    check("agency_name", "agency_name is required").not().isEmpty(),
    check("agency_address1", "agency_address1 is required").not().isEmpty(),
    check("agency_phone_number", "agency_phone_number is required").optional({ checkFalsy: true }).not().isEmpty().isLength({min:10,max:10}).withMessage('agency_phone_number Length must be 10 digits.')
    .custom(async (value) => {
        const isExists = await agency_model.find({ phone_number: value });
        if (isExists.length > 0) {
          throw new Error('agency_phone_number already exists');
        }
      }),

    //client
    check("client_id", "client_id is required").not().isEmpty()
    .custom(async (value) => {
        const isExists = await client_model.find({ client_id: value });
        if (isExists.length > 0) {
          throw new Error('client_id already exists');
        }
      }),
    check("client_name", "client_name is required").not().isEmpty(),
    check("client_email", "client_email is required").not().isEmpty().isEmail().withMessage('enter valid client_email')
    .custom(async (value) => {
        const isExists = await client_model.find({ email: value });
        if (isExists.length > 0) {
            throw new Error('client_email already exists');
        }
    }),
    check("client_phone_number", "client_phone_number is required").not().isEmpty().isLength({min:10,max:10}).withMessage('client_phone_number Length must be 10 digits.')
    .custom(async (value) => {
        const isExists = await client_model.find({ phone_number: value });
        if (isExists.length > 0) {
          throw new Error('client_phone_number already exists');
        }
      }),
      check("total_bill", "total_bill is required").not().isEmpty().isDecimal().withMessage('total_bill must have a value'),
];
