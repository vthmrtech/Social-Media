import { Request } from "express";
import multer from "multer";


const storage = multer.diskStorage({
  
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    if(file.fieldname == "profileImg"){
      cb(null, "./src/public/uploads/profile")
    }
    else if(file.fieldname == "postImg"){

      cb(null, "./src/public/uploads/posts")

    }

  },
  filename: async function(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    if(file.fieldname == "profileImg"){
      req.body.profileImg = file.originalname;
    }
    else if(file.fieldname == "postImg"){

      req.body.postImg = file.originalname;

    }

    
    cb(null,file.originalname);
  },
});

export const upload = multer({ storage: storage });

