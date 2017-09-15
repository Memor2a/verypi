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
        ,{file:'./port_ban_schema', collection:'portban', schemaName:'PortBanSchema', modelName:'PortBanModel'}
        ,{file:'./port_fw_schema', collection:'portfw', schemaName:'PortFwSchema', modelName:'PortFwModel'}
        ,{file:'./mac_address_schema', collection:'mac', schemaName:'MacSchema', modelName:'MacModel'}
	],
	route_info: [
        //NOTICE
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'}
        ,{file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
        
        //REGISTER DEVICE
        ,{file:'./deivce', path:'/process/add_user_device', method:'add_user_device', type:'post'}
        ,{file:'./deivce', path:'/process/list_reg_device', method:'list_reg_device', type:'get'}
        
        //PORT BAN & FORWARDING
        ,{file:'./port', path:'/process/add_ban_port', method:'add_ban_port', type:'post'}
        ,{file:'./port', path:'/process/list_ban_port', method:'list_ban_port', type:'get'}

        ,{file:'./portfw', path:'/process/add_portfw_rule', method:'add_portfw_rule', type:'post'}
        ,{file:'./portfw', path:'/process/list_portfw_rule', method:'list_portfw_rule', type:'get'}
        
        //MAC ADDRESS BAN
        ,{file:'./mac', path:'/process/add_ban_mac', method:'add_ban_mac', type:'post'}
        ,{file:'./mac', path:'/process/list_ban_mac', method:'list_ban_mac', type:'get'}
        
        //
    ],
}