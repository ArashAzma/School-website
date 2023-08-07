import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
        username:{
            type: String,
            unique: true,
            minLength: 4,
            required : true,
        },
        email: {
            type: String,
            unique: true,
            required : true,
        },
        password: {
            type: String,
            required : true,
            minLength: 4,
        }
    },
    {timestamps : true}
)
 
export default mongoose.models.User || mongoose.model("User", userSchema);