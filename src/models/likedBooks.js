import mongoose from "mongoose";
const { Schema } = mongoose;


const likedSchema = new Schema({
        title:{
            type: String,
            required: true,
        },
        id:{
            type: String,
            required: true, 
        },
        price:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        user_id:{
            type: String,
            required: true,
        }
    },
    {timestamps : true}
)
export default mongoose.models.likedBooks || mongoose.model("likedBooks", likedSchema);