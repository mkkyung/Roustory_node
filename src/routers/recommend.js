var express = require('express');
var router = express.Router();
var db = require('./db')();

router.get('/recommendlist', function(request, response) {
    console.log('request111 : ', request.body)
    //var title = request.body.title;
    //var img = request.body.img;
    //var tags = request.body.tags;
    //console.log(title, ' ', body, ' ', tags);
    var sql = 'select course_cd, course_nm, event_cd, img from rs_course where course_kind=1 limit 8'; 
      
    db.query(sql,[], function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            //console.log(results);
            response.send(results);
        }
    });
});

router.get('/recommendSelectList', function(request, response) {
    console.log('request111 : ', request.body)
    //var title = request.body.title;
    //var img = request.body.img;
    //var tags = request.body.tags;
    //console.log(title, ' ', body, ' ', tags);
    var sql = 'select event_cd, event_nm from rs_history_event'; 
      
    db.query(sql,[], function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            //console.log(results);
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
            //console.log(results);
            response.send(results);
        }
    });
});

router.get('/posts', function(request, response) {
    console.log('request33333333 : ')

    var sql = 'SELECT * FROM t_board limit 10';
      
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