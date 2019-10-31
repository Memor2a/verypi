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
//        ,{file:'./android_schema', collection:'android', schemaName:'AndroidSchema', modelName:'AndroidModel'}        
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
        
        //CONFIGS
        /*module.exports.change_pw = change_pw;
        module.exports.limit_user = limit_user;
        module.exports.inner_network = inner_network;
        module.exports.change_router_ip = change_router_ip;
        module.exports.syn_flood = syn_flood;
        module.exports.slide_time = slide_time;
        module.exports.slide_save = slide_save;        */
        ,{file:'./user', path:'/process/modifyUser', method:'modifyUser', type:'post'}
        ,{file:'./config', path:'/process/change_pw', method:'change_pw', type:'post'}

        ,{file:'./config', path:'/process/view_limit_user', method:'view_limit_user', type:'get'}
        ,{file:'./config', path:'/process/cg_limit_user', method:'cg_limit_user', type:'post'}

        ,{file:'./config', path:'/process/view_inner_network', method:'view_inner_network', type:'get'}        
        ,{file:'./config', path:'/process/cg_inner_network', method:'cg_inner_network', type:'post'}
        
        ,{file:'./config', path:'/process/view_router_ip', method:'view_router_ip', type:'get'}
        ,{file:'./config', path:'/process/cg_router_ip', method:'cg_router_ip', type:'post'}
        
        ,{file:'./config', path:'/process/view_syn_flood', method:'view_syn_flood', type:'get'}
        ,{file:'./config', path:'/process/cg_syn_flood', method:'cg_syn_flood', type:'post'}
        
        ,{file:'./config', path:'/process/view_slide_time', method:'view_slide_time', type:'get'}
        ,{file:'./config', path:'/process/cg_slide_time', method:'cg_slide_time', type:'post'}
        
        ,{file:'./config', path:'/process/view_slide_save', method:'view_slide_save', type:'get'}
        ,{file:'./config', path:'/process/cg_slide_save', method:'cg_slide_save', type:'post'}

        //안드로이드
//        ,{file:'./config', path:'/process/cg_slide_save', method:'cg_slide_save', type:'post'}
//        ,{file:'./config', path:'/process/cg_slide_save', method:'cg_slide_save', type:'post'}
        
    ],
}