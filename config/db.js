import mongoose from "mongoose";

const ConnectionDB = async () => {

    try {

        await mongoose.connect("mongodb+srv://yogeshmconvo_db_user:PJWFEcyv3t40RWum@cluster0.vw8fdny.mongodb.net/?appName=Cluster0");

        console.log("MongoDB is Connected");

    } catch (error) {

        console.error(error.message);
        process.exit(1);

    }

};

export default ConnectionDB;
