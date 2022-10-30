var express = require('express');
var app = express();
var passport = require('passport');
// var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
// var session = require('express-session');
var configDB = require('./config/database.js');
var typeorm = require("typeorm")


app.use(morgan('dev')); // log tất cả request ra console log
app.use(cookieParser()); // đọc cookie (cần cho xác thực)

// các cài đặt cần thiết cho passport
// app.use(session({ secret: 'ilovescodetheworld' })); // chuối bí mật đã mã hóa coookie
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


const myDataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "2",
    entities: ["/entity/*{.js,.ts}"],
    synchronize: true,
})
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


app.listen(3000);