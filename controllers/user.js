import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// Create  a new user and save it to the database and also save in cookie
const newUser = async (req, res) => {
  const { name, username, password } = req.body;

  console.log(req.body);

  const avatar = {
    public_id: "jdjsfjdnjdjks",
    url: "sjdfjsf",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created");
};

// Login User
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  console.log("Username:", username, "Password:", password);

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(isPasswordMatch);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome Back ${user.username}`);
});

// Get profile
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

// logout
const logout = TryCatch(async (req, res) => {
  res
    .status(200)
    .cookie("Access-Token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

// Search User
const searchUser = TryCatch(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

export { newUser, login, getMyProfile, logout, searchUser };
