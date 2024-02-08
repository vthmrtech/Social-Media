import { Request, Response } from "express";
import posts from "../models/postSchema";

type comments = {
  UserId?: string;
  comment?: string;
  commentId?: string;
};

type post = {
  UserId?: string;
  comments?: comments[];
  like?: string[];
  postDisc?: string;
  postId?: string;
  postImg?: string;
  time?: string;
};

export const addPosts = async (req: Request, res: Response) => {
  try {
    const newPost: any = await posts.create(req.body);
    return res.status(200).json({
      success: true,
      data: newPost,
      message: `New Post Added`,
    });
  } catch (error) {
    console.log(error);
  }
};
