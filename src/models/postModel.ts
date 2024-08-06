import mongoose from "mongoose"

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
    like: { type: Number, default: 0 },
    author: [String],
    authorId: { type: String, required: true }
  }, {timestamps: true});
  
  export const postmodel = mongoose.model("post_collection", postSchema);