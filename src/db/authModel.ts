import mongoose from "mongoose"
// let bcrypt = require("bcryptjs");

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
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    
  },
  hashtags: [String],
  comments:[{type: String,default:''}],
  like:{ type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  author:[String]
});






export const usermodel = mongoose.model("user_collection", userSchema);
export const postmodel = mongoose.model("post_collection", postSchema);

