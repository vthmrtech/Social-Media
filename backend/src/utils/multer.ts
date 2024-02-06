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

// import { v4 as uuidv4 } from 'uuid';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './src/public/uploads')
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique file name using uuid
//     const uniqueFileName = uuidv4() + '-' + file.originalname;
//     req.body.profileImg = uniqueFileName;
//     cb(null, uniqueFileName)
//   }
// })

// export const upload = multer({ storage: storage })
