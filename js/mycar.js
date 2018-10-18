
// 数据渲染
var get_goods=(function(){
    return {
        init:function(){
            this.$like_box=$(".like_box");
            this.$like_goods=$(".like_goods")[0];
            this.create_goods();
        },
        create_goods:function(){
            var goods_arr=JSON.parse(localStorage.goods);
            var frag=document.createDocumentFragment();
            for(var i=0;i<goods_arr.length;i++){
                var newgoods=this.$like_goods.cloneNode(true);
                newgoods.index=goods_arr[i].id;
                $(newgoods).children("span").html=goods_arr[i].price;
                $(newgoods).children("figure").children("img")[0].src=goods_arr[i].src;
                $(newgoods).children("figure").children("figcaption").html=goods_arr[i].name;
                $(frag).append($(newgoods));
            }
            this.$like_box.append(frag);
            $(this.$like_box.children(".like_goods")[0]).remove();
        }
    }
}());
// 表格事件
var form_function=(function(){
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this=this;
             // 数量加减
             $(".down").click(function(){
            
                if($(this).next()[0].value==1){
                    $(".down").css("disabled",true);
                    // $(".goods_form")[0].number.value=1;
                }
                else{
                    $(this).next()[0].value--;
                    _this.setPrice(this,$(this).next()[0].value);
                }  
                _this.setAllPrice();    
            })
            $(".up").click(function(){
         
                $(this).prev()[0].value++;
                _this.setPrice(this,$(this).prev()[0].value);
            })
              // 单个选择事件
            $(".check").click(function(){
                // 找出当前点击的商品的价格td
                var $td=$(this).parent().parent().parent().children().eq(-1);
                if(this.checked==true){
                    $td.addClass("price");
                }
                else{
                    $td.removeClass("price");
                }
                _this.setAllPrice();
            })
            // 全选事件
            $(".checkall").click(function(){
                for(var i=0;i<$(".check").length;i++){
                    $(".btn1")[i].click();
                }
            })
            $(".rebtn").click(function(){
                $(this).prev()[0].click();
                if( $(this).prev()[0].checked==true){
                    $(this).children(".checkphto").fadeIn();
                }
                else{
                    $(this).children(".checkphto").fadeOut();
                }
                
                var flag=0;
                for(var i=0;i<$(".check").length;i++){
                    if($(".check")[i].checked==false){
                        flag=1;
                    }
                }
                if(flag==1){
                    
                    $(".checkall")[0].checked=false;
                    $(".rebtnall").children(".checkphto").stop();
                    $(".rebtnall").children(".checkphto").fadeOut();
                }
                else{
                    $(".checkall")[0].checked=true;
                    $(".rebtnall").children(".checkphto").stop();
                    $(".rebtnall").children(".checkphto").fadeIn();
                }
                _this.setAllPrice();
            })
            $(".rebtnall").click(function(){
                var flag=0;
                for(var i=0;i<$(".check").length;i++){
                    if($(".check")[i].checked==false){
                        flag=1;
                    }
                }
                if(flag==1){
                    
                    $(".checkall")[0].checked=true;
                    for(var i=0;i<$(".check").length;i++){
                            $(".check")[i].checked=true;
                     
                        }
                    $(".rebtnall").children(".checkphto").stop();
                    $(".rebtnall").children(".checkphto").fadeIn();
                }
                else{
                    $(".checkall")[0].checked=false;
                    for(var i=0;i<$(".check").length;i++){
                        $(".check")[i].checked=false;
                 
                    }
                    $(".rebtnall").children(".checkphto").stop();
                    $(".rebtnall").children(".checkphto").fadeOut();
                }
                $(".rebtnall").children(".checkphto").stop();
                $(".checkall")[0].click();
            })
            

        },
        setPrice:function(ele,number){
            var price=parseFloat($(ele).parent().parent().prev().html())*number;
            $(ele).parent().parent().next().html("￥"+price.toFixed(2));
            this.setAllPrice();
        },
        setAllPrice:function(){
            var allprice=0;
           if($(".price").length>0){
                for(var i=0;i<$(".price").length;i++){
                            var str=$($(".price")[i]).html();
                            str=str.replace("￥","")
                            allprice+=parseFloat(str);
                        }
           }
           $(".all_price").html("￥"+allprice.toFixed(2));
           $(".all_code").html(allprice.toFixed(2));
        }
      
    }
}());

var add_goods=(function(){
   
    return {
        init:function(firsttr){
            this._table=$(".goods_form>table");
            this._tr=$(".car_column")[0];
            this.firsttr=firsttr;
            this.event();
        },
        event:function(){
            var _this=this;
            $(".addin").click(function(){
                var src=$(this).prev().prev().children("img")[0].src;
                var p=$(this).prev().prev().children("figcaption").html();
                var price=$(this).prev().html();
                var jifen=price.replace("￥","");
                var info={
                    src:src,
                    p:p,
                    price:price,
                    jifen:jifen,
                    allprice:price
                }
                var arr_info=JSON.parse(localStorage.car_info);
                arr_info.push(info)
                localStorage.car_info=JSON.stringify(arr_info);
                
             load_car.init($(".car_column")[0],$(".goods_form>table"),JSON.parse(localStorage.car_info),_this.firsttr);
            alert("加入购物车成功")
            location.reload();
            $(".gotop")[0].click();
            })
        },
    }
}());
var load_car=(function(){
    var tr=$(".goods_form>table").children(0).children(0)[0].cloneNode(true);
    return {
        init:function(ele,table,arr,firsttr){
            var frag=document.createDocumentFragment();
            frag.append(firsttr);
            $(ele).removeClass("first_info");
            frag.append(ele.cloneNode(true));
            for(var i=0;i<arr.length;i++){
                var newtr=ele.cloneNode(true);
                var div=$(newtr).children(".commodity_td").children(".commodity");
                div.children("img")[0].src=arr[i].src;
                div.children("p").html(arr[i].p);
                $(newtr).children(".commodity_price").html(arr[i].price);
                $(newtr).children(".commodity_jifen").html(arr[i].jifen);
                $(newtr).children(".last_price").html(arr[i].allprice);
                newtr.index=i;
                frag.append(newtr);
            }
            // $(frag).children(0).addClass("first_info");
            table.html(frag);
            // 默认选中第一个并隐藏，防止后面全选时落下
             $(table.children()[1]).children().children().children(".check").click();
                $(table.children()[1]).css("display","none");
           
            this.event();
        },
        event:function(){
            var _this=this;
            $(".del").click(function(){
               var id= $(this).parent().parent().parent()[0].index;
               var arr=JSON.parse(localStorage.car_info);
            // var arr=[1,2,3,4]
            //    arr.splice(2,1);//会改变数组本身
                 arr.splice(id,1);
                 localStorage.car_info=JSON.stringify(arr);
                 load_car.init($(".car_column")[0],$(".goods_form>table"),JSON.parse(localStorage.car_info),tr);
                 alert("删除成功");
                 location.reload();
                 $(".gotop")[0].click();
            })
        },
        show_car:function(){
            if(localStorage.car_info.length>2){
                $(".nogoods").css("display","none");
                $(".havegoods").css("display","block");
            }
            else{
                $(".nogoods").css("display","flex");
                $(".havegoods").css("display","none");
            }
        }
    }
}());