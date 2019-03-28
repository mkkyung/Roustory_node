var mysql = require("mysql");
    var mydb = mysql.createConnection({
        user : "RouStory",
        password : "roustory18",
        database : "darktourism",
        host : "roustory.cuypxmxh5shc.ap-northeast-2.rds.amazonaws.com",
        port : "3306",
        multipleStatements:true    //여러개의 구문을 실행하는 조건
    });

module.exports = function(){  
    
   
    return mydb;
}; 

/* 
var mydb = mysql.createConnection({
    user : "root",
    password : "hrhr",
    database : "darktourism",
    host : "localhost",
    port : "3306",
    multipleStatements:true    //여러개의 구문을 실행하는 조건
}); */ 



