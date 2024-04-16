const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akshat:ClkAy2uS5xyCo4u7@cluster0.mohmmmm.mongodb.net/user_registration"
);

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  gender: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
