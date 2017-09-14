/**
 *  연결되는 Device들의 스키마를 정의하는 모듈
 *  기기명, IP ADDRESS, MAC ADDRESS 등 포함
 */

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var DeviceSchema = mongoose.Schema({
	    name: {type: String, trim: true, 'default':''},             //저장된 이름
	    device_type: {type: String, trim: true, 'default':''},		       //기기 이름(기기 종류)
//	    mac: {type: String, trim: true, 'default':''},		       //기기 이름(기기 종류)
	    device_ip: {type: String, trim:true, 'default':''},		   //유저 이름
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
//	DeviceSchema.path('device_name').required(true, '디바이스명 을 입력하셔야 합니다.');

    DeviceSchema.methods = {
        savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		}    
    };
    
    DeviceSchema.statics = {
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
    console.log('DeviceSchema 정의함.');

	return DeviceSchema;
};

// module.exports에 DeviceSchema 객체 직접 할당
module.exports = SchemaObj;