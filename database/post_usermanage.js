/**
 * 게시판을 위한 데이터베이스 스키마를 정의하는 모듈
 */

var utils = require('../utils/utils');

var SchemaUserManage = {};

SchemaUserManage.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var PostSchema = mongoose.Schema({
	    username: {type: String, trim: true, 'default':''},		
	    device: {type: String, trim:true, 'default':''},				
	    ipaddress: {type: String, trim:true, 'default':''},				
	    tags: {type: [], 'default': ''}
    });
	
	// 필수 속성에 대한 'required' validation
	PostSchema.path('username').required(true, '제목을 입력하셔야 합니다.');
	PostSchema.path('device').required(true, '내용을 입력하셔야 합니다.');
	PostSchema.path('ipaddress').required(true, '내용을 입력하셔야 합니다.');
	
	// 스키마에 인스턴스 메소드 추가
	PostSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		removePost: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.comments, {id: id});
			if (~index) {
				this.comments.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			
			this.save(callback);
		}
	}
	
	console.log('PostSchema 정의함.');

	return PostSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaUserManage;

