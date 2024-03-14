const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserType = {
    username:String,
    password:String,
    gender:Number,//0,1,2
    introduction:String,//introduction
    avatar:String,
    role:Number // admin:1, user:2
}
const UserModel = mongoose.model("user",new Schema(UserType))
module.exports = UserModel;