const router = require("express").Router();
const { Blog } = require("../../models");

router.post("/", async (req, res) => {

    try {
        const data = await Blog.create({
            blogTitle: req.body.blog_title,
            blogText: req.body.blog_text,
            UserId: req.body.user_id
        });
        console.log(data);
        if (data) {
            return res.status(200).json({ status: 200, success: true, data: data, message: "" })
        }
        console.log("Aft");
        res.status(500).json({ status: 500, success: false, data: [], message: "Error while creating post" });
    } catch (err) {
        const error = `Error while creating a new blog entry: ${err}`;
        console.log("au er: ", error);
        return res.status(500).json({ status: 500, success: false, data: [], message: error });
    }

});

// TODO: Check user is logged in
router.get("/:id", async (req, res) => {

    try {
        const data = await Blog.findByPk(req.params.id, {
            order: [['createdAt', 'DESC']],
        })
        if (!data) {
            return res.status(404).json({ success: true, data: [], status: 404 });
        }
        res.status(200).json({ success: true, data: data, status: 200 });

    } catch (err) {
        const error = `Error while querying for blog by id: ${err}`;
        console.log(error);
        return res.status(500).json({ status: 500, success: false, data: [], message: error });
    }

});

// TODO: Check user is logged in
router.put("/:id", async (req, res) => {

    try {
        const blogId = req.params.id;
        const data = await Blog.update(req.body, {
            where: {
                id: blogId
            }
        })
        console.log("Put call return data: ", data);
        if (!data[0]) {
            return res.status(404).json({ success: true, data: [], status: 404 });
        }
        res.status(200).json({ success: true, data: data, status: 200 });

    } catch (err) {
        const error = `Error while updating blog with id: ${err}`;
        console.log(error);
        return res.status(500).json({ status: 500, success: false, data: [], message: error });
    }

});

module.exports = router;