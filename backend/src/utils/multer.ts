import { Request } from "express";
import multer from "multer";
import users from "../models/usersSchema";

const storage = multer.diskStorage({
  
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    if(file.fieldname === "profileImg")cb(null, "./src/public/uploads/profile");
    if(file.fieldname === "postsImg")cb(null, "./src/public/uploads/posts");
  },
  filename: async function(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    req.body.profileImg = file.originalname;
    cb(null,file.originalname);
  },
});

export const upload = multer({ storage: storage });

