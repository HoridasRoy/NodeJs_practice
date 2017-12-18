var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, req, next){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next){

  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  res.redirect('/');

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('user-data').insertOne(item,function(err, resulr){
      assert.equal(null, err);
      console.log('Data inserted');
      db.close();
    });
  });
});

router.post('/update', function(req, res, next){

});

router.post('/delete', function(req, res, next){

});

module.exports = router;
