//nav下拉列表事件
var navover=(function(){
    var lul=document.querySelector(".ltxt");
    var _llibox=lul.children;
    var _info=document.querySelector(".info");
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this=this;
            for(var i=0;i<_llibox.length;i++){
                    _llibox[i].onmouseenter=function(e){
                        e=e||window.event;
                        $(".info").slideDown("slow");
                    }
            }
            _info.onmouseleave=function(){
                $(".info").slideUp("fast");
            }
            lul.onmouseleave=function(){
                $(".info").slideUp("fast");
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
    console.log(_sanj);
    return {
        init:function(){
            this.event();
            // this.slide();
        },
        event:function(){
            window.onscroll=function(){
                var top=document.documentElement.scrollTop;
                console.log(top);
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
//源代码轮播封装
var move=(function(){
    return {
        init:function(_box,_showbox,_tag,_showtags,_left,_right,_dist){
            this._box=_box;
            this.showbox=_showbox;
            this._tag=_tag;
            this._showtags=_showtags;
            this._left=_left;
            this._right=_right;
            this._dist=_dist;
            var _this=this;
            this.index=0;
            this.event();
            this.autoPlay();
            if(_showtags){
                 for(var i=0;i<_showtags.length;i++){
                        _showtags[i].index=i;
                    }
            }
            var first=_showbox.firstElementChild;
            var last=_showbox.lastElementChild.cloneNode(true);
            _showbox.appendChild(first.cloneNode(true));
            _showbox.insertBefore(last,first);
            _showbox.style.left="-"+_dist+"px";
        },
        event:function(){
            var _this=this;
            this._box.onmouseenter=function(){
                _this.stop();
            };
            this._box.onmouseleave=function(){
                _this.autoPlay();
            };
            if(this._tag){
                this. _tag.onmousedown=function(e){
                e=e||window.event;
                var target=e.target||e.srcElement;
                if(target.nodeName=='LI'){
                    console.log(target.index);
                    _this.showImage(target.index,0);
                }
            };
            }
           
            if(this._left){
                this. _left.onmousedown=function(){
                _this.index--;
                _this.showImage(_this.index);
            };
            }
           if(this._right){
                this._right.onmousedown=function(){
                _this.index++;
                _this.showImage(_this.index);
            };
           }
           

        },
        showImage:function(index,time){
            var _this=this;
            if(index>_showtags.length-1){
                index=0;
               _showbox.style.left=0;
            }
            else if(index<0){//不能等于0，否则点击1时会显示最后一张
                index=_showtags.length-1;
                _showbox.style.left=-(_showtags.length+1)*this._dist+'px';
            }
            this.index=index;
            for(var i=0;i<_showtags.length;i++){
                _showtags[i].className='';
            }
            this.moved(_showbox,'left',-(this.index+1)*_this._dist,time);
            _showtags[this.index].className='active';
        },
        autoPlay:function(){
            var _this=this;
            clearInterval(this._box.timer);
            this._box.timer=setInterval(function(){
                _this.index++;
                _this.showImage(_this.index,500);
            },5000);
        },
        stop:function(){
            var _this=this;
            clearInterval(this._box.timer);
        },
        getStyle:function(ele,attr){
            if(window.getComputedStyle){
                return window.getComputedStyle(ele,null)[attr];
            }
            return ele.currentStyle[attr];
        },
        moved:function(ele,attr,target,time){
            var _this=this;
            var timer=null;
            if(typeof ele=='string'){
                ele=document.querySelector(ele);
            }
            var init=parseInt(this.getStyle(ele,attr));
            var speed=(target-init)/(time/10);
            clearInterval(timer);
            timer=setInterval(function(){
                var init=parseInt(_this.getStyle(ele,attr));
                init+=speed;
                if(speed>0&&init>=target||speed<0&&init<=target){
                    init=target;
                    clearInterval(timer);
                }
                ele.style[attr]=init+'px';
            },10);
        }
    }
}());

//jquery轮播封装
var jqmove=(function(){
    // $(".image").animate({"left":"-1220px"},5000); 
   var timer=null;
   return {
       init:function(){
           this.auto();
           this.event();
       },
       event:function(){
           var _this=this;
           $(".pej-l").click(function(){
               clearInterval(timer);
               var left=$(".image").css("left");
               if(parseInt(left)==0){
                   left=-1220*($(".image").length)+"px";
               }
               $(".image").animate({left:parseInt(left)+1220+"px"},0);
               _this.auto();
           });
           $(".pej-r").click(function(){
               clearInterval(timer);
               var left=$(".image").css("left");
               if(parseInt(left)==-1220*($(".image").length-1)){
                   left="1220px";
               }
               $(".image").animate({left:parseInt(left)-1220+"px"},0);
               _this.auto();
           });
           $(".pej_tag").click(function(){
               for(var i=0;i<$(".pej_tag").length;i++){
                   $(".pej_tag")[i].onmousedown=(function(i){
                       return function(){
                                  clearInterval(timer);
                                   var left=$(".image").css("left");
                                   $(".image").animate({left:-i*1220+"px"},0);
                                   _this.auto();
                               }
                   }(i));    //调用时传入参数i 
               }
           
           });
           $(".pej_con").mouseenter(function(){
                   _this.stopAuto();
           });
           $(".pej_con").mouseleave(function(){
                   _this.auto();
           });
       },
       auto:function(){
           timer=setInterval(function(){
           var left=$(".image").css("left");
           if(parseInt(left)==-1220*($(".image").length-1)){
               left="1220px";
           }
           $(".image").animate({left:parseInt(left)-1220+"px"},0);
           },5000);
       },
       stopAuto:function(){
           clearInterval(timer);
       }
   }
}()); 