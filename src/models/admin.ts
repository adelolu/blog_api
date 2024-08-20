import mongoose, { Document } from "mongoose";
import { UserRoles } from "./user";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: UserRoles.admin,
  },
});

export default mongoose.model<IAdmin>("admin", adminSchema);
