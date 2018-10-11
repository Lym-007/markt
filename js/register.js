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
                    target.className="labc";
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
            ele.setAttribute("class","elefocus");
        },
        inpblur: function (ele) {
            ele.setAttribute("class","eleblur")
        },
        labelblur: function (ele, flag) {
            if (flag) {
                ele.setAttribute("class","eleisfblur")
            }
            else {
                movedt(ele, { bottom: 10 }, 100);
                ele.setAttribute("class","elenofblur")
            }

        }
    }
}());