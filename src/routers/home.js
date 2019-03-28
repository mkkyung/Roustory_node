var express = require('express');
var router = express.Router();
var db = require('./db')();

router.post('/home', function(request, response) {
    var sql = 'select * from rs_history_event';
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

router.get('/posts/:id', function(request, response) {
    console.log('request22 : ', request.params.id)
    var id = request.params.id;

    var sql = 'SELECT * FROM t_board where no = ?';
      
    db.query(sql, [id], function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            console.log(results);
            response.send(results);
        }
    });
});

router.get('/posts', function(request, response) {
    console.log('request33333333 : ')

    var sql = 'SELECT * FROM t_board limit 3';
      
    db.query(sql, function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            //console.log(results[0].title);
            console.log(results);
            response.send(results);
        }
    });
});
module.exports = router;