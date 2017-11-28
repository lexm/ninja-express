const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const port = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'NotSoSecret' }));
app.use(express.static(path.join(__dirname, '/static')));
app.set('views'.__dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(!req.session.gold) {
        req.session.gold = 0;
        req.session.change = 0;
    }
    if(!res.session.record) {
        req.session.record = [];
    }
    if()
    let info = {
        "gold": req.session.gold,
        "record": req.session.record,
    }
    res.render('index', info);
    res.end();
});

app.post('process_money', function(req, res) {
    if(req.body.choice === 'farm') {
        change = Math.floor((Math.random() * 10) + 10);
        req.session.gold += change;
    } else if (req.body.choice === 'farm') {
        change = Math.floor((Math.random() * 5) + 5);
        req.session.gold += change;    
    } else if (req.body.choice === 'farm') {
        change = Math.floor((Math.random() * 3) + 2);
        req.session.gold += change;
    } else if (req.body.choice === 'farm') {
        change = Math.floor((Math.random() * 101) - 50);
        req.session.gold += change;
    };
    let newrec = {
        "choice": req.session.choice,
        "change": change,
        "time": 
    }
})