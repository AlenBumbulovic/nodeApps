var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/portfolio'});
var mysql = require('mysql');
var moment = require('moment');
var Enum = require('enum');


var blogCategories = new Enum({
    'Sport': 1,
    'IT': 2,
    'Music': 3,
    'Science': 4,
    'Fashion': 5,
    'Other': 6
});


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alen123',
    database: 'blog',
    multipleStatements: true
});

connection.connect();

router.get('/index', function (req, res, next) {
    connection.query("SELECT * FROM blogentries INNER JOIN blogcategory ON blogentries.blogCategory_id=blogcategory.id; SELECT * FROM blogcategory", function(err, rows, fields){
        if(err) throw err;
        res.render('admin/index',{
            "blogentries": rows[0],
            "blogcategories": rows[1]
        });
    });
});


router.get('/create_post', function (req, res, next) {
    connection.query("SELECT * FROM blogcategory", function (err, rows, fields) {
        if(err) throw err;

        res.render('admin/create_post', {
            "blogcategories": rows
        });
    });
});

router.get('/edit_post/:id', function (req, res, next) {
    connection.query("SELECT * FROM blogentries WHERE id= ?", req.params.id, function (err, rows, fields) {
        if(err) throw  err;
        res.render('admin/edit_post', {
            "blogentry": rows[0]
        });
    });
});


//Update blog post
router.post('/edit_post/:id', upload.single('image'), function (req, res, next) {

       var title = req.body.title;
       var author = req.body.author;
       var blogCategory = req.body.blogCategory;
       var description = req.body.description;
       var date = moment().format('YYYY-MM-DD');
       var image = null

       if(req.file){
           image = req.file.filename;
       }

       req.checkBody('title', 'Title is required').notEmpty();
       req.checkBody('author', 'Author is required').notEmpty();
       req.checkBody('description', 'Description is required').notEmpty();

       var errors = req.validationErrors();

        if(image){
           if(errors){
               res.render('/admin/edit_post', {
                   errors: errors,
                   title: title,
                   author: author,
                   description: description
               });
           }else{
               var post = {
                   title: title,
                   author:author,
                   description: description,
                   image: image,
                   entryDate: date,
                   blogCategory: blogCategory
               }
           }
        }else{
            if(errors){
                res.render('/admin/edit_post', {
                    errors: errors,
                    title: title,
                    author: author,
                    description: description
                });
            }else{
                var post = {
                    title: title,
                    author:author,
                    description: description,
                    entryDate: date,
                    blogCategory: blogCategory
                }
            }
        }

    connection.query('UPDATE blogentries SET ? WHERE id='+req.params.id, post, function (err, result) {
        console.log("Errors: "+err);
        console.log("Success: "+result);
   });
    req.flash('success_msg','Post added');
    res.redirect('index');
});



//creating blog post
router.post('/create_post', upload.single('image'), function (req, res, next) {
        var title = req.body.title;
        var author = req.body.author;
        var description = req.body.description;
        var date = moment().format('YYYY-MM-DD');
        var blogCategory = req.body.blogCategory;

    if (req.file) {
        var image = req.file.filename;
    } else {
        var image = 'noimage.jpg';
    }

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/create_post', {
           errors: errors,
            title: title,
            author: author,
            description: description,
            blogCategory_id: blogCategory
        });
    }else{
        var post = {
            title:title,
            author: author,
            description: description,
            image: image,
            entryDate: date,
            blogCategory_id: blogCategory
        };

    }

    var query = connection.query("INSERT INTO blogentries SET ?",post, function (err, result) {
        console.log("Errors: " +err);
        console.log('Success: '+result);
    });
       req.flash('success_msg','Post added');
       res.redirect('index');
});

//Delete blog post

router.delete('/delete/:id', function(req, res) {
    connection.query('DELETE FROM blogentries WHERE id='+req.params.id, function (err, result) {
        if(err) throw err;
        console.log('deleted ' +result.affectedRows + ' rows');
    });
    req.flash('success_msg', 'Project Deleted');
    res.sendStatus(200);
});


module.exports = router;