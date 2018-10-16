
// 点击跳转详情页事件
var click_down=(function(){
    var _show_info=document.querySelector(".show_info");
    return {
        init:function(){
            this.disable($("figure"));
            console.log($(".show_info figure")[0])
            this.disable($(".show_info figure"));
            this.event();
            
        },
        event:function(){
            _show_info.addEventListener("mousedown",function(e){
                e=e||window.event;
                e.stopPropagation();
                var target=e.target||e.srcElement;
                // location.href="info.html";
                console.log(target)
            },true);
            $("figure").click(function(){
                $("figure").children()[0].disabled=true;
                var arr=[];
                var src=$(this).children("img")[0].src;
                var p=$(this).children("figcaption").html();
                var price=$(this).children("span").html();
                var info={
                    src:src,
                    p:p,
                    price:price
                };
                arr.push(info);
                console.log(arr);
                 localStorage.x_info=JSON.stringify(arr);
                location.href="info.html";
            })
            $(".downimg").click(function(){
                console.log(this)
                // location.href="info.html";
            })
        },
        disable:function(ele){
            ele.children("img")[0].disabled=true;
            ele.children("figcaption")[0].disabled=true;
        }
    }
}());
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
                            _this.addclass($(_llibox[i]));
                            $(".show_info")[0].innerHTML=$(".l"+(i+1))[0].innerHTML;
                            $(".show_info")[0].index=i;
                            $(".show_info").slideDown("fast");
                    }
                    }(i));
                    _llibox[i].onmouseleave=(function(i){
                        return function(){
                            _this.removeclass($(_llibox[i]));
                        }
                    }(i));
                    $("#nav").mouseleave(function(){
                             $(".show_info").stop();
                             $(".show_info").slideUp("fast");
                    });
                    $(".show_info").mouseenter(function(){
                      _this.addclass($(_llibox[$(".show_info")[0].index]));
                    });
                    $(".show_info").mouseleave(function(){
                        _this.removeclass($(_llibox[$(".show_info")[0].index]));
                      });
            }
        },
        addclass:function($ele){
           $ele.addClass("li_hover_li");
           $ele.children("a").addClass("li_hover_a");
           $ele.children("i").addClass("li_hover_i");
        },
        removeclass:function($ele){
            $ele.removeClass("li_hover_li");
           $ele.children("a").removeClass("li_hover_a");
           $ele.children("i").removeClass("li_hover_i");
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
                }
                else{
                    _tit.style.display="block";
                    _nav.style.position="relative";
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