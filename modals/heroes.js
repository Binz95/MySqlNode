var express = require('express');
var fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;   
 
const contact = new Schema({
   name: String,
   phoneNo: String    
});

const MyModel = mongoose.model('contact', contact);
let Heroes={}

// get all heroes from the database

Heroes.getAll = function(){
  return new Promise (function(resolve, reject){

    //create the connection to database

    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);
    MyModel.find({},function(err,contact){
       
      if (err) {
        console.log(err);
        console.log('ERR :: fetching data from database.');
        reject();
      }
      else {
        console.log (contact);
        resolve(contact);
      }
    });
});
}

Heroes.updateData = function(updateData){
    return new Promise (function(resolve,reject){

        //create the connection to database

        const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log (connection);
        MyModel.findOneAndUpdate({_id: `${updateData._id}`}, { name: `${updateData.name}` , phoneNo: `${updateData.phoneNo}`}, function(err, con) {
          if (err) {
                console.log(err);
                console.log('ERR :: fetching data from database..');
                reject();
            }
            else {
                //console.log(result);
                console.log('con.......'+ con);
                resolve(con);

            }
        });
});        
    
}

Heroes.saveData = function(newContact){
    return new Promise (function(resolve,reject){
    
        const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log(connection);
        var newCont = new MyModel({
            name: `${newContact.name}`,
            phoneNo: `${newContact.phoneNo}`
        });
        newCont.save({},function(err,contact){
            if (err) {
                console.log(err);
                console.log('ERR :: Saving data into database..');
                reject();
            }
            else {
                console.log(contact);
                resolve(contact);
            }
        });
    });
}

Heroes.deleteRow = function(delContData){
    return new Promise(function(resolve,reject){
        const connection =mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log(connection);
        MyModel.findOneAndRemove({name : `${delContData.name}`}, function(err){
            if (err) {
                console.log(err);
                console.log('ERR :: fetching data from database.');
                reject();
            }
            else {      
                console.log(contact);
                resolve(contact);
            }   
        });
    });  
}

Heroes.viewData = function(viewData){
    return new Promise (function(resolve, reject){

    //create the connection to database

    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);
    MyModel.find({_id : `${viewData._id}`},function(err,contact){
       
        if (err) {
            console.log(err);
            console.log('ERR :: fetching data from database.');
            reject();
        }
        else {
            console.log (contact);
            resolve(contact);
        }
    });
});
}


module.exports = Heroes