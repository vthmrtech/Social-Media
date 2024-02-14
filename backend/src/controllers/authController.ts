import { Request, Response } from "express";
import users from "../models/usersSchema";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { SECRET_KEY, userDetails } from "../middleware/middleware";

export type User = {
  email?: string;
  password?: string;
  profileImg?: string;
  username?: string;
  UserId?: string;
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers: User[] = await users.find();
    return res.status(200).json({
      success: true,
      data: allUsers,
      message: "Requested",
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const loginData: User | null = await users.findOne({
      email: req.body.email,
    });
    if (!loginData) {
      if (req.body.password === req.body.cpassword) {
        const signupData = {
          ...req.body,
          UserId: uuid(),
          password: await bcrypt.hash(req.body.password, 1),
        };
        const token = jwt.sign(
          {
            email: signupData.email,
            UserId: signupData.UserId,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        const data = await users.create(signupData);
        return res.status(200).json({
          success: true,
          data,
          token,
          message: `User Registered`,
        });
      } else {
        return res.status(204).json({
          success: false,
          data: [],
          message: "Password And Confirm Password Should Match",
        });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, data: [], message: "Email Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser  = async (req :  Request, res :Response) => {
  const user : User | any = await users.findOne({UserId : userDetails.UserId});
  return res.status(200).json({
    success: true,
    data: user,
    message: "User Found",
  });
}


export const login = async (req: Request, res: Response) => {
  try {
    const user :User | any = req.user

    const token = jwt.sign(
      {
        email: user?.email,
        UserId: user?.UserId,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({
      success: true,
      user,
      token,
      message: 'User Login Successfull',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const loginData :User | any = await users.findOne({email: userDetails.email});

      if (
        req.body.profileImg &&
        
        loginData.profileImg &&
        loginData.profileImg !== req.body.profileImg
        ) {
        fs.unlinkSync(`./src/public/uploads/profile/${loginData.profileImg}`);
      }
      else if(req.body.profileImg == ""  && loginData.profileImg){
        
        fs.unlinkSync(`./src/public/uploads/profile/${loginData.profileImg}`);
      }
    
      const updateData = await users.findOneAndUpdate(
        {
          UserId: loginData.UserId,
        },
        { $set: { ...req.body } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        data: updateData,
        message: "User Info Updated",
      });
  } catch (error) {
    console.log(error);
  }
};
