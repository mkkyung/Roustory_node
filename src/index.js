var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//home
app.use('/home', require("./routers/home"));

app.use('/tourist', require("./routers/tourist"));

app.use('/board', require("./routers/board"));
app.use('/list', require("./routers/list"));
app.use('/recommend', require("./routers/recommend"));
app.use('/review', require("./routers/review"));
app.use('/login', require("./routers/login"));
app.use('/reviewDetail', require("./routers/reviewDetail"));
app.use('/mypage', require("./routers/schedule"));
app.use('/mypage', require("./routers/member"));

app.listen(4000, () => {
    console.log('listening to port 4000');
})