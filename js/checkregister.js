var register = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['regbtn'];
            this.$usernameInp =   this.$ele['number'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.register(data);
                    }
                }
                sendAjax('http://localhost:7777/gitproject/markt/php/register.php', params);
            },
            // 判断用户名称是否存在
            this.$usernameInp. addEventListener('blur', function(){
                console.log(1111);
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.checkUsername(data);
                    }
                }
                sendAjax('http://localhost:7777/gitproject/markt/php/check_username.php', params);
            }, false);
        },
        checkUsername: function(data) {
            if(data.code == 200) {
             document.querySelector("#num").innerHTML="";
               this.$loginBtn.disabled = 'false';
            } else {
                alert(data.msg);
                document.querySelector("#num").innerHTML="该号码已注册";
                this.$loginBtn.disabled = 'true';
            }
        },
        register: function(data) {
            if(data.code == 200) {
                //   注册成功
                alert("注册成功！，确定即跳转到登录页面");
                location.href="login.html";
             } else {
                document.querySelector(".code_erro").innerHTML="注册失败";
             }
        }
    }

}())