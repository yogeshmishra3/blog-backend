import mongoose from "mongoose";

const ConnectionDB = async () => {

    try {

        await mongoose.connect("mongodb+srv://0xswarnil:dhoommachale@cluster0.uj7bi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("MongoDB is Connected");

    } catch (error) {

        console.error(error.message);
        process.exit(1);

    }

};

export default ConnectionDB;
