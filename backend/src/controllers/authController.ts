import { Request, Response } from "express";
import users from "../models/usersSchema";


interface User {
  Id: string;
  email: string;
  password: string;
  cpassword: string;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const loginData: User | null = await users.findOne({
      email: req.body.email,
    });
    if (!loginData) {
      if (req.body.password === req.body.cpassword) {
        const data1 = users.create(req.body)
        return res.status(200).json({
          success: true,
          data: data1,
          message: `User Registered`,
        });
      } else {
        return res.status(200).json({
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


export const update = async (req: Request, res: Response) => {
        try {
          const loginData: User | null = await users.findOne({
                UserId: req.body.UserId,
          });
          if (loginData) {
                const loginData: User | null = await users.findOneAndUpdate({
                        UserId: req.body.UserId,
                  },{$set:{...req.body}});
                  return res
                  .status(200)
                  .json({ success: true, data: [], message: "User Info Updated" });
          } else {
            return res
              .status(204)
              .json({ success: false, data: [], message: "Email Not Found Exists" });
          }
        } catch (error) {
          console.log(error);
        }
      };
