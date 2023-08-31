const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const url = "mongodb://127.0.0.1:27017/authen";
const jwtSecretKey = "dc7fea60";

function verifyToken(req) {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, jwtSecretKey);

    return true;
  } catch (e) {
    return false;
  }
}

app
  .use(express.json())
  .use(express.urlencoded())
  .use(cors())
  .use(function (req, res, next) {
    if (req.url === "/login" || req.url === "/signup") return next();
    if (verifyToken(req)) return next();
    else res.status(401).json({});
  })
  .get("/verify-token", (req, res) => res.status(200).end())
  .post("/login", (req, res) => {
    try {
      mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: false })
        .then(async () => {
          const { username, password } = req.body;

          const userSchema = mongoose.model(
            "users",
            new mongoose.Schema({
              username: { type: String },
              email: { type: String },
              password: { type: String, select: false },
            })
          );

          const user = await userSchema.findOne({ username, password });

          const token = jwt.sign(
            { username: user.username, email: user.email },
            jwtSecretKey,
            { expiresIn: "1h" }
          );

          res.status(200).json({ success: true, token });
        })
        .catch((e) => {
          throw e;
        });
    } catch (e) {
      res.send(500);
    }
  })
  .get("/products", (req, res) => {
    res.status(200).json([
      {
        name: "PEPSI",
        price: 20,
      },
      {
        name: "Bacon",
        price: 160,
      },
      {
        name: "Salmon",
        price: 200,
      },
    ]);
  })
  .listen(5000, () => console.log("> App on port 5000."));
