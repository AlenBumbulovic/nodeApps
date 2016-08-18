var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/people', function(req, res){
    var people = [
        {
            first_name: "John",
            last_name: "Doe",
            age: "34",
            gender: "male"
        },
        {
            first_name: "Tom",
            last_name: "Jackson",
            age: "27",
            gender: "male"
        },
        {
            first_name: "Tracy",
            last_name: "smith",
            age: "25",
            gender: "female"
        }
    ];

    res.json(people);
});

app.get('/download', function(req, res){
    res.download(path.join(__dirname, '/downloads/pdf.pdf'));
});

app.get('/about', function(req, res){
    res.redirect('/about.html');
});

app.post('/subscribe', function(req, res){
    var name = req.body.name;
    var email = req.body.email;

    console.log(name + ' has subscribed with ' + email);
});

app.listen(3000, function() {
    console.log('Server started on port 3000');    
});