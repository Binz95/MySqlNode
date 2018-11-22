var express = require('express');
var JSONData = require('./heroes.json');
var fs = require("fs");
var mysql =require('mysql2');   
let Heroes= {}
Heroes.getAll = function(){
  return new Promise (function (resolve , reject){
    // create the connection to database
   const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccs#1234',
    database: 'heros'
   });
   let query='select * from comic where is_valid =1';
   connection.query(query,function(err,result,fields){
   	if (err) {
   		console.log(err);
   		console.log('ERR :: fetching data from database.');
      reject();
   	}
   	else {
   		//console.log(result);
   		//console.log(fields);
   	  resolve(result);
   	}
   });
  }); 
}
Heroes.saveNew = function(newHeroData){
  return new Promise(function(resolve,reject){
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccs#1234',
    database: 'heros'
   });
   let query=`insert into comic(superhero,publisher,alter_ego,first_app,characters,is_valid,update_time) values('${newHeroData.superhero}','${newHeroData.publisher}','${newHeroData.alter_ego}','${newHeroData.first_app}','${newHeroData.characters}',1,'${new Date()}')`;
   connection.query(query,function(err,result,fields){
    if (err) {
      console.log(err);
      console.log('ERR :: fetching data from database.');
      reject();
    }
    else {
      //console.log(result);
      //console.log(fields);
      resolve(result);
    }
   });
  });  
}  
Heroes.deleteRow = function(newHeroData){
  return new Promise(function(resolve,reject){
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccs#1234',
    database: 'heros'
   });
   let query=`update comic set is_valid =0 where id= '${newHeroData.id}'`;
    connection.query(query,function(err,result,fields){
    if (err) {
      console.log(err);
      console.log('ERR :: fetching data from database.');
      reject();
    }
    else {
      //console.log(result);
      //console.log(fields);
      resolve(result);
    }
   });
  });  
}  
Heroes.viewRow = function(newHeroData){
  return new Promise(function(resolve,reject){
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ccs#1234',
    database: 'heros'
   });
   let query=`select * from comic where id= '${newHeroData.id}'`;
    connection.query(query,function(err,result,fields){
    if (err) {
      console.log(err);
      console.log('ERR :: fetching data from database.');
      reject();
    }
    else {
      //console.log(result);
      //console.log(fields);
      resolve(result);
    }
   });
  });  
}  

module.exports = Heroes;