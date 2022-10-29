const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require('method-override')
const hbs = require("express-handlebars");
const Handlebars = require('handlebars');
const cookiePaser = require("cookie-parser")

const SortMiddleware = require('./app/middleware/sortMiddleware')

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

//sd fetch, axios, ...
app.use(express.json());

// https://expressjs.com/en/resources/middleware/method-override.html (cho phép PUT, PATH trong form)
app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleware);
app.use(cookiePaser())

//tempolate engine
//su dung engine de doi ten duoi file
app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        helpers: require('./helpers/handlebars')
    }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//tao cac page moi + tao tuyen duong truy cap (routing) = URL (sd http GET/POST)
//req -> yeu cau nguoi dung, res -> server gui ve

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
