import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(Process.env.MONGO_URL);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;
