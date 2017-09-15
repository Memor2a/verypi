/**
 * 간단한 설정들이 저장되는 스키마
 */

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var PortBanSchema = mongoose.Schema({
	    rule_name: {type: String, trim: true, 'default':''},             //규칙 이름
        port: {type: String, trim: true, 'default':''},                  //Ban Port 번호
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation


    PortBanSchema.methods = {
        savePost: function(callback) {		// 글 저장
			var self = this;
			this.validate(function(err) {
				if (err) return callback(err);
				
                console.log("call"+callback);
				self.save(callback);
			});
		},
        deletePost2: function(num, callback) {		// 글 삭제

            return;            
		},
        
        deletePost: function(num, callback) {		// 댓글 삭제
			
            return;
			this.save(callback);
		}
    };
    
    PortBanSchema.statics = {
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
//				.limit(Number(options.perPage))
//				.skip(options.perPage * options.page)
				.exec(callback);
		}
	}
    
    console.log('PortBanSchema 정의함.');

	return PortBanSchema;
};

// module.exports에 PortBanSchema 객체 직접 할당
module.exports = SchemaObj;