const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User")

//register
router.post("/", async (req, res) => {

    try {
        const data = await User.create({
            username: req.body.username,
            password: req.body.password,
        })

        console.log("post call data: ", data)
        if (data) {
            req.session.loggedIn = true;
            req.session.user = {
                id: data.id,
                username: data.username
            }
            return res.status(200).json(data);
        }
        return res.status(500).json({ msg: "Error while registering a new user!" });
    } catch (err) {
        console.log("Error while registering a new user!");
        return res.status(500).json({ msg: "Error while registering a new user!" });
    }

});

//login
router.post("/login", async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                username: req.body.username,
            }
        });
        if (!data) {
            return res.status(400).json({ msg: "Invalid login!" });
        }
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(400).json({ msg: "Invalid login!" });
        }

        req.session.loggedIn = true;
        req.session.user = {
            id: data.id,
            username: data.username
        };

        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error when attempting to log in.", err });
    }
});

router.delete("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({ msg: "logged out" });
});


module.exports = router;