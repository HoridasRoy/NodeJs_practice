var express = require('express');
var router = express.Router();
//var mongo = require('mongodb').MongoClient();
var db = require('monk')('localhost:27017/test')
userdata = db.get('userdata')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){

  var data = userdata.find({});
  data.on('success', function(docs){
    res.render('/index', {item:docs});
  });

});

router.post('/insert', function(req, res, next){

  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  userdata.insert(item);

  res.redirect('/');


});

router.post('/update', function(req, res, next){


  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  userdata.updateById(id,item);



});

router.post('/delete', function(req, res, next){


  var id = req.body.id;

  userdata.removeById(id);



});

module.exports = router;
