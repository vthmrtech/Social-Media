import {Schema,model,Document} from 'mongoose'

const postSchema = new Schema({
        UserId: String,
        comments: Array,
        like : Array,
        postDisc:String,
        postId:String,
        postImg: String,
        time:String,
});

const posts  = model("posts",postSchema)

export default posts
    