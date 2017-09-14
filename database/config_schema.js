/**
 * 간단한 설정들이 저장되는 스키마
 */

// module.exports에 ConfigSchema 객체 직접 할당

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var ConfigSchema = mongoose.Schema({
	    limit_user: {type: Boolean, trim: true, 'default':''},            //사용설정 - 사용인원 제한
	    syn_flood: {type: Boolean, trim: true, 'default':''},             //보안설정 - SYN Flood 사용 설정
	    slide_sec: {type: String, trim: true, 'default':''},             //디지털 액자 - 슬라이드 설정
	    slide_save: {type: String, trim: true, 'default':''},            //디지털 액자 - 절전 설정
	});
	
	// 필수 속성에 대한 'required' validation
	//DeviceSchema.path('device_name').required(true, '디바이스명 을 입력하셔야 합니다.');

    console.log('ConfigSchema 정의함.');

	return ConfigSchema;
};

// module.exports에 DeviceSchema 객체 직접 할당
module.exports = SchemaObj;