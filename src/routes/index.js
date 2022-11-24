const adminRouter = require("./admin");
const itemRouter = require("./items");
const meRouter = require("./me");
const newsRouter = require("./news");
const courseRouter = require("./courses");
const siteRouter = require("./site");
const loginRouter = require("./login");
const cartRouter = require("./cart");
const registerRouter = require("./register")
const statisticalRouter = require("./statistical")

function route(app) {
    app.use("/statistical", statisticalRouter);

    app.use("/register", registerRouter);

    app.use("/cart", cartRouter);

    app.use("/login", loginRouter);

    app.use("/admin", adminRouter);

    app.use("/items", itemRouter);

    app.use("/me", meRouter);

    app.use("/news", newsRouter);

    app.use("/courses", courseRouter);

    app.use("/", siteRouter);
}

module.exports = route;
