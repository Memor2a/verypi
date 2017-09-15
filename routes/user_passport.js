/**
 * 패스포트 라우팅 함수 정의
 */
  
module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index.ejs', {login_success:false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('index.ejs', {login_success:true});
        }
    });
    
    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
	 
    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
	
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });

    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));  

    //사용 설정 메뉴들
    router.route('/pw_change').get(function(req, res){
        if (!req.user) {
            res.render('use_pwchange.ejs', {login_success:false});
        }else{
            console.log("pw_change (로그인됨)");
            res.render('use_pwchange.ejs', {login_success:true});            
        }
    });

    router.route('/add_notice').get(function(req, res){
        if (!req.user) {
            res.render('use_add_notice.ejs', {login_success:false});
        }else{
            res.render('use_add_notice.ejs', {login_success:true});            
        }
    });
    
//    router.route('/user_manage').get(function(req, res){
//        if (!req.user) {
//            res.render('use_usermanage.ejs', {login_success:false});
//        }else{
//            res.render('use_usermanage.ejs', {login_success:true});
//        }
//    });

    router.route('/limit_user').get(function(req, res){
        if (!req.user) {
            res.render('use_limituser.ejs', {login_success:false});
        }else{
            res.render('use_limituser.ejs', {login_success:true});            
        }
    });

    //네트워크 설정 메뉴들
//    router.route('/port').get(function(req, res){
//        if (!req.user) {
//            res.render('nw_port.ejs', {login_success:false});
//        }else{
//            res.render('nw_port.ejs', {login_success:true});            
//        }
//    });

//    router.route('/port_foward').get(function(req, res){
//        if (!req.user) {
//            res.render('nw_portfw.ejs', {login_success:false});
//        }else{
//            res.render('nw_portfw.ejs', {login_success:true});            
//        }
//    });

    router.route('/inner_network').get(function(req, res){
        if (!req.user) {
            res.render('nw_innernw.ejs', {login_success:false});
        }else{
            res.render('nw_innernw.ejs', {login_success:true});            
        }
    });

    router.route('/change_router_ip').get(function(req, res){
        if (!req.user) {
            res.render('nw_chageip.ejs', {login_success:false});
        }else{
            res.render('nw_chageip.ejs', {login_success:true});            
        }
    });

    //보안 설정 메뉴들
//    router.route('/mac_address').get(function(req, res){
//        if (!req.user) {
//            res.render('sc_mac.ejs', {login_success:false});
//        }else{
//            res.render('sc_mac.ejs', {login_success:true});            
//        }
//    });

    router.route('/syn_flood').get(function(req, res){
        if (!req.user) {
            res.render('sc_synflood.ejs', {login_success:false});
        }else{
            res.render('sc_synflood.ejs', {login_success:true});            
        }
    });
    
    //디지털 액자 메뉴들 * 중요
    router.route('/slide_setting').get(function(req, res){
        if (!req.user) {
            res.render('df_slide.ejs', {login_success:false});
        }else{
            res.render('df_slide.ejs', {login_success:true});            
        }
    });

    router.route('/save_energy').get(function(req, res){
        if (!req.user) {
            res.render('df_saveenergy.ejs', {login_success:false});
        }else{
            res.render('df_saveenergy.ejs', {login_success:true});            
        }
    });
    
    //Printer Sharing 메뉴들(보류)
    router.route('/driver_setting').get(function(req, res){
        if (!req.user) {
            res.render('pt_driver.ejs', {login_success:false});
        }else{
            res.render('pt_driver.ejs', {login_success:true});            
        }
    });

    router.route('/printer_setting').get(function(req, res){
        if (!req.user) {
            res.render('pt_printer.ejs', {login_success:false});
        }else{
            res.render('pt_printer.ejs', {login_success:true});            
        }
    });
    
    //NAS
    router.route('/nas_register').get(function(req, res){
        if (!req.user) {
            res.render('nas_register.ejs', {login_success:false});
        }else{
            res.render('nas_register.ejs', {login_success:true});            
        }
    });
    
};