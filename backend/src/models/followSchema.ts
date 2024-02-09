import { Schema, model, Document } from "mongoose";

const followSchema = new Schema({
  receiverId: String,
  senderId: String,
  status: String,
  time: String,
});

const follow = model("follows", followSchema);

export default follow;
