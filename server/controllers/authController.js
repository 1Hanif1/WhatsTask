const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Data = require("../models/Data");
const catchAsyncError = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    userPhoto: req.body.userPhoto,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid credentials", 401));
  }
  // Load User Dashboard Data
  let userData = await Data.findOne({ uId: user._id });
  if (!userData)
    userData = await Data.create({
      uId: user._id,
    });
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.protect = catchAsyncError(async (req, res, next) => {
  // Checking if token is sent or not
  let userToken = req.headers.authorization;
  if (!userToken || !userToken.startsWith("Bearer"))
    throw new AppError("Please get a bearer token to get access", 401);

  userToken = userToken.split(" ")[1];
  // Verifying the token
  // const verifyFunction = promisify(jwt.verify);
  const payload = await promisify(jwt.verify)(
    userToken,
    process.env.JWT_SECRET
  );
  ////// console.log('Payload: ', payload);
  // Check if user still exists
  const user = await User.findById(payload.id).select("+password");

  ////// console.log('USERRRRRRRR: ', user);
  // if (!user)
  //   throw new AppError("The user with this token no longer exists", 401);
  // // check if user changed passwords after the jwt token was issued
  // if (user.changedPassword(payload.iat))
  //   throw new AppError("Password was changed. Please log in again", 401);

  // Grant access to the next protected route
  req.user = user;
  next();
});
