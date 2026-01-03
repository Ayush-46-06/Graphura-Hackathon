import mongoose from "mongoose"
const reviewSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hackathon_User",
        required:true
    },
    text:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:500
    }
},
{timestamps:true}
)

export default mongoose.model("Review",reviewSchema)