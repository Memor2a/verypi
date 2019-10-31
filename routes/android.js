/*
 * 디바이스 정보 저장 및 조회를 위한 라우팅 함수 정의
 */

// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var Token = mongoose.model('Token', androidSchema);

app.post('token', function(req, res){
    var token = new Token({
        {token : "test"} //req.body.Token;
    });
    token.save(function(err){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }
        res.json({result:1});
    });
});

//module.exports.add_user_device = add_user_device;
