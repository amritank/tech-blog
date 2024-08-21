const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {

    try {
        const newRecord = {
            comment: req.body.comment,
            BlogId: req.body.blogId,
            UserId: req.body.userId
        }

        const data = await Comment.create(newRecord);
        console.log("Recieved data from the post comment call as: " + JSON.stringify(data));
        return res.status(200).json({ status: 200, success: true, data: data })

    } catch (err) {
        const error = `Error while posting a comment: ${err}`;
        console.log(error);
        return res.status(500).json({ status: 500, success: false, data: [], message: error });
    }


});

module.exports = router;