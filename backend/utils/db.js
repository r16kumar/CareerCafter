import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://r16kumar2003:pjn2mkW9pkhusR4k@cluster0.bld0ah9.mongodb.net/");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;