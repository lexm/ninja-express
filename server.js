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
    };
    if(!req.session.record) {
        req.session.record = [];
    };
    let info = {
        "gold": req.session.gold,
        "record": req.session.record,
    };
    console.log(info);
    res.render('index', info);
    res.end();
});

app.post('/process_money', function(req, res) {
    req.session.choice = req.body.choice;
    if(req.body.choice === 'farm') {
        change = Math.floor((Math.random() * 10) + 10);
        req.session.gold += change;;
    } else if (req.body.choice === 'cave') {
        change = Math.floor((Math.random() * 5) + 5);
        req.session.gold += change;    
    } else if (req.body.choice === 'house') {
        change = Math.floor((Math.random() * 3) + 2);
        req.session.gold += change;
    } else if (req.body.choice === 'casino') {
        change = Math.floor((Math.random() * 101) - 50);
        req.session.gold += change;
    };
    let newrec = {
        "choice": req.session.choice,
        "change": change,
        "time": new Date()
    };
    console.log(newrec);
    req.session.record.push(newrec);
    res.redirect('/');
});

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});