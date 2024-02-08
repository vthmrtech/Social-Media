import { Request, Response } from "express";
import users from "../models/usersSchema";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/middleware";

type User = {
  email?: string;
  password?: string;
  profileImg?: string;
  username?: string;
  UserId?: string;
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

export const login = async (req: Request, res: Response) => {
  try {
    const data: User | null = await users.findOne({
      email: req.body.email,
    });
    if (data) {
      const passwordVerify: boolean = await bcrypt.compare(
        req.body.password || "",
        data.password || ""
      );
      if (passwordVerify) {
        const token = jwt.sign(
          {
            email: data.email,
            UserId: data.UserId,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          success: true,
          data,
          token,
          message: `User Login Successfull`,
        });
      }
      else{
        return res
        .status(404)
        .json({ success: false, data: [], message: "Password Not Match" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, data: [], message: "User Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const loginData: User | null = await users.findOne({
      UserId: req.body.UserId,
      email: req.body.email,
    });
    if (loginData) {
      if (
        req.body.profileImg &&
        loginData.profileImg &&
        loginData.profileImg !== req.body.profileImg
      ) {
        fs.unlinkSync(`./src/public/uploads/profile/${loginData.profileImg}`);
      }
      const updateData = await users.findOneAndUpdate(
        {
          UserId: req.body.UserId,
        },
        { $set: { ...req.body } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        data: updateData,
        message: "User Info Updated",
      });
    } else {
      fs.unlinkSync(`./src/public/uploads/${req.body.profileImg}`);
      return res
        .status(404)
        .json({ success: false, data: [], message: "Email Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
};
