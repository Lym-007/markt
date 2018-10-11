var checkinfo=(function(){
    var _form=document.querySelector(".tab");
    var _num=_form.number;
    var _pwd=_form.password;
    var _repwd=_form.repassword;
    var _code=_form.code;
    var _btn=document.querySelector(".btn");
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this =this;
            _num.addEventListener("change",function(){
                var reg=/^1[34578]\d{9}$/;
                if(reg.test(_num.value)){
                    $(".num_erro").html("");
                    _this.setcolor(this,"");
                }
                else{
                    $(".num_erro").html("请输入有效的电话号码");
                    _this.setcolor(this,"red");
                }
            },false);
            _pwd.addEventListener("change",function(){
                console.log(_pwd.value);
                var reg=/^[a-zA-Z0-9]*(?=[a-zA-Z0-9]{8,})(?=[a-zA-Z0-9]*\d)(?=[a-zA-Z0-9]*[a-zA-Z])[a-zA-Z0-9]*$/;
                if(reg.test(_pwd.value)){
                    $(".pwd_erro").html("");
                    _this.setcolor(this,"");
                }
                else{
                    console.log(0);
                    $(".pwd_erro").html("您的密码必须包含至少8个字符，需同时包括字母与数字");
                    _this.setcolor(this,"red");
                }
            },false);
            _btn.addEventListener("click",function(){
                _this.isEmpty();
            },false);
            if(_repwd){
                _repwd.addEventListener("change",function(){
            
                    if(_repwd.value===_pwd.value){
                        $(".repwd_erro").html("");
                        _this.setcolor(this,"");
                    }
                    else{
                        $(".repwd_erro").html("两次密码不一致");
                        _this.setcolor(this,"red");
                    }
                },false);
            }
            
        },
        isEmpty:function(){
            if(_num.value==""){
                $(".num_erro").html("号码不能为空");
                this.setcolor(_num,"red");
            }
            if(_pwd.value==""){
                $(".pwd_erro").html("密码不能为空");
                this.setcolor(_pwd,"red");
            }
            if(_repwd){
                if(_repwd.value==""){
                    $(".repwd_erro").html("请确认密码");
                    this.setcolor(_repwd,"red");
                }
            }
        },
        setcolor:function(ele,attr){
            ele.style.color=attr;
            ele.style.borderColor=attr;
            ele.previousElementSibling.style.color=attr;
            ele.previousElementSibling.style.fontSize="12px";
        }
    }
}());