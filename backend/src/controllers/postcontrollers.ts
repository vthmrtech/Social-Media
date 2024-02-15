import { Request, Response } from "express";
import posts from "../models/postSchema";
import { v4 as uuid } from "uuid";
import requests from "../models/requestsSchema";
import { userDetails } from "../middleware/middleware";
import fs from "fs";
import users from "../models/usersSchema";

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

export const getUserPost = async (req: Request, res: Response) => {
  try {
    const getPosts : post[] | null = await posts.find({
      UserId: userDetails.UserId
    })
    return res.status(200).json({
      success: true,
      data: getPosts,
      message: `Got All Posts`,
    });
  } catch (error) {
    console.log(error)
  }
} 

export const getUserFollowingPosts = async (req: Request, res: Response) => {
  try {
    const followingPosts : any = await requests.aggregate([
      {
        $match: {
          senderId: userDetails.UserId,
          status: "accepted",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "receiverId",
          foreignField: "UserId",
          as: "userPosts",
        },
      },
      { $unwind: "$userPosts" }
    ]);

    return res.status(200).json({
      success: true,
      data: followingPosts,
      message: "Got posts from followed users",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching posts from followed users",
    });
  }
};


export const addPosts = async (req: Request, res: Response) => {
  try {
    
      const newPost: post | any = await posts.create({
        ...req.body,
        username : await users.findOne({UserId:userDetails.UserId}).then((result)=> result?.username),
        userProfile : await users.findOne({UserId:userDetails.UserId}).then((result)=> result?.profileImg),
        UserId: userDetails.UserId,
        postId: uuid(),
        time : new Date()
      });
      return res.status(200).json({
        success: true,
        data: newPost,
        message: `New Post Added`,
      });
    
  } catch (error) {
    console.log(error);
  }
};

export const deletePosts = async (req: Request, res: Response) => {
  try {
    const deletePost: post | null = await posts.findOne({
      postId: req.params.id,
      UserId: userDetails.UserId,
    });
    if (deletePost) {
      const deletePosts: any = await posts.deleteOne({
        postId: req.params.id,
        UserId: userDetails.UserId,
      });
      fs.unlinkSync(`./src/public/uploads/posts/${deletePost.postImg}`);
      return res.status(200).json({
        success: true,
        data: deletePosts,
        message: `Post Deleted`,
      });
    } else {
      return res.status(404).json({
        success: false,
        data: [],
        message: `Cant find any post with User Id and Post Id`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeDislike = async (req: Request, res: Response) => {
  try {
    const post: post | null = await posts.findOne({
      postId: req.body.postId,
    });
    if (post) {
      if (post?.like?.includes(userDetails.UserId)) {
        const dislike: post | null = await posts.findOneAndUpdate(
          { postId: req.body.postId },
          {
            $pull: {
              like: userDetails.UserId,
            },
          },
          { new: true }
        );
        const getPosts : post[] | null = await posts.find({
          UserId:userDetails.UserId
        })
        return res.status(200).json({
          success: true,
          data: dislike,
          message: `Post Disliked`,
        });
      } else {
        const like: post | null = await posts.findOneAndUpdate(
          { postId: req.body.postId },
          {
            $push: {
              like: userDetails.UserId,
            },
          },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          data: like,
          message: `Post Liked`,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        data: [],
        message: `Post not Found`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const post: post | null = await posts.findOne({
      postId: req.body.postId,
    });
    if (post) {
      const comment = await posts.findOneAndUpdate(
        { postId: req.body.postId },
        {
          $push: {
            comments: {
              comment: req.body.comment,
              commentId: uuid(),
              UserId: userDetails.UserId,
              username : await users.findOne({UserId:userDetails.UserId}).then((result)=> result?.username),
              userProfile : await users.findOne({UserId:userDetails.UserId}).then((result)=> result?.profileImg)
            },
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        data: comment,
        message: `comment added`,
      });
    } else {
      return res.status(404).json({
        success: false,
        data: [],
        message: `Post Not Found`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  try {
    if (req.body.postId && req.body.commentId) {
      const post: post | null = await posts.findOne({
        postId: req.body.postId,
        comments: {
          $elemMatch: {
            UserId: userDetails.UserId,
            commentId: req.body.commentId,
          },
        },
      });
      const userPost = await posts.findOne({
        postId: req.body.postId,
        UserId: userDetails.UserId,
      });
      if (post || userPost) {
        const comment = await posts.findOneAndUpdate(
          { postId: req.body.postId },
          {
            $pull: {
              comments: {
                commentId: req.body.commentId,
              },
            },
          },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          data: comment,
          message: `comment Deleted`,
        });
      } else {
        return res.status(404).json({
          success: false,
          data: [],
          message: `Post Not Found`,
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        data: [],
        message: `PostId & commentId Required`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
