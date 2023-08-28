const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const url = "mongodb://127.0.0.1:27017/authen";
const jwtSecretKey = "dc7fea60";

app
  .use(express.json())
  .use(express.urlencoded())
  .use(cors())
  .post("/login", (req, res) => {
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

        var token = jwt.sign(
          { username: user.username, email: user.email },
          jwtSecretKey,
          { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, token });
      })
      .catch((e) => {
        throw e;
      });
  })
  .get("/verify-token", (req, res) => {
    try {
      const token = req.headers.token.split("Bearer ")[1];
      jwt.verify(token, jwtSecretKey);

      res.status(200).json({});
    } catch (e) {
      res.status(401).json({});
    }
  })
  .listen(5000, () => console.log("> App on port 5000."));
