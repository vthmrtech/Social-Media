import { Request, Response } from "express";
import requests from "../models/requestsSchema";
import users from "../models/usersSchema";
import { userDetails } from "../middleware/middleware";

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
      const request: follow | null = await requests.findOne({
        receiverId: req.body.sendTo,
        senderId: userDetails.UserId,
        status: "requested",
      });

      const accepted: follow | null = await requests.findOne({
        receiverId: req.body.sendTo,    
        senderId: userDetails.UserId,
        status: "accepted",
      });
      const blocked: follow | null = await requests.findOne({
        receiverId: req.body.sendTo,
        senderId: userDetails.UserId,
        status: "blocked",
      });
      if (!(request || accepted || blocked)) {
        const request: follow | any = await requests.create({
          receiverId: req.body.sendTo,
          senderId: userDetails.UserId,
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
    const request: follow | null = await requests.findOne({
      receiverId: userDetails.UserId,
      senderId: req.body.receivedFrom,
      status: "requested",
    });
    if (request) {
      const accepted: follow | null = await requests.findOneAndUpdate(
        {
          receiverId: userDetails.UserId,
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
    const follower: follow | null = await requests.findOne({
      receiverId: userDetails.UserId,
      senderId: req.params.id,
      
    });

    const following: follow | null = await requests.findOne({
      receiverId: req.params.id,
      senderId: userDetails.UserId,
      
    });

    if (follower && following) {
      const blockedFollower: follow | null = await requests.findOneAndUpdate(
        {
          receiverId: userDetails.UserId,
          senderId: req.params.id,
          
        },
        {
          $set: {
            status: "blocked",
            blockerId :userDetails.UserId,
          },
        },
        {
          new: true,
        }
      );

      const blockedFollowing: follow | null = await requests.findOneAndUpdate(
        {
          receiverId: req.params.id,
          senderId: userDetails.UserId,
          
        },
        {
          $set: {
            status: "blocked",
            blockerId :userDetails.UserId,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        data: {
          blockedFollower: blockedFollower,
          blockedFollowing: blockedFollowing,
        },
        message: "Both follower and following blocked",
      });
    } else if (follower) {
      const blockedFollower: follow | null = await requests.findOneAndUpdate(
        {
          receiverId: userDetails.UserId,
          senderId: req.params.id,
          
        },
        {
          $set: {
            status: "blocked",
            blockerId :userDetails.UserId,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        data: blockedFollower,
        message: "Follower blocked",
      });
    } else if (following) {
      const blockedFollowing: follow | null = await requests.findOneAndUpdate(
        {
          receiverId: req.params.id,
          senderId: userDetails.UserId,
          
        },
        {
          $set: {
            status: "blocked",
            blockerId :userDetails.UserId,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        data: blockedFollowing,
        message: "Following blocked",
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
    const blocked = await requests.find({
      blockerId :userDetails.UserId,
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
    const request: follow | null = await requests.findOne({
      receiverId: userDetails.UserId,
      senderId: req.params.id,
      status: "requested",
    });
    const cancel : follow | null= await requests.findOne({
      receiverId: req.params.id,
      senderId: userDetails.UserId,
      status: "requested",
    })
    if (request) {
      const deleteReq: any = await requests.findOneAndDelete({
        receiverId: userDetails.UserId,
        senderId: req.params.id,
        status: "requested",
      });
      return res.status(200).json({
        success: true,
        data: deleteReq,
        message: "Request deleted ",
      });
    }
    else if(cancel){
      const cancelReq : any = await requests.findOneAndDelete({
        receiverId: req.params.id,
      senderId: userDetails.UserId,
      status: "requested",
      });
      return res.status(200).json({
        success: true,
        data: cancelReq ,
        message: "Request deleted ",
      });
    } 
    else {
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
    

    const follower: follow | null = await requests.findOne({
      receiverId: userDetails.UserId,
      senderId: req.params.id,
      status: "blocked",
    });

    const following: follow | null = await requests.findOne({
      receiverId: req.params.id,
      senderId: userDetails.UserId,
      status: "blocked",
    });

    if (follower && following) {
      const deleteFollowerReq: any = await requests.findOneAndDelete({
        receiverId: userDetails.UserId,
        senderId: req.params.id,
        status: "blocked",
      });

      const deleteFollowingReq: any = await requests.findOneAndDelete({
        receiverId: req.params.id,
        senderId: userDetails.UserId,
        status: "blocked",
      });

      return res.status(200).json({
        success: true,
        data: { follower: deleteFollowerReq, following: deleteFollowingReq },
        message: "Unblocked both follower and following",
      });
    }
    else if(follower){
      const deleteFollowerReq: any = await requests.findOneAndDelete({
        receiverId: userDetails.UserId,
        senderId: req.params.id,
        status: "blocked",
      });

      return res.status(200).json({
        success: true,
        data: deleteFollowerReq,
        message: "Unblocked follower",
      });
    }
    else if(following){
      const deleteFollowingReq: any = await requests.findOneAndDelete({
        receiverId: req.params.id,
        senderId: userDetails.UserId,
        status: "blocked",
      });

      return res.status(200).json({
        success: true,
        data: deleteFollowingReq,
        message: "Unblocked following",
      });
    }
     else {
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
    const accept: follow | null = await requests.findOne({
      receiverId: userDetails.UserId,
      senderId: req.params.id,
      status: "accepted",
    });
    if (accept) {
      const deleteReq: any = await requests.deleteOne({
        receiverId: userDetails.UserId,
      senderId: req.params.id,
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
    const accept: follow | null = await requests.findOne({
      receiverId: req.params.id,
      senderId: userDetails.UserId,
      status: "accepted",
    });
    if (accept) {
      const deleteReq: any = await requests.deleteOne({
        receiverId: req.params.id,
      senderId: userDetails.UserId,
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
    const allFollowers: follow[] = await requests.find({
      receiverId: userDetails.UserId,
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
    const allFollowings: follow[] = await requests.find({
      senderId: userDetails.UserId,
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

export const getRequests = async (req: Request, res: Response) => {
  try {
    const allRequests: follow[] = await requests.find({
      receiverId: userDetails.UserId,
      status: "requested",
    });

    return res.status(200).json({
      success: true,
      data: allRequests,
      message: "Got all Requests",
    });
  } catch (error) {
    console.log(error);
  }
}

export const pendingRequests = async (req: Request, res: Response) => {
  try {
    const allRequests: follow[] = await requests.find({
      senderId: userDetails.UserId,
      status: "requested",
    });

    return res.status(200).json({
      success: true,
      data: allRequests,
      message: "Got all Requests",
    });
  } catch (error) {
    console.log(error);
  }
}
