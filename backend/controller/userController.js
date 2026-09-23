const bcrypt = require("bcrypt"); // npm install bcrypt
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken
const UserModel = require("../models/userModel");

const registerUser = async (req, res) => {
  let { name, email, password, confirmPassword, role } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim().toLowerCase();

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logoutUser = async () => {};

module.exports = { registerUser, loginUser, logoutUser };
