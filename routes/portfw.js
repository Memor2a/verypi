/*
 * 디바이스 정보 저장 및 조회를 위한 라우팅 함수 정의
 */

// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var add_portfw_rule = function(req, res) {
	console.log('portfw 모듈 안에 있는 add_portfw_rule 호출됨.');
 
    var paramRuleName = req.body.rulename || req.query.rule_name;
    var paramInnerPort = req.body.innerport || req.query.inner_port;
    var paramOuterPort = req.body.innerport || req.query.outer_port;
	
    console.log('요청 파라미터 : ' + paramRuleName + ', ' + paramInnerPort);
    
	var database = req.app.get('database');
	console.log('유저 등록 등록 진행중');
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
				res.write('<h2>사용자 [' + paramOuterPort + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
//			console.log('사용자 ObjectId : ' + paramOuterPort +' -> ' + userObjectId);
			
			// save()로 저장
			// PostModel 인스턴스 생성
			var add_portfw = new database.PortFwModel({
                rule_name: paramRuleName,
				inner_port: paramInnerPort,
				outer_port: paramOuterPort
			});

            console.log(add_portfw);
        
			add_portfw.savePost(function(err, results) {
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
				
			    console.log("글 데이터 추가함.");
			    console.log('글 작성', '포스팅 글을 생성했습니다. : ');
			    
			    return res.redirect('/process/list_portfw_rule'); 
			});
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var list_portfw_rule = function(req, res) {
	console.log('portfw - list_portfw_rule 호출됨.');
  
    var paramPage = "";
    var paramPerPage = "";
	    
	var database = req.app.get('database');
	console.log('port forwarding list 로딩 진행중');
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        
		database.PortFwModel.list(options, function(err, results) {
            console.log("test");
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
				database.PortFwModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송

					var context = {
                        result: results
					};
                    
					req.app.render('nw_portfw', context, function(err, html) {
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

var delete_portfw_rule = function(req, res){
    console.log("test");
};

module.exports.add_portfw_rule = add_portfw_rule;
module.exports.list_portfw_rule = list_portfw_rule;
module.exports.delete_portfw_rule = delete_portfw_rule;