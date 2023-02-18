const Data = require("../models/Data");

exports.getUserData = async function (req, res, next) {
  const userData = await Data.find({ uId: req.user._id });
  res.json({
    status: "Success",
    data: userData,
  });
  next();
};
