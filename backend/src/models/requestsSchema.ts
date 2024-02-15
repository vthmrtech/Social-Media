import { Schema, model, Document } from "mongoose";

const requestsSchema = new Schema({
  receiverId: String,
  senderId: String,
  status: String,
  time: String,
  blockerId : {type :String ,default : null},
});

const requests = model("requests", requestsSchema);

export default requests;
