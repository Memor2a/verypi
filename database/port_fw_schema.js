/**
 * 간단한 설정들이 저장되는 스키마
 */

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var PortFwSchema = mongoose.Schema({
	    rule_name: {type: String, trim: true, 'default':''},             //저장된 이름
        inner_port: {type: String, trim: true, 'default':''},
        outer_port: {type: String, trim: true, 'default':''},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	//DeviceSchema.path('device_name').required(true, '디바이스명 을 입력하셔야 합니다.');

    PortFwSchema.methods = {
        savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		}    
    };
    
    PortFwSchema.statics = {
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
    
    console.log('PortFwSchema 정의함.');

	return PortFwSchema;
};

// module.exports에 PortFwSchema 객체 직접 할당
module.exports = SchemaObj;