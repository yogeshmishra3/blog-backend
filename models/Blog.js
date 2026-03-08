import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        // Des
        description: {
            type: String,
            required: true
        },


        content: {
            type: String,
            required: true
        },

        // Reference to the User model
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // For Like and Unlike Blog
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        tags: [
            {
                type: String
            }
        ]

    },
    { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
