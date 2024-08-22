const sequelize = require("./config/connection");
const express = require("express");
const session = require("express-session");
const PORT = process.env.PORT || 3004;
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { User } = require('./models');

const app = new express();

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 600
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};


app.use(session(sess));
const hbs = exphbs.create();
// configure hb as the templating engine
app.engine("handlebars", hbs.engine);
// configure the default view engine to hb
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
    });
