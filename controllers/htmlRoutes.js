const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
    res.redirect("/homepage");
});

// TODO: add middlewear for auth
router.get("/homepage", async (req, res) => {
    let returnData;
    let is_logged_in = req.session.loggedIn; //TODO: Set this based on if session is active 
    let user_id = req.session.user.id; // TODO: fetch from session
    try {
        const blogData = await Blog.findAll({
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ]
                }
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
    console.log(returnData);
    res.render('home', { result: returnData });
});

// TODO: add middlewear for auth
router.get("/dashboard", async (req, res) => {
    // TODO: If user not logged in redirect to the login page
    let returnData;
    let user_id = 2; //TODO: fetch this from the session object
    try {
        const blogData = await Blog.findAll({
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']],
            where: {
                UserId: user_id
            }
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