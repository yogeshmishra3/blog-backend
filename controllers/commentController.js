import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {

    try {

        const { blogId, content, parentComment } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Comment content required"
            });
        }

        const comment = await Comment.create({
            blogId,
            content,
            parentComment: parentComment || null,
            author: req.user._id
        });

        res.status(201).json(comment);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


export const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({
            blogId: req.params.blogId
        }).populate("author", "name");

        res.json(comments);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};