import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    role:{
        type:String,
        default:Admin
    }
},
    {timestamps:true}
)

const Admin = mongoose.model("Admin",adminSchema)
export default Admin