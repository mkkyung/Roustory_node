var express = require('express');
var router = express.Router();
var db = require('./db')();

router.get('/test', function(request, response) {
    console.log('test : ', request.body);
});

//login
// router.use('/', )
// router.get('/posts', function(req, res, next){
//     res.render('login', { title:'login'});
// });

// router.post('/posts', function(request, response){
//     console.log(request.body);

//     var id=request.User_id;
//     var pwd=request.User_pwd;

//     res.redirect('/');

//     let isRight = false;
//     if(rs_user.User_id === request.body.username && rs_user.User_pwd === request.body.password){
//         isRight=true;
//     }
//     if(isRight){
//         request.session.User_id = rs_user.username;
//     }else{
//         response.status(401).redirect('/posts');
//     }
//     response.redirect(301, 'posts');    //상태 코드를 달리
// });


router.post('/posts', function(request, response) {
    var User_id = request.body.User_id;
    var password = request.body.password;

    var sql = 'select * from rs_user where User_id = ? and User_pwd = ?';
      
    db.query(sql,[User_id, password], function(error, results) {
        if(error){
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{
            if(results.length < 1){
                response.send({isLogin:false})
            }else{
                request.session.userInfo = results[0].User_id;
                request.session.save(function() {
                    response.send({isLogin:true, user_id: results[0].User_id});
                });
            }
        }
    });
});

router.get('/posts/check/email', function(request, response) {
    console.log('request2: ', request.body)
    var sql = 'select * from rs_user';
      
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

router.get('/posts/check/username', function(request, response) {
    var sql = 'select * from rs_user';
      
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

router.post('/posts/facebookLogin', function(request, response) {
    var name = request.body.name;
    console.log(name);
    var sql = 'insert into rs_user (User_id) values (?)';
      
    db.query(sql, [name], function(error, results) {
        if(error) {
            console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        } else {
            console.log(results);
        }
    });
});

router.post('/posts/logout', function(request, response) {
    const { userInfo } = request.session;
    if(userInfo) {
        request.session.destroy(function() {
            response.send({ 'logout': true });
        });
    }
});

// router.route('/posts/logout').get(
//     function(req, res){
//         console.log('logout 함수호출');

//         if(req.session.user){
//             console.log('logout');
//             req.session.destroy(
//                 function(err){
//                     if(err){
//                         console.log('세션 삭제 실패');
//                         return;
//                     }
//                     console.log('세션 삭제 성공');
//                     res.redirect('/');
//                 }
//             );
//         }else{
//             console.log('로그인 안됨');
//             res.redirect('/');
//         }
//     }
// );

router.post('/posts/register', function(request, response) {
    // console.log(request.body);
    var email = request.body.email;
    var username = request.body.username;
    var password = request.body.password;
    // var passwordConfirm = request.body.passwordConfirm;

    console.log(email, username, password);
    var sql = 'insert into rs_user (User_email, User_id, User_pwd) values (?, ?, ?)';
      
    db.query(sql,[email, username, password], function(error, results) {
        if(error){
            // console.log(error);
            console.log('쿼리 문장에 오류가 있음');
        }else{
            console.log(results);
            if(results.length < 1){
                response.send({isLogin:false})
            } else{
                response.send({isLogin:true})
            }
        }
    });
});

module.exports = router;