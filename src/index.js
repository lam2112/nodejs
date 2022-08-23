const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;

//http loger
app.use(morgan("combined"));

//tempolate engine
//su dung engine de doi ten duoi file
app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources\\views"));

//cho phep cac trang web tinh
app.use(express.static(path.join(__dirname, "public")));

//tao cac page moi + tao tuyen duong truy cap (routing) = URL (sd http GET/POST)
//req -> yeu cau nguoi dung, res -> server gui ve
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/news", (req, res) => {
    res.render("news");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
