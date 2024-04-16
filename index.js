const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const bodyParser = require('body-parser');

const engine = mustacheExpress();
const app = express();

app.engine("mustache", engine);

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "mustache");

app.use(cookieParser());
app.use(session({
    secret: "#@A4327Asdzw",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));

var reqs_total = 0;

app.get('/', (req, res) => {
    res.render('index', { nome: req.session.nome, num: req.cookies.random_num });

});

app.post('/salvauser', (req, res) => {
    req.session.nome = req.body.nome;
    req.session.count = 0;
    reqs_total += 1;
    res.redirect('/');
});

app.get('/random', (req, res) => {
    req.session.count += 1;
    if (!req.cookies.random_num) {
        res.cookie('random_num', Math.floor(Math.random() * 1000) + 1);
    }
    res.redirect('/');
})

app.listen(3000, () => {
    console.log("Servidor ligado");
});