const router = require("express").Router();
const blogRoutes = require("./blog");
const commentRoutes = require("./comment");

router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router
