const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.options("*", cors());
app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 3600 * 1000,
  message: "Too many requests from this IP. Please try again in an hour",
});

app.use("/api", limiter);

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5173",
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", "data:", "blob:"],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", "https:", "data:"],
//       scriptSrc: [
//         "'self'",
//         "https://*.cloudflare.com",
//         "http://localhost:5173/",
//       ],
//       frameSrc: ["'self'", "http://localhost:5173/"],
//       objectSrc: ["'none'"],
//       styleSrc: ["'self'", "https:", "'unsafe-inline'"],
//       workerSrc: ["'self'", "data:", "blob:"],
//       childSrc: ["'self'", "blob:"],
//       imgSrc: ["'self'", "data:", "blob:"],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// app.use(compression());
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Handling undefined API Routes
app.all("*", function (req, res, next) {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `Can't find the endpoint ${req.originalUrl} on API`
  // });
  next(new AppError(`Can't find the endpoint ${req.originalUrl} on API`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
