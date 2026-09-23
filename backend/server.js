const express = require("express");
const { registerUser, loginUser } = require("./controller/userController.js");
const connectDB = require("./connnectDB.js");
const protect = require("./middleware/protect.js");
const authorize = require("./middleware/authorize.js");
let cors = require("cors");

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.get("/manager", protect, authorize("manager", "admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome to Manager Dashboard",
    user: req.user,
  });
});
app.get(
  "/dashboard",
  protect,
  authorize("user", "manager", "admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to User Dashboard",
      user: req.user,
    });
  },
);
app.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
});
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

app.listen(5000, () => {
  console.log("server is running ");
  connectDB();
});
