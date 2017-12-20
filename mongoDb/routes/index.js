var express = require('express');
var router = express.Router();
//var mongo = require('mongodb').MongoClient();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('userdata').find();
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
    db.collection('userdata').insertOne(item,function(err, resulr){
      assert.equal(null, err);
      console.log('Data inserted');
      db.close();
    });
  });
});

router.post('/update', function(req, res, next){


  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };


  var id = req.body.id;


  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('userdata').updateOne({"_id": objectId(id)},{$set: item},function(err, resulr){
      assert.equal(null, err);
      console.log('Data Updated..');
      db.close();
    });
  });

});

router.post('/delete', function(req, res, next){


  var id = req.body.id;


  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('userdata').deleteOne({"_id": objectId(id)},function(err, resulr){
      assert.equal(null, err);
      console.log('Data Updated..');
      db.close();
    });
  });


});

module.exports = router;
