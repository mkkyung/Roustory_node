var express = require('express');
var router = express.Router();
var db = require('./db')();

router.post('/reviewlist', function(request, response) {
    var order = request.body.order;
    console.log(order);
    var sql = 'select c.course_cd, c.course_nm, c.write_date, c.user_cd, u.user_id, u.user_profile, cd.review_pic ';
        sql += 'from rs_course as c, rs_user as u, rs_course_detail as cd ';
        sql += 'where c.user_cd = u.user_cd ';
        sql += 'and c.course_cd = cd.course_cd ';
        if(order != null && order != 'all'){
            sql += ' and event_cd = ? '
        }else{
        
        }
        sql += 'and c.course_kind = 2 ' //1 : 추천코스 / 2 : 후기
        sql += 'group by c.course_cd ';

    db.query(sql,[order], function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{  
            response.send(results);
        }
    });
});

router.post('/eventlist', function(request, response) {
    var sql = 'select * from rs_history_event';
    db.query(sql, function(error, results) {
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