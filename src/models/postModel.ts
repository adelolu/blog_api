import{Schema, model} from "mongoose"

interface IPost {
  title: string;
  content: string;
  authorId: string;
  author: string[];
  comments: string[];
  hashtags: string[];
  like: number;
}


const postSchema = new Schema<IPost>({
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
}, { timestamps: true });
  

// export default model<IPost> = model("post", postSchema)
// const User = model<IUser>('User', userSchema);

  
  export const postmodel = model<IPost>("post", postSchema);