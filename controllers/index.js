const router = require("express").Router();
const homeRouter = require("./htmlRoutes");
const apiRoutes = require('./api');

router.use("/", homeRouter);
router.use('/api', apiRoutes);

module.exports = router;