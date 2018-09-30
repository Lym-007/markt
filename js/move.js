//获取非行内样式

function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}

//多属性同时变化,在同一时间停止
function movedt(ele,targetobj,time,callback){
    if(typeof ele=='string'){
        ele=document.querySelector(ele);
    }
    //计算每个属性变化的速度
    var speed={};
    for(var i in targetobj){
        //最初的值
        var startvalue=parseFloat(getStyle(ele,i));
        if(i=='opacity'){
            startvalue*=100;
        }
        var s=targetobj[i]-startvalue;
        speed[i]=(s/(time/10));
    }
    // console.log(speed);
    clearInterval(ele.timer);
    ele.timer=setInterval(function(){
        //计时一次下标和flag重置
        var flag=true;
        for(var attr in targetobj){
            //每次更新后的初值
            var init=parseFloat(getStyle(ele,attr));
            if(attr=='opacity'){
                init*=100;
            //    console.log(init);

            }
            init+=speed[attr];
            if((speed[attr]>=0&&targetobj[attr]<=init)||(speed[attr]<=0&&targetobj[attr]>=init)){
                init=targetobj[attr];
            }
            else{
                flag=false;
            }
            if(attr=='opacity'){
                ele.style[attr]=init/100;
            }
            else{
                ele.style[attr]=init+'px';
            }
        }
        if(flag){
            clearInterval(ele.timer);
            if(typeof callback=='function'){
                callback(ele);
            }
        }
    },10);
}