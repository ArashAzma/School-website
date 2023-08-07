import mongoose from "mongoose";
const { Schema } = mongoose;

const studentsSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
  },
  number: {
    type: String, 
    required: true,
    unique: true,
    validate: { 
      validator: function (value) {
        return /^\d{6}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid 6-digit code!`,
    },
  },
  fathers_name: {
    type: String,
    required: true,
    minLength: 4,
  },
  final_score: {
    type: Number,
    required: true,
    min: 0, 
    max: 20,
  },
});
export default mongoose.models.students ||
  mongoose.model("students", studentsSchema);
