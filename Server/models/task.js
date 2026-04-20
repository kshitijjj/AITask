import mongoose from 'mongoose'

const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    input:{
        type:String,
        required:true
    },
    operation:{
        type:String,
        enum:['uppercase','lowercase','reverse','wordCount',"removeSpaces","charCount"],
        required:true
    },
    result:{
        type:String,
    },
    logs:[{
        message:{
            type:String,
        },
        timeStamp:{
            type:Date,
            default:Date.now
        },
        status:{
            type:String,
            enum:['pending','running','completed','failed'],
            default:"pending"
        }
    }]
},{timestamps:true})

const taskModel=mongoose.model("taskModel",taskSchema);
export default taskModel;