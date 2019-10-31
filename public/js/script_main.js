// 메뉴 클릭시 메뉴 오픈
function myAccFunc(num) {
    var x = document.getElementById("demoAcc"+num);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// 모바일 버전 사이드바 오픈 / 클로즈
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// 메시지 부분의 제목과 내용 설정
function set_message(){

}

//해당 테이블에 사용자가 입력한 것 추가 후 서버에 전송
function add_xxx_table(){

}

//페이지 로딩시 공지사항 불러옴
function load_nofication(){

}

//테스트
document.getElementById("popup-message").style.display='block';

