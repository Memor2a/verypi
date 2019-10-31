/*
 * 디바이스 정보 저장 및 조회를 위한 라우팅 함수 정의
 */

// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var add_user_device = function(req, res) {
	console.log('device 모듈 안에 있는 add_user_device 호출됨.');
 
    var paramUserName = req.body.username || req.query.name;
    var paramDeviceType = req.body.devicetype || req.query.device_ip;
    var paramDeviceIp = req.body.deviceip || req.query.device_type;
	
    console.log('요청 파라미터 : ' + paramUserName + ', ' + paramDeviceType);
    
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
				res.write('<h2>사용자 [' + paramDeviceIp + ']를 찾을 수 없습니다.</h2>');
				res.end();
				
				return;
			}
			
			var userObjectId = results[0]._doc._id;
//			console.log('사용자 ObjectId : ' + paramDeviceIp +' -> ' + userObjectId);
			
			// save()로 저장
			// PostModel 인스턴스 생성
			var add_device = new database.DeviceModel({
                name: paramUserName,
				device_type: paramDeviceType,
				device_ip: paramDeviceIp
			});

            console.log(add_device);
        
			add_device.savePost(function(err, results) {
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
			    
			    return res.redirect('/process/list_reg_device'); 
			});
			
		});
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var list_reg_device = function(req, res) {
	console.log('device 모듈 안에 있는 list_device 호출됨.');
  
    var paramPage = "";
    var paramPerPage = "";
	    
	var database = req.app.get('database');
	console.log('device 로딩 진행중');
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        
		database.DeviceModel.list(options, function(err, results) {
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
				database.DeviceModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

                    // 사용자 관리
                    var exec = require('child_process').exec,
                        child;

                    child = exec("echo echo return value", function (error, stdout, stderr) {
            //            console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr); 
                        if (error !== null){
                            console.log('exec error: ' + error);
                        }         
                        
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송

                        var context = {
                            result: results,
                            connected: stdout
                        };

                        req.app.render('use_usermanage', context, function(err, html) {
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

var delete_reg_device = function(req, res){
    console.log("test");
};

module.exports.add_user_device = add_user_device;
module.exports.list_reg_device = list_reg_device;
module.exports.delete_reg_device = delete_reg_device;