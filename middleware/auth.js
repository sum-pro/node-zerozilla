const jwt = require("jsonwebtoken");
const user_model = require("../models/user.model");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await user_model.findById(decode.id);

      if (!user) {
        return res.json({ status: false, message: "unauthorized access!" });
      }
      req.user = user;
      next();
    } catch (error) {

      if (error.name === "JsonWebTokenError") {
        return res.json({ status: false, message: "unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          status: false,
          message: "session expired try sign in!",
        });
      }

      res.res.json({ status: false, message: "Internal server error!" });
    }
  } else {
    res.json({ status: false, message: "unauthorized access!" });
  }
};
