var express = require('express');
var router = express.Router();
var db = require('./db')();

router.get('/tourist', function(request, response) {
    var sql = 'select * from rs_tourist';
    db.query(sql, function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            console.log(results);
            response.send(results);
        } 
    });
});

module.exports = router;