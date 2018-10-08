var moveing = (function () {
    var _form = document.querySelector("form");
    var _numbtn = document.querySelector(".zh");
    var _pwdbtn = document.querySelector(".mm");
    var _repwdbtn=document.querySelector(".rmm");
    var _codebtn=document.querySelector(".am");
    var _number = _form.number;
    var _pwd = _form.password;
    var _repwd=_form.repassword;
    var _code = _form.code;
    var _regbtn = document.querySelector(".regbtn");
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            _form.onclick = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName === "LABEL") {
                    movedt(target, { bottom: 43 }, 100);
                    target.style.color = "#1428a0";
                    target.style.fontSize = "12px";
                }

            };
            _number.addEventListener("focus", function () {
                _numbtn.click();
                _pwd.blur();
                _repwd.blur();
                _code.blur();
                _this.inpfocus(this);
            }, false);
            _pwd.addEventListener("focus", function () {
                _pwdbtn.click();
                _number.blur();
                _repwd.blur();
                _code.blur();
                _this.inpfocus(this);
            }, false);
            _repwd.addEventListener("focus", function () {
                _repwdbtn.click();
                _number.blur();
                _pwd.blur();
                _code.blur();
                _this.inpfocus(this);
            }, false);
            _code.addEventListener("focus", function () {
                _codebtn.click();
                _number.blur();
                _pwd.blur();
                _repwd.blur();
                _this.inpfocus(this);
            }, false);
            //false:在冒泡流触发
            _number.addEventListener("blur",function(){
            if (this.value) {
                var flag = 1;
            }
            else {
                flag = 0;
            }
            _this.labelblur(_numbtn, flag);
            _this.inpblur(this);
             }, false);
            _pwd.addEventListener("blur",function(){
                if (this.value) {
                    var flag = 1;
                }
                else {
                    flag = 0;
                }
                _this.labelblur(_pwdbtn, flag);
                _this.inpblur(this);
                 },false);
            _repwd.addEventListener("blur",function(){
                if (this.value) {
                    var flag = 1;
                }
                else {
                    flag = 0;
                }
                _this.labelblur(_repwdbtn, flag);
                _this.inpblur(this);
                 },false);
            _code.addEventListener("blur",function(){
                if (this.value) {
                    var flag = 1;
                }
                else {
                    flag = 0;
                }
                _this.labelblur(_codebtn, flag);
                _this.inpblur(this);
                 },false);
        },
        inpfocus: function (ele) {
            ele.style.color = "#1428a0";
            ele.style.borderColor = "#1428a0";
            ele.style.borderWidth = "2px";
        },
        inpblur: function (ele) {
            ele.style.color = "#000";
            ele.style.borderWidth = "1px";
            ele.style.borderColor = "#767676";
        },
        labelblur: function (ele, flag) {
            if (flag) {
                ele.style.color = "#767676";
            }
            else {
                movedt(ele, { bottom: 10 }, 100);
                ele.style.fontSize = "18px";
                ele.style.color = "#767676";
            }

        }
    }
}());

var checkinfo=(function(){
    var _form=document.querySelector(".tab");
    var _num=_form.number;
    var _pwd=_form.password;
    var _repwd=_form.repassword;
    var _code=_form.code;
    var flag=0;
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this =this;
            _num.addEventListener("change",function(){
                console.log(_num.value);
                var reg=/^1[34578]\d{9}$/;
                if(reg.test(_num.value)){
                    console.log(1);
                    $(".num_erro").html("");
                }
                else{
                    console.log(0);
                    $(".num_erro").html("请输入有效的电话号码");
                }
                _num.style.color="#fff";
            },false);
            _pwd.addEventListener("change",function(){
                console.log(_pwd.value);
                var reg=/^[a-zA-Z0-9]*(?=[a-zA-Z0-9]{8,})(?=[a-zA-Z0-9]*\d)(?=[a-zA-Z0-9]*[a-zA-Z])[a-zA-Z0-9]*$/;
                if(reg.test(_pwd.value)){
                    console.log(1);
                    
                    $(".pwd_erro").html("");
                }
                else{
                    console.log(0);
                    $(".pwd_erro").html("您的密码必须包含至少8个字符，需同时包括字母与数字");
                }
                _num.style.color="#fff";
            },false);
            _repwd.addEventListener("change",function(){
                console.log(_repwd.value);
        
                if(_repwd.value===_pwd.value){
                    console.log(1);
                    $(".repwd_erro").html("");
                }
                else{
                    console.log(0);
                    $(".repwd_erro").html("两次密码不一致");
                }
                _num.style.color="#fff";
            },false);
        }
    }
   
}());