
$("figure").click(function(){
    location.href="info.html";
})
//nav下拉列表事件
var navover=(function(){
    var lul=document.querySelector(".ltxt");
    var _llibox=lul.children;
    var _info=document.querySelector(".show_info");
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this=this;
            for(var i=0;i<_llibox.length;i++){
                    _llibox[i].onmouseenter=(function(i){
                        return function(){
                            $(".show_info")[0].innerHTML=$(".l"+(i+1))[0].innerHTML;
                            $(".show_info").slideDown("fast");
                    }
                    }(i));
                    _info.onmouseleave=(function(i){
                         return function(){
                            $(".show_info").stop();
                             $(".show_info").slideUp("fast");
                            }
                    }(i));
            }
        }
    }
}());

//鼠标滚动事件
var mouseScroll=(function(){
    var _tit=document.querySelector(".tit_con");
    var _nav=document.querySelector(".nav_con");
    var _gotop=document.querySelector(".gotop");
    var _sanj=document.querySelector(".sanj");
    var timer=null;
    return {
        init:function(){
            this.event();
            // this.slide();
        },
        event:function(){
            window.onscroll=function(){
                var top=document.documentElement.scrollTop;
                if(top>36){
                    _tit.style.display="none";
                    _nav.style.position="fixed";
                    _nav.style.zIndex=2;
                    $(".info").css("top","65px");
                }
                else{
                    _tit.style.display="block";
                    _nav.style.position="relative";
                    $(".info").css("top","101px");
                }

                if(top>100){
                    _gotop.style.display="block";
                }
                else{
                    _gotop.style.display="none";
                }
            };
            _gotop.onmouseenter=function(){
               _sanj.style.borderColor="transparent transparent #0b3bdb transparent";
            };
            _gotop.onmouseleave=function(){
                _sanj.style.borderColor="transparent transparent #797c8c transparent ";
            };
            _gotop.onmousedown=function(){
                timer=setInterval(function(){
                     if(document.documentElement.scrollTop>0){
                         document.documentElement.scrollTop-=10;
                     }
                     if(document.documentElement.scrollTop<=0){
                        clearInterval(timer);  
                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                },1);
            };
           
        },
    }
}());