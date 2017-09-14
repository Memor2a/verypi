/**
 * 간단한 설정들이 저장되는 스키마
 */

// module.exports에 ConfigSchema 객체 직접 할당

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var MacSchema = mongoose.Schema({
	    config1: {type: Boolean, trim: true, 'default':''},             //저장된 이름
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	//DeviceSchema.path('device_name').required(true, '디바이스명 을 입력하셔야 합니다.');

    console.log('MacSchema 정의함.');

	return MacSchema;
};

// module.exports에 DeviceSchema 객체 직접 할당
module.exports = SchemaObj;