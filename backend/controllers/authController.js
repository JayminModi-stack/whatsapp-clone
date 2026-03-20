const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { SECRET_KEY } = require("../config/jwt");

exports.register = (req, res) => {
  const { name, mobile, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  userModel.createUser(name, mobile, hash, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User registered" });
  });
};

exports.login = (req, res) => {
  const { mobile, password } = req.body;
  userModel.findByMobile(mobile, (err, result) => {
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });
    const valid = bcrypt.compareSync(password, result[0].password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign(
      { id: result[0].id, mobile: result[0].mobile },
      SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.json({ ...result[0], token });
  });
};

exports.users = (req, res) => {
  const currentUserId = req.user.id;
  userModel.getUsersWithLastMessage(currentUserId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
