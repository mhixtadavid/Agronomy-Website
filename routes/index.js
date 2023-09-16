var express         = require("express"),
    router          = express.Router(),
    nodemailer      = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/about-us', (req, res) => {
    res.render('about')
});

router.get('/services', (req, res) => {
    res.render('services')
});

router.get('/FAQs', (req, res) => {
    res.render('faqs')
});

router.get('/contact-us', (req, res) => {
    res.render('contact')
});

router.get('/Gallery', function(req, res){
    res.render('gallery')
})

router.post("/contact-us", function(req, res){
    var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 587, false for other ports
            requireTLS: true,
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD, 
            },
        });
    
    
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: process.env.R_EMAIL, // list of receivers
        subject: req.body.subject, // Subject line
        //text: req.body.message, // plaintext body
        html: req.body.message + ", - " + req.body.name + ", " + req.body.email  // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
      req.flash("success", "Message sent successfully! You'll receive a reply shortly");
      res.redirect("/contact-us");
    });


module.exports = router;