const express = require("express"); //*
const passport = require("passport"); //*
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const logger = require("./logger/logger");
const Blogs = require("./models/blog.model");
const methodOverride = require("method-override");
const User = require("./models/user.model");
const cookieParser = require("cookie-parser");

const app = express(); //*

// viewes
app.set("view engine", "ejs");

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.urlencoded({ extended: false })); //so we can access params from a form inside our route
app.use(passport.initialize()); //*
// require("./middlewares/passport"); //*
app.use(express.json()); //*
app.use(limiter);
app.use(helmet());
app.use(methodOverride("_method"));
app.use(cookieParser());
require("dotenv").config();

const blogsRouter = require("./routes/blogs.route"); //*
const authRouter = require("./routes/auth.route"); //*
const { requireAuth } = require("./middlewares/authMiddleware");

// Routes:
app.use("/auth", authRouter); //*
app.use("/blogs", requireAuth, blogsRouter); //*

app.get("/", async (req, res) => {
  //   res.status(200).send("Welcome to the Tech Blog");
  res.render("blogs/enter", { user: new User(), error: undefined });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // return res.status(statusCode).json({ status: "Error !", message });
  res.render("blogs/error", { error: message });
}); //*

module.exports = app; //*
