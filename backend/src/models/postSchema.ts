import {Schema,model,Document} from 'mongoose'

const usersSchema = new Schema({
        UserId: String,
        comments: Array,
        like : Array,
        postDisc:String,
        postId:String,
        postImg: String,
        time:String,
});

const users  = model("users",usersSchema)

export default users
    