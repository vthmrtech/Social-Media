import { Request, Response } from "express";
import follow from "../models/followSchema";
import users from "../models/usersSchema";

export type follow = {
  receiverId?: string;
  senderId?: string;
  status?: string;
  time?: string;
};

export const sentRequest = async (req: Request, res: Response) => {
  try {
    const otherUser: follow | null = await users.findOne({
      UserId: req.body.sendTo,
    });
    if (otherUser) {
      const request: follow | null = await follow.findOne({
        receiverId: req.body.sendTo,
        senderId: req.body.UserId,
        status: "requested",
      });

      const accepted: follow | null = await follow.findOne({
        receiverId: req.body.sendTo,
        senderId: req.body.UserId,
        status: "accepted",
      });
      const blocked: follow | null = await follow.findOne({
        receiverId: req.body.sendTo,
        senderId: req.body.UserId,
        status: "blocked",
      });
      if (!(request || accepted || blocked)) {
        const request: follow | any = await follow.create({
          receiverId: req.body.sendTo,
          senderId: req.body.UserId,
          status: "requested",
          time: new Date(),
        });
        return res.status(200).json({
          success: true,
          data: request,
          message: "Requested",
        });
      } else if (blocked) {
        return res.status(401).json({
          success: false,
          data: "",
          message: "Can't Send Request",
        });
      } else {
        return res.status(401).json({
          success: false,
          data: "",
          message: "Request Already Sent OR accepted",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        data: [],
        message: `User to be requested Not Found`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const accepted = async (req: Request, res: Response) => {
  try {
    const request: follow | null = await follow.findOne({
      receiverId: req.body.UserId,
      senderId: req.body.receivedFrom,
      status: "requested",
    });
    if (request) {
      const accepted: follow | null = await follow.findOneAndUpdate(
        {
          receiverId: req.body.UserId,
          senderId: req.body.receivedFrom,
          status: "requested",
        },
        {
          $set: {
            status: "accepted",
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        data: accepted,
        message: "Accepted",
      });
    } else {
      return res.status(401).json({
        success: false,
        data: "",
        message: "No requests found to be accepted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const blocked = async (req: Request, res: Response) => {
  try {
    const request: follow | null = await follow.findOne({
      receiverId: req.body.UserId,
      senderId: req.body.receivedFrom,
      status: "requested",
    });
    if (request) {
      const blocked: follow | null = await follow.findOneAndUpdate(
        {
          receiverId: req.body.UserId,
          senderId: req.body.receivedFrom,
          status: "requested",
        },
        {
          $set: {
            status: "blocked",
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        data: blocked,
        message: "Blocked",
      });
    } else {
      return res.status(401).json({
        success: false,
        data: "",
        message: "No requests found to be blocked",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const blocklist = async (req: Request, res: Response) => {
  try {
    const blocked = await follow.find({
      receiverId: req.body.UserId,
      status: "blocked",
    });
    return res.status(200).json({
      success: true,
      data: blocked,
      message: "Got all Blocked Users",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const request: follow | null = await follow.findOne({
      receiverId: req.body.UserId,
      senderId: req.body.receivedFrom,
      status: "requested",
    });
    if (request) {
      const deleteReq: any = await follow.findOneAndDelete({
        receiverId: req.body.UserId,
        senderId: req.body.receivedFrom,
        status: "requested",
      });
      return res.status(200).json({
        success: true,
        data: deleteReq,
        message: "Request deleted ",
      });
    } else {
      return res.status(401).json({
        success: false,
        data: "",
        message: "No requests found to be Deleted ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const unBlock = async (req: Request, res: Response) => {
  try {
    const request: follow | null = await follow.findOne({
      receiverId: req.body.UserId,
      senderId: req.body.receivedFrom,
      status: "blocked",
    });
    if (request) {
      const deleteReq: any = await follow.findOneAndDelete({
        receiverId: req.body.UserId,
        senderId: req.body.receivedFrom,
        status: "blocked",
      });
      return res.status(200).json({
        success: true,
        data: deleteReq,
        message: "Unblocked ",
      });
    } else {
      return res.status(401).json({
        success: false,
        data: "",
        message: "User wasn't blocked",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFollower = async (req: Request, res: Response) => {
  try {
    const accept: follow | null = await follow.findOne({
      receiverId: req.body.UserId,
      senderId: req.body.removeFollower,
      status: "accepted",
    });
    if (accept) {
      const deleteReq: any = await follow.deleteOne({
        receiverId: req.body.UserId,
      senderId: req.body.removeFollower,
      status: "accepted",
      });
      return res.status(200).json({
        success: true,
        data: deleteReq,
        message: "follower Removed ",
      });
    }
    else{
      return res.status(401).json({
        success :false,
        data:"",
        message :"That person is not following you "
      })
    }
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = async (req: Request, res: Response) => {
  try {
    const accept: follow | null = await follow.findOne({
      receiverId: req.body.unFollow,
      senderId: req.body.UserId,
      status: "accepted",
    });
    if (accept) {
      const deleteReq: any = await follow.deleteOne({
        receiverId: req.body.unFollow,
      senderId: req.body.UserId,
      status: "accepted",
      });
      return res.status(200).json({
        success: true,
        data: deleteReq,
        message: "Unfollowed",
      });
    }
    else{
      return res.status(401).json({
        success :false,
        data:"",
        message :"You are not following that person"
      })
    }
  } catch (error) {
    console.log(error);
  }
};

export const followers = async (req: Request, res: Response) => {
  try {
    const allFollowers: follow[] = await follow.find({
      receiverId: req.body.UserId,
      status: "accepted",
    });

    return res.status(200).json({
      success: true,
      data: allFollowers,
      message: "Got All followers",
    });
  } catch (error) {
    console.log(error);
  }
};

export const followings = async (req: Request, res: Response) => {
  try {
    const allFollowings: follow[] = await follow.find({
      senderId: req.body.UserId,
      status: "accepted",
    });

    return res.status(200).json({
      success: true,
      data: allFollowings,
      message: "Got all Followings",
    });
  } catch (error) {
    console.log(error);
  }
};
