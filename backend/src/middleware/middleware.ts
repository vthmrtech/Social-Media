import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../models/usersSchema";
import { User } from "../controllers/authController";
dotenv.config();
interface DecodedToken {
  email: string;
  UserId: string;
}


export const SECRET_KEY: Secret = "Vrut@2401";

const authMiddleware = () =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.get("Authorization");
    if (!authorization) {
      return res.status(401).json({ message: "Token Required!!!!" });
    }

    const token: string = authorization.split(" ")[1];
    let decoded: DecodedToken | any;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Something Went Wrong" });
    }

    const user : User | null = await users.findOne({UserId : req.body.UserId});
    if(user?.email !== decoded.email){
      return res.status(401).json({ message: "Unauthorized !!!!" });

    }
    
    next();
  };

export default authMiddleware;
