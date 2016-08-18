var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('clientkeeper', ['clients']);


//set static folder(client folder)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/clients', function(req, res) {
    console.log('Request for clients recived....');

    db.clients.find().sort({first_name: 1},function(err, docs){
        if(err){
            res.send(err);
        }else{
            console.log('sending data....');

            res.json(docs);
        }
    });
});

app.post('/clients', function(req, res){
    db.clients.insert(req.body, function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('client added');

            res.json(doc);
        }
    });
});

app.get('/clients/:id', function(req, res){
    var id = req.params.id;
   
   db.clients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        if(err){
            res.send(err);
        }else{
            res.json(doc);
        }
   });
});


app.put('/clients/:id', function(req, res) {
    var id = req.params.id;

    db.clients.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone
            }},
            new: true    
            }, function(err, doc){
                res.json(doc);
            });
});


app.delete('/clients/:id', function(req, res){
    var id = req.params.id;
    db.clients.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
            if(err){
                res.send(err);
            }else{
                console.log('client removed');
                res.json(doc);
            }
    });
});


app.listen(3000);
console.log('ready on port 3000');