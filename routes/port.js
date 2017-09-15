/*
 * 디바이스 정보 저장 및 조회를 위한 라우팅 함수 정의
 */

// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

//추가 및 삭제
var add_ban_port = function(req, res) {
	console.log('ban port 모듈 안에 있는 add_ban_port 호출됨.');

    var paramRuleName = req.body.rulename || req.query.rule_name;
    var paramBanPort = req.body.port || req.query.port;
	var paramAdd = req.body.add;
	var paramDelete = req.body.delete;
    
    console.log('요청 파라미터 : ' + paramRuleName + ', ' + paramBanPort);
    
	var database = req.app.get('database');

    console.log('ban port 등록 진행중');
	if (database.db) {

	// 1. 아이디를 이용해 사용자 검색
		database.UserModel.findById("test", function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }

			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramDeviceIp + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
//			console.log('사용자 ObjectId : ' + paramDeviceIp +' -> ' + userObjectId);
			
			// save()로 저장
			// PostModel 인스턴스 생성
			var ports = new database.PortBanModel({
                rule_name: paramRuleName,
				port: paramBanPort
			});

//            console.log(ports);
            
            //등록하기 버튼을 눌렀을 시
            if(paramAdd == 1){
                console.log("results]"+results);
                ports.savePost(function(err, results) {
                    if (err) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
                    }

                    console.log("PORT BAN DATA ADD COMPLETE.");

                    return res.redirect('/process/list_ban_port'); 
                });
            }
            
            //삭제하기 버튼을 눌렀을 시
                var num = req.body.check;
                console.log(num);
            
            if(paramDelete == 1){

                ports.deletePost(num, function(err, results) {
                    if (err) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
                    }

                    console.log("PORT BAN DATA DELETE COMPLETE");

                    return res.redirect('/process/list_ban_port'); 
                });
            }
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var list_ban_port = function(req, res) {
	console.log('port 모듈 안에 있는 list_port_ban 호출됨.');
  
    var paramPage = "";
    var paramPerPage = "";
	    
	var database = req.app.get('database');
	console.log('port 로딩 진행중');
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        
		database.PortBanModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
//				console.dir(results);
 
				// 전체 문서 객체 수 확인
				database.PortBanModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송

					var context = {
                        result: results
					};
                    
//                    console.log(results);
                    
					req.app.render('nw_port', context, function(err, html) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
                        
						res.end(html);
					});
					
				});
				
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

module.exports.add_ban_port = add_ban_port;
module.exports.list_ban_port = list_ban_port;