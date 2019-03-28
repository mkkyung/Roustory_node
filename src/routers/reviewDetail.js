var express = require('express');
var router = express.Router();
var db = require('./db')();

router.get('/reviewDetailContent/:id', function(request, response) {
    var course_cd = request.params.id;
    console.log('***************************************');
    console.log(request.params.id)
    //var title = request.body.title;
    //var img = request.body.img;
    //var tags = request.body.tags;
    //console.log(title, ' ', body, ' ', tags);
    var sql = ' select rc.course_kind, rcd.course_cd, rc.course_subtitle, course_order, rcd.tour_cd, review_pic, '; 
        sql += ' review_comment, rc.course_nm, rc.write_date, rc.user_cd, rc.event_cd, ';
        sql += ' rt.tour_nm, rt.tour_traffic_bus, rt.tour_traffic_train, rt.tour_price '
        sql += ' from rs_course as rc, rs_course_detail as rcd, rs_tourist as rt ';
        sql += ' where rc.course_cd = rcd.course_cd ';
        sql += ' and rt.tour_cd = rcd.tour_cd '
        sql += ' and  rcd.course_cd = ? ';

    db.query(sql,[course_cd], function(error, results) {
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
            console.log(results);
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