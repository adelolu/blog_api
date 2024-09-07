import { IAdmin } from "../../models/admin";
import { IUser } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      fileName: string;
    }
  }
  namespace Multer {
    interface File {
      location: string;
    }
  }
}
