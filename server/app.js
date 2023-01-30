const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const AppError = require("./utils/appError");
const authRoute = require("./routes/authRouter");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      scriptSrc: [
        "'self'",
        "https://*.cloudflare.com",
        "http://localhost:5173/",
      ],
      frameSrc: ["'self'", "http://localhost:5173/"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      workerSrc: ["'self'", "data:", "blob:"],
      childSrc: ["'self'", "blob:"],
      imgSrc: ["'self'", "data:", "blob:"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(compression());

app.use("/", authRoute);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
