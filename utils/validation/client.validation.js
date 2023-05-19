const { check } = require("express-validator");
const client_model = require("../../models/client.model");

exports.update = [
    check("client_id", "client_id is required").not().isEmpty()
    .custom(async (value) => {
        const isExists = await client_model.find({ client_id: value });
        if (isExists.length === 0) {
          throw new Error('client_id not found');
        }
      }),
    check("client_name", "client_name is required").not().isEmpty(),
    check("client_email", "client_email is required").not().isEmpty().isEmail().withMessage('enter valid client_email'),
    check("client_phone_number", "client_phone_number is required").not().isEmpty().isLength({min:10,max:10}).withMessage('client_phone_number Length must be 10 digits.'),
    check("total_bill", "total_bill is required").not().isEmpty().isDecimal().withMessage('total_bill must have a value'),
];
