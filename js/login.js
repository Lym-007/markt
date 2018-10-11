var moveing = (function () {
    var _close = document.querySelector(".close");
    var _form = document.querySelector("form");
    var _numbtn = document.querySelector(".zh");
    var _pwdbtn = document.querySelector(".mm");
    var _number = _form.number;
    var _pwd = _form.password;
    var _checkbtn = _form.remb;
    var _checked = document.querySelector(".remb");
    var _logbtn = document.querySelector(".logbtn");
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
                _this.inpfocus(this);
            }, false);
            _pwd.addEventListener("focus", function () {
                _pwdbtn.click();
                _number.blur();
                _this.inpfocus(this);
            }, false);
            //false:在冒泡流触发
            _number.addEventListener("blur", function () {
                if (this.value) {
                    var flag = 1;
                }
                else {
                    flag = 0;
                }
                _this.labelblur(_numbtn, flag);
                _this.inpblur(this);
            }, false);
            _pwd.addEventListener("blur", function () {
                if (this.value) {
                    var flag = 1;
                }
                else {
                    flag = 0;
                }
                _this.labelblur(_pwdbtn, flag);
                _this.inpblur(this);
            },false);
            _close.onclick = function () {
                    location.href = "index.html";
                };
                //阻止冒泡事件，防止再次点击box
             _checkbtn.onclick=function(e){
                    e=e||window.event;
                    e.stopPropagation();
            };
             _checked.onclick=function(e){
                 $(".checkphto").fadeToggle();
                 _checkbtn.onclick();
                _checkbtn.click();
             }
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