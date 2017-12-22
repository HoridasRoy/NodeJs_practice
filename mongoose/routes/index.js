var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var schema = mongoose.Schema;


var userdataSchema = new schema({

  title:{type: String, required:true},
  content:String,
  author:String
},{collection:'userdata'});

var userdata = mongoose.model('userdata',userdataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){

  userdata.find()
    .then(function(doc){
      res.render('index',{items: doc});
    });
});

router.post('/insert', function(req, res, next){

  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new userdata(item);
  data.save();
  res.redirect('/');


});

router.post('/update', function(req, res, next){


  var id = req.body.id;

  userdata.findById(id, function(err, doc){


    if(err){
      console.error('Error, no entry..');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();

  });

  res.redirect('/');


});

router.post('/delete', function(req, res, next){


  var id = req.body.id;

  userdata.findByIdAndRemove(id).exec();
  res.redirect('/');


});

module.exports = router;
