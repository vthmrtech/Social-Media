import { Request } from "express";
import multer from "multer";
import users from "../models/usersSchema";

const storage = multer.diskStorage({

  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "./src/public/uploads");
  },
  filename: async function(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const user = await users.findOne({UserId : req.body.UserId})
    const fileName = user?.UserId +'.'+ file.originalname.split('.').pop()
    req.body.profileImg = fileName;
    cb(null,fileName);
  },
});

export const upload = multer({ storage: storage });

