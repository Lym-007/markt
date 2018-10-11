
//源代码轮播封装
var move=(function(){
    return {
        init:function(_box,_showbox,_tag,_showtags,_left,_right,_dist){
            this._box=_box;
            this._showbox=_showbox;
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
            if(index>this._showtags.length-1){
                index=0;
               this._showbox.style.left=0;
            }
            else if(index<0){//不能等于0，否则点击1时会显示最后一张
                index=this._showtags.length-1;
               this. _showbox.style.left=-(this._showtags.length+1)*this._dist+'px';
            }
            this.index=index;
            for(var i=0;i<this._showtags.length;i++){
                this._showtags[i].className='';
            }
            this.moved(this._showbox,'left',-(this.index+1)*_this._dist,time);
            this._showtags[this.index].className='active';
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
   var index=0;
   return {
       init:function(con,image,tag,left,right){
           this.con=con;
           this.image=image;
           this.tag=tag;
           this.left=left;
           this.right=right;
           this.auto();
           this.event();
       },
       event:function(){
           var _this=this;
           $(_this.left).click(function(){
               clearInterval(timer);
               index--;
               _this.showimg(index);
               _this.auto();
           });
           $(_this.right).click(function(){
            clearInterval(timer);
               index++;
               _this.showimg(index);
               _this.auto();
           });
           $(_this.tag).click(function(){
               for(var i=0;i<$(_this.tag).length;i++){
                   $(_this.tag)[i].onmousedown=(function(i){
                       return function(){
                                clearInterval(timer);
                                for(var j=0;j<$(_this.tag).length;j++){
                                    $(_this.tag)[j].className="pej_tag";    
                                }
                                $(_this.tag)[i].className="pej_tag tag_active";                   
                                   _this.showimg(i);
                                   _this.auto();
                               }
                   }(i));    //调用时传入参数i 
               }
           
           });
           $(_this.con).mouseenter(function(){
                   _this.stopAuto();
           });
           $(_this.con).mouseleave(function(){
                   _this.auto();
           });
       },
       showimg:function(i){
                 i=i||0;
                 if(i>=$(this.tag).length){
                     i=0;
                 }
                 if(i<0){
                     i=$(this.tag).length-1;
                 }
                 index=i;
                for(var j=0;j<$(this.tag).length;j++){
                    $(this.tag)[j].className="pej_tag";    
                }
                $(this.tag)[i].className="pej_tag tag_active";
                var left=$(this.image).css("left");
                $(this.image).animate({left:i*(-1220)+"px"},0);
       },
       auto:function(){
           var _this=this;
           clearInterval(timer);
           timer=setInterval(function(){
               index++;
               _this.showimg(index);
               
           },5000);
       },
       stopAuto:function(){
           clearInterval(timer);
       }
   }
}()); 
// 鼠标经过切换商品图片
var changeimg=(function(){
    var srcBox;
    return {
        init:function(ele){
            if(typeof ele === "string"){
                ele=document.querySelectorAll(ele);
            }      
            this.index=0;
            this.ele=ele;
            this.event();
        },
        event:function(){
            var _this=this;
            for(var j=0;j<this.ele.length;j++){
                this.ele[j].firstElementChild.onmouseenter=function(){
                        var srcbox=[];
                        var src=this.src;
                        srcbox.push(src);
                        var num=src.replace(/[^0-9]/ig,"");
                        src=src.split("");
                        var index=src.indexOf(num);
                        src.splice(index,0,"b");
                        srcbox.push(src.join(""));
                        srcBox=srcbox;
                        clearInterval(this.timer);
                        var ele=this;
                        this.timer=setInterval(function(){
                            _this.index++;
                            _this.showimg(ele,srcbox);
                                },500);
                };
                this.ele[j].firstElementChild.onmouseleave=(function(_this,sele){
                        return function(){
                            _this.index=0;
                            clearInterval(sele.timer);
                            _this.showimg(sele,srcBox);
                        }
                }(_this,this.ele[j].firstElementChild));
            }
            
        },
        showimg:function(ele,box){
            if(this.index<0){
                this.index=box.length-1;
            }
            if(this.index>=box.length){
                this.index=0;
            }
            ele.src=box[this.index];
        }
    }
    
}());