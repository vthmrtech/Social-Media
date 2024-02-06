import {Schema,model,Document} from 'mongoose'

const usersSchema = new Schema({
        UserId: String,
        username: String,
        email: String,
        password: String,
        mobile: String,
        profileImg: String,
        dob : String,
        bio:String
});

const users  = model("users",usersSchema)

export default users
    