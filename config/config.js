/*
 * DB 및 route 설정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
        {file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'}
        ,{file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
        ,{file:'./device_schema', collection:'devices', schemaName:'DeviceSchema', modelName:'DeviceModel'}
        ,{file:'./config_schema', collection:'config', schemaName:'ConfigSchema', modelName:'ConfigModel'}
        ,{file:'./ip_address_schema', collection:'banip', schemaName:'IpSchema', modelName:'IpModel'}
        ,{file:'./mac_address_schema', collection:'mac', schemaName:'MacSchema', modelName:'MacModel'}
	],
	route_info: [
        //NOTICE
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'}
        ,{file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
        
        //PORT BAN
        ,{file:'./deivce', path:'/process/add_user_device', method:'add_user_device', type:'post'}
        ,{file:'./deivce', path:'/process/list_reg_device', method:'list_reg_device', type:'get'}
        
        //PORT FORWARDING
        
        //IP BANDWIDTH
        
        //
    ],
}