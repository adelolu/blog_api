import mongoose from "mongoose";
interface IProfile {
  firstname: string;
  lastname: string;
  email: string;
  date_of_birth: Date;
  gender: string;
  bio: string;
}

const profileSchema = new mongoose.Schema<IProfile>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
});

const profilemodel = mongoose.model<IProfile>("profile", profileSchema);
export default profilemodel;
