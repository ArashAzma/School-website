import mongoose from 'mongoose'; 

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/School");
    console.log("CONNECTED")
  } catch (error) {
    throw new Error(error)
}
};
export default connect; 