import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {

    try {

        const { title, content, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content required"
            });
        }

        const blog = await Blog.create({
            title,
            content,
            tags,
            author: req.user._id
        });

        res.status(201).json(blog);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


// export const getBlogs = async (req, res) => {

//     try {

//         const { page = 1, limit = 10, search } = req.query;

//         const query = {};

//         if (search) {
//             query.title = { $regex: search, $options: "i" };
//         }

//         const blogs = await Blog.find(query)
//             .populate("author", "name email")
//             .skip((page - 1) * limit)
//             .limit(Number(limit))
//             .sort({ createdAt: -1 });

//         const total = await Blog.countDocuments(query);

//         res.json({
//             blogs,
//             total,
//             page,
//             pages: Math.ceil(total / limit)
//         });

//     } catch (error) {

//         res.status(500).json({ error: error.message });

//     }
// };


export const getBlogById = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


export const updateBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.tags = req.body.tags || blog.tags;

        await blog.save();

        res.json(blog);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


export const deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await blog.deleteOne();

        res.json({
            message: "Blog deleted"
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

export const LikeBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    const userId = req.user._id;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {

        blog.likes.pull(userId);

    } else {

        blog.likes.push(userId);

    }

    await blog.save();

    res.json(blog);

}

// Function for filtering by Tags
export const getBlogs = async (req, res) => {

    try {

        const { page = 1, limit = 10, search, tag } = req.query;

        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (tag) {
            query.tags = tag;   // filter by tag
        }

        const blogs = await Blog.find(query)
            .populate("author", "name")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Blog.countDocuments(query);

        res.json({
            blogs,
            total,
            page,
            pages: Math.ceil(total / limit)
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};