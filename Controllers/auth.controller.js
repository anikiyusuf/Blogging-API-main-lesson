const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Blogs = require("../models/blog.model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// render Sign up page [GET]
async function renderSignUp(req, res, next) {
  try {
    res.render("blogs/register", { error: undefined });
  } catch (error) {
    next(error);
  }
}

// render Log in page [GET]
async function renderLogIn(req, res, next) {
  try {
    res.render("blogs/enter", { error: undefined });
  } catch (error) {
    next(error);
  }
}

// sign up and route to login page [POST]
async function signUp(req, res, next) {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      throw new Error("Ensure you fill all the inputs correctly");
    }
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    // const payload = { user: { id: user._id, email: user.email } };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRY_TIME,
    // });

    // await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    res.render("blogs/register", {
      error: error,
    });
    next(error);
  }
}

// login and route to my blogs page [POST]
async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email and password required");
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    //

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) throw new Error("password is incorrect !");

    //
    delete user.password;

    const payload = { user: { id: user._id, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true });

    const blogs = await Blogs.find({
      userId: user.id,
      state: "published",
    }).sort({
      createdAt: "desc",
    });

    res.render("blogs/index", { user: user, blogs: blogs, error: undefined });
  } catch (error) {
    res.render("blogs/enter", {
      error: error,
    });
    next(error);
  }
}

async function logOut(req, res, next) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });

    res.render("blogs/enter", { error: undefined });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  renderSignUp,
  renderLogIn,
  signUp,
  logIn,
  logOut,
};
