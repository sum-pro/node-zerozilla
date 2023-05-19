const user_model = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    } else {
      const { name, email, password } = req.body;
      const user = new user_model({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      user
        .save()
        .then((data) => {
          res.send({
            status: true,
            user: data,
            message: "User Added successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  } catch (e) {
    res.status(500).send({ status: false, message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    } else {
      const user = await user_model.find({ email: req.body.email });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const verified = bcrypt.compareSync(req.body.password, user[0].password);

      if (!verified) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      let oldTokens = user.tokens || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }

      user_model.findByIdAndUpdate(user.id, {
        tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });

      res.status(200).send({
        status: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: "Logged in successfully",
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

exports.logout = async (req, res) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ status: false, message: "Authorization fail!" });
      }

      const tokens = req.user.tokens;

      const newTokens = tokens.filter((t) => t.token !== token);

      await user_model.findByIdAndUpdate(req.user.id, { tokens: newTokens });
      res.json({ status: true, message: "Sign out successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};
