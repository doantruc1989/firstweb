const express = require('express');
const app = express();
const fs = require('fs');
var typeorm = require("typeorm");
const session = require('express-session');
app.use(session({ secret: "123", cookie: { maxAge: 1000 * 3600 } }))
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
var bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');
const user = require('./entity/user');
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var myDataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "db2",
    synchronize: true,
    entities: [require("./entity/user")],
})
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });



app.get('/', (req, res) => {
    res.send('home page')
});

app.get('/login', (req, res) => {
    res.render('home')
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' }))

app.get('/profile', (req, res) => {
    res.send('day la trang profile')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    let encryptPsw = "";
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            encryptPsw = hash;
            console.log("hash", hash);
            const newUser = {
                pwd: hash,
                usr: req.body.username,
                role: "user"
            };
            myDataSource.getRepository(user).save(newUser);
            res.redirect('/');
        });
    });
})

app.get('/private', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('welcome to private page')
    } else {
        res.send('login lai di ban oi')
    }
})
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const userRecord = await myDataSource.getRepository(user).find({
            where: { usr: username }
        })
        bcrypt.compare(password, userRecord[0].pwd, function (err, result) {
            if (result == true) {
                return done(null, userRecord);
            } else {
                return done(null, false)
            }
        })
    })
)

passport.serializeUser((user, done) => {
    done(null, user[0].usr)
})

passport.deserializeUser(async (name, done) => {
    const userRecord = await myDataSource.getRepository(user).find({
        where: { usr: name }
    })
    if (userRecord) {
        return done(null, userRecord)
    } else {
        return done(null, false)
    }
})


app.listen(3000, () => console.log('server da hoat dong'));