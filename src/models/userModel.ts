import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    // minLength: [5, "password cant be short"],
    // select: false
  },
 
  token: {
    type: String,
    required: true,
    default: ''
  },
});

export const usermodel = mongoose.model("user_collection", userSchema);


