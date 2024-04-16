const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./db");
const port = 8080;
const jwtSecret = "secret_key";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//signup routes
app.post("/user/signup", async function (req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userexits = await User.findOne({
      email: sanitizedEmail,
    });
    if (userexits) {
      return res.status(200).json({ msg: "User already exits " });
    }
    await User.create({
      username: username,
      email: sanitizedEmail,
      gender: gender,
      password: hashedPassword,
    });
    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went wrong" });
  }
});

app.post("/user/login", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: sanitizedEmail,
    });
    if (!user) {
      return res.status(200).json({ msg: "User not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: "Wrong Password" });
    }
    const token = await jwt.sign({ sanitizedEmail }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ msg: "Login Successfully", token, user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Something Went wrong" });
  }
});

app.listen(port, () => {
  console.log(`server is running on port number ${port} `);
});
