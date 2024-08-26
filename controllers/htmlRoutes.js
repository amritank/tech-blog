const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
    res.redirect("/homepage");
});

// TODO: add middlewear for auth
router.get("/homepage", async (req, res) => {
    // if (!req.session.loggedIn) {
    //     return res.redirect("/login");
    // }

    let returnData;
    let is_logged_in = req.session.loggedIn;
    let user_id = req.session.user?.id;
    let uname = req.session.user?.username;
    try {
        const blogData = await Blog.findAll({
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ],
                    separate: true,
                    order: [['createdAt', 'DESC']]
                },
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log("findall() blog data: ", blogData);

        if (blogData.length === 0) {
            returnData = {
                status: 404,
                success: true,
                data: blogData
            };

        }
        returnData = { status: 200, success: true, data: blogData }

    } catch (err) {
        const error = "Error while trying to querying db to render homepage: " + err;
        console.log(error);
        returnData = { status: 500, success: false, data: [], message: error };
    }

    const processedata = [];
    for (d of returnData.data) {
        const record = {
            "title": d.blogTitle,
            "text": d.blogText,
            "blogger": d.User.username,
            "createTime": new Date(d.createdAt).toDateString(),
            "BlogId": d.id,
            "UserId": user_id,
        }
        if (is_logged_in) {
            record["comments"] = [];
            if (d.Comments.length > 0) {
                for (c of d.Comments) {
                    // console.log(c);
                    const cRecord = {
                        "comment": c.comment,
                        "commenter": c.User.username,
                        "createTime": new Date(c.createdAt).toDateString(),
                    }
                    console.log("record: ", cRecord);
                    record.comments.push(cRecord);
                }

            }

        }
        processedata.push(record)
    }
    console.log("Processed data that will be rendered: ", processedata);
    returnData.data = processedata;
    returnData.isLoggedIn = is_logged_in;
    returnData.userName = uname;
    console.log(returnData);
    res.render('home', { result: returnData });
});

router.get("/dashboard", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect("/login");
    }
    let returnData;
    console.log(req.session);
    let user_id = req.session.user?.id;
    let uname = req.session.user?.username;
    try {
        const blogData = await Blog.findAll({
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ],
                    separate: true,
                    order: [['createdAt', 'DESC']]
                }
            ],
            order: [['createdAt', 'DESC']],
            where: {
                UserId: user_id
            }
        });
        console.log("DB findall() blog data: ", blogData);

        if (blogData.length === 0) {
            returnData = {
                status: 404,
                success: true,
                data: blogData
            };

        }
        returnData = { status: 200, success: true, data: blogData }

    } catch (err) {
        const error = "Error while trying to querying db to render homepage: " + err;
        console.log(error);
        returnData = { status: 500, success: false, data: [], message: error };
    }

    const processedata = [];
    for (d of returnData.data) {
        const record = {
            "title": d.blogTitle,
            "text": d.blogText,
            "blogger": d.User.username,
            "createTime": new Date(d.createdAt).toDateString(),
            "BlogId": d.id,
            "UserId": d.UserId,
        }
        record["comments"] = [];
        if (d.Comments.length > 0) {
            for (c of d.Comments) {
                // console.log(c);
                const cRecord = {
                    "comment": c.comment,
                    "commenter": c.User.username,
                    "createTime": new Date(c.createdAt).toDateString(),
                }
                console.log("record: ", cRecord);
                record.comments.push(cRecord);
            }

        }
        processedata.push(record)
    }

    console.log("Return data being passed to render dashboard: ");
    returnData.data = processedata;
    returnData.userId = user_id;
    returnData.userName = uname;
    console.log(returnData);
    res.render('dashboard', { result: returnData });
});

router.get("/login", (req, res) => {
    // if user logged in .. redirect to home page
    if (req.session.loggedIn) {
        res.redirect("/homepage");
    }
    //else re-direct to login page
    res.render("login");
});


module.exports = router;