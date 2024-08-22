const router = require("express").Router();
const blogRoutes = require("./blog");
const commentRoutes = require("./comment");
const userRoutes = require("./user");

router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);
router.use("/user", userRoutes);

module.exports = router
