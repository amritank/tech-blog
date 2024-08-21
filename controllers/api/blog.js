const router = require("express").Router();
const { Blog } = require("../../models");

// TODO: Check user is logged in
router.get("/:id", async (req, res) => {

    try {
        const data = await Blog.findByPk(req.params.id)
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