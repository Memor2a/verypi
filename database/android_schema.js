/**
 * 안드로이드 스키캄
 */

// module.exports에 AndroidSchema 객체 직접 할당

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
    var AndroidSchema = new Schema(
        {token : String},
        {collection: 'androidToken'}
    );

    // 필수 속성에 대한 'required' validation
	//DeviceSchema.path('device_name').required(true, '디바이스명 을 입력하셔야 합니다.');
    
    console.log('AndroidSchema 정의함.');

	return AndroidSchema;
};

// module.exports에 DeviceSchema 객체 직접 할당
module.exports = AndroidSchema;
