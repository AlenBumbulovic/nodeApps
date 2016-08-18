var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/portfolio'});
var mysql = require('mysql');
var helpers = require('handlebars-helpers')();
var Enum = require('enum');




var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alen123',
    database: 'blog',
    multipleStatements: true
});

connection.connect();

// router.get('/', function (req, res, next) {
//     connection.query("SELECT * FROM blogentries", function(err, rows, fields){
//         if(err) throw err;
//         res.render('index',{
//             "blogentries": rows
//         });
//     });
// });

// router.get('/', function (req, res, next) {
//     res.render('login');
// });

router.get('/', function (req, res, next) {
    connection.query("SELECT e.id as id, c.id as cid, e.title as etitle, e.description as edescription, e.author as eauthor, e.image as eimage, e.entryDate as eentryDate, e.blogCategory_id as eblogCategory_id, c.category as ccategory FROM blogentries as e INNER JOIN blogcategory as c ON e.blogCategory_id=c.id", function(err, rows, fields){
        if(err) throw err;
        res.render('index',{
            "blogentries": rows
        });
       // console.log(rows);
    });
});
//post comment
router.get('/comment/:id', function (req, res, next) {
    connection.query("SELECT * FROM blogentries WHERE id= ?", req.params.id, function (err, rows, fields) {
        if(err) throw  err;
        res.render('comment', {
            "blogentry": rows
        });
  //      console.log(rows);
    });
});

//view comments
router.get('/view_comments/:id', function (req, res, next) {
    connection.query("SELECT * FROM blogentries WHERE id= ?; SELECT * FROM comments WHERE blogentry_id= ?", [req.params.id, req.params.id], function (err, rows, fields) {
        if(err) throw  err;
        res.render('view_comments',{
           "blogentry": rows[0],
            "comments": rows[1]
        });
    });
});

//posting a comment
router.post('/comment/:id',  function (req, res, next) {
    var comment_author = req.body.comment_author;
    var comment = req.body.comment;
    var blogentry_id = req.params.id;
    console.log(blogentry_id);
    console.log(req.params.id)

    req.checkBody('comment_author', 'Author is required').notEmpty();
    req.checkBody('comment', 'Author is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('comment', {
            errors: errors,
            comment_author: comment_author,
            comment: comment
        });
    }else{
        var comment1 = {
            comment_author:comment_author,
            comment: comment,
            blogentry_id: blogentry_id
        };
    }

    var query = connection.query("INSERT INTO comments SET ?",comment1, function (err, result) {
        console.log("Errors: " +err);
        console.log('Success: '+result);
    });
    req.flash('success_msg','Comment added');
    res.redirect('/');
});

//view blogs by categories
router.get('/categories/:id', function (req, res, next) {
    connection.query("SELECT * FROM blogentries WHERE blogcategory_id= ?", req.params.id, function (err, rows, details) {
        if(err) throw err;
        res.render('categories', {
            "blogentries": rows
        });
    });
});


module.exports = router;