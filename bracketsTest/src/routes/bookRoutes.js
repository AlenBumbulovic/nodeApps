var expres = require('express');

var bookRouter = expres.Router();

var router = function(nav){
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

    bookRouter.route('/')
            .get(function(req, res){
                res.render('bookListView',{title: 'Books!',nav: nav,
                                   books: books
                                   });
    });

    bookRouter.route('/:id')
            .get(function(req, res){
                var id= req.params.id;
                res.render('bookView',{title: 'Books!',nav: nav,
                                   book: books[id]
                                   });
    });
    
    return bookRouter;
}



module.exports = router;