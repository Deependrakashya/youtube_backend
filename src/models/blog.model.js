import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String, 
        required:true,
        trim:true
    },
    description:{
        type:String, 
        required:true,
        trim:true
    }
}, { timestamps: true });

export const Blog = mongoose.model("blog", blogSchema)