var expres = require('express');
var adminRouter = expres.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
             title: 'Title1',
             genre: 'Genre1',
             author: 'author1',
             read: 'false'
            },
            {
             title: 'Title2',
             genre: 'Genre2',
             author: 'author2',
             read: false
            },
             {
             title: 'Title3',
             genre: 'Genre3',
             author: 'author3',
             read: true
            },
             {
             title: 'Title4',
             genre: 'Genre4',
             author: 'author4',
             read: true
            }
            ];

var router = function(nav){
    
    adminRouter.route('/addBooks')
         .get(function(req, res){
            var url = 'mongodb://localhost:27017/libraryApp';
        
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    res.send(results);
                    db.close();  
                });
                 
            });
          //  res.send('inserting books!'); 
    });
    
    return adminRouter;
};

module.exports = router;
