var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', {title: 'Contact'});
});

router.post('/send', function(req, res){
    // create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user: 'alen.bumbulovic@gmail.com',
        pass: 'kmica123'
        }
    });
var mailOptions = {
    from: '"Alen Gogo 👥" <alen.bumbulovic@gmail.com>', // sender address
    to: 'alen.bumbulovic@live.com',  // list of receivers
    subject: 'Website submission ✔', // Subject line
    text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + 
    req.body.message, // plaintext body
    html: '<p>You have a submission with the following details...</p><ul><li> Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + 
    req.body.message + '</li></ul>' // html body
};


transporter.sendMail(mailOptions, function(error, info){
    if(error){
        res.redirect('/');
        return console.log(error);
        
    }
    console.log('Message sent: ' + info.response);
    res.redirect('/');
});

});

module.exports = router;