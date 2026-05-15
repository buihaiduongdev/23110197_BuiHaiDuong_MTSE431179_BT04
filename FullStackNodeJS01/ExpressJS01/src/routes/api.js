const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  handleForgotPassword,
} = require("../controllers/userController");
const { getProducts } = require("../controllers/productController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => res.status.json("Hello word api"));
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", auth, getUser);
routerAPI.get("/account", delay, auth, getAccount);
routerAPI.get("/products", getProducts);
routerAPI.post("/forgot-password", handleForgotPassword);

module.exports = routerAPI;
