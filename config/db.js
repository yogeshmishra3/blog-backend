import mongoose from "mongoose";

const ConnectionDB = async () => {

    try {

        await mongoose.connect("mongodb+srv://dhoommachale:0xswarnil@cluster0.uj7bi.mongodb.net/blogapp?retryWrites=true&w=majority");

        console.log("MongoDB is Connected");

    } catch (error) {

        console.error(error.message);
        process.exit(1);

    }

};

export default ConnectionDB;
