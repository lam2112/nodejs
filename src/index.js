const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')

//connect DB
db.connect();

//http loger
// app.use(morgan("combined"));

//cho phep cac trang web tinh
app.use(express.static(path.join(__dirname, 'public')));
//sd middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//sd fetch, axios, ...
app.use(express.json());

//tempolate engine
//su dung engine de doi ten duoi file
app.engine(
    'hbs',
    hbs.engine({
        extname:
         '.hbs',
    }),
);
      app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//tao cac page moi + tao tuyen duong truy cap (routing) = URL (sd http GET/POST)
//req -> yeu cau nguoi dung, res -> server gui ve

// routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
