/**
 * Created by tonyjiang on 15/4/24.
 */

require("./_Extends");
var _WidgetBase = require("./_WidgetBase");

var MongoCRUD = function(){

};

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

console.log(extend);

var url = "mongodb://test:test@localhost:27017/test";

MongoClient.connect(url , function(err , db){
    assert.equal(null , err);


    var collection = db.collection('user');

    collection.find({}).toArray(function(err , docs){
        assert.equal(err, null);
        //assert.equal(2, docs.length);
        console.log(docs);
    });

    //db.close();
});


//var mongodb = require("mongodb");
//
//var server = new mongodb.Server("127.0.0.1" , 27017);
//
//new mongodb.Db('test' , server , {}).open(function(error , client){
//    if(error){
//        console.log(error);
//    }
//
//    var collection = new mongodb.Collection(client , "user");
//
//    collection.find(function(error , cursor){
//        cursor.each(function(error , doc){
//            if(doc){
//                console.log(doc);
//            }
//        });
//    });
//});