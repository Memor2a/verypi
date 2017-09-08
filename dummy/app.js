//기본 모듈
var express = require('express');
var http = require('http');
var path = require('path');

//express의 middleware 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

//에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session Middleware
var expressSession = require('express-session');

//express 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

//body-parser를 사용해 ㅏ싱
app.use(bodyParser.urlencoded({ extended: false }));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

//middleware에서 피라미터 확인
app.use(function(req, res, next){
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
//    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
//    res.write('<div>'+paramId+'</div>');
//    res.write('<div>'+paramPassword+'</div>');
//    res.end();
     
    res.redirect("/index.html");
})

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});