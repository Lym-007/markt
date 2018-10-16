// 缩略图及左右控制
function minphto(){
    var $movebox=$(".minbox");
    $(".phtl_box").click(function(){
                if(parseInt($movebox.css("left"))<-134){
                    
                }
                else{
                    $movebox.animate({
                        left:'-=135px',
                     });
                }
                
        
    });
    $(".phtr_box").click(function(){
                if(parseInt($movebox.css("left"))>-1){
            
                    }
                    else{
                        $movebox.animate({
                            left:'+=135px',
                         });
                    }
                
        
    });
}
var start=(function(){
    //获取元素
    var _minig=document.querySelector('.minig');
    var _min=document.querySelector(".min");
    var _maxig=document.querySelector('.maxig');
    var _move=document.querySelector('.move');
    var _max=document.querySelector('.max');
    var _checkbox=document.querySelector('.ban');
    var _checkli=_checkbox.querySelectorAll('li');
    var _filter=document.querySelector(".filter");
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this=this;
            for(var i=0;i<_checkli.length;i++){
                _checkli[i].index=i;
            }
            _checkbox.onmousedown=function(e){
                e=e||window.event;
                var target= e.target|| e.srcElement;
                if(target.nodeName=='IMG'){
                    _this.showimage(target.parentNode.index);
                }
            };
            _min.onmouseenter=function(e){
                e=e||window.event;
                //显示区域及放大镜
                _max.style.display='block';
                _move.style.display='block';
                //添加鼠标移动事件
                _min.onmousemove=function(e){
                    e=e||window.event;
                     //获取边界
                var maxX=_min.clientWidth-_move.offsetWidth-20;
                var maxY=_min.clientHeight-_move.offsetHeight-20;
                    //计算位置
                    var x= e.clientX-this.offsetLeft-_move.offsetWidth/2;
                    var y= e.clientY-this.offsetTop-_move.offsetHeight/2;
                    //边界处理
                  
                    if(x<=20){
                        x=20;
                    }
                    else if(x>=maxX){
                        x=maxX;
                    }
                    if(y<=20){
                        y=20;
                    }
                    else if(y>=maxY){
                        y=maxY;
                    }
                    // y+=(_move.offsetHeight/2);
                    var _x=_maxig.offsetWidth/2;
                    var _y=_maxig.offsetHeight/2;
                    var rx=x+(_move.offsetWidth/2);
                    var ry=y+(_move.offsetHeight/2);
                    // //设置位置
                    // console.log(_min.clientWidth/_move.clientWidth,_maxig.offsetWidth)
                    _move.style.left=rx+'px';
                    _maxig.style.left=-x*(_min.clientWidth/_move.offsetWidth)+_x+'px';
                    _move.style.top=ry+'px';
                    _maxig.style.top=-y*(_min.clientWidth/_move.offsetWidth)+_y+'px';
                }
            };
            _min.onmousewheel=function(e){
                e=e||window.event;
                // e.stopPropagation();
                if(e.preventDefault){
                    e.preventDefault();
                }
                else{
                    e.returnValue=false;
                }
                var movewidth=parseInt($(".move").css("width"));
                if(e.deltaY<0){//向上滚动
                        movewidth-=10;
                        if(movewidth<=200){
                            movewidth=200;
                        }
                }
                else if(e.deltaY>0){//向下滚动
                    movewidth+=10;
                    if(movewidth>=570){
                        movewidth=570;
                    }
                }
                var maxwidth=570* (570/movewidth);
                $(".maxig").css({
                    "width":maxwidth+"px",
                    "height":maxwidth+"px"
                })
                _this.setwh(_move,movewidth);
                _this.setwh(_maxig,maxwidth);
                _this.init();
            };
            _min.onmouseleave=function(){
                _move.style.display='none';
                _max.style.display='none';
                _this.setwh(_move,200);
                _this.setwh(_maxig,1625);
            };
            $(".info_top li").click(function(){
                $(".info_top li").removeClass("checkedli");
                $(this).addClass("checkedli");
            })
        },
        showimage:function(index){
            for(i=0;i<_checkli.length;i++){
                _checkli[i].removeAttribute('class');
            }
         if(index>_checkli.length-1){
             index=index%_checkli.length;
         }
            _checkli[index].className='checked';
            var src=_checkli[index].firstElementChild.src;
            var num=src.replace(/[^0-9]/ig,"");
            num=num.replace("7777","");
            var index=src.split("").indexOf(num)+1;
            src=src.split("");
            src.splice(index,1,"d");
            src=src.join("");
            _minig.setAttribute('src',src);
            _maxig.setAttribute('src',src);
        },
        setwh:function(ele,wh){
            ele.style.width=wh+"px";    
            ele.style.height=wh+"px";
            ele.style.marginTop=-wh/2+"px";
            ele.style.marginLeft=-wh/2+"px";
        }
    }
}());