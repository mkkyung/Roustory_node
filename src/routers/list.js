var express = require('express');
var router = express.Router();
var db = require('./db')();

router.post('/posts', function(request, response) {
    console.log('request : ', request.body)
    var title = request.body.title;
    var body = request.body.body;
    var tags = request.body.tags;
    console.log(title, ' ', body, ' ', tags);
    var sql = 'insert into t_board(title, content, writer) values(?, ?, ?)';
      
    db.query(sql,[title, body, tags], function(error, results) {
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
    console.log('request444444 : ');
    console.log('param : ', request);

    var sql = 'SELECT * FROM t_board limit 10';
      
    db.query(sql, function(error, results) {
        if(error){
            //console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            //console.log(results);
            response.send(results);
        }
    });
});
module.exports = router;