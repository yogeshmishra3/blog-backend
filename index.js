import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ConnectionDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();

/* Middleware */

app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

ConnectionDB();

/* Routes */

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);


/* MongoDB Connection */

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

/* Health Route */

app.get("/", (req, res) => {
    res.send("Blog API Running");
});

/* Server Start */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});