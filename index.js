import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectionDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://blog-frontend-xi-one.vercel.app"
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

/* Health Route */
app.get("/", (req, res) => {
    res.send("Blog API Running");
});

export default app;
