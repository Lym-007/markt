
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
                $(newgoods).children("span").html(goods_arr[i].price);
                // console.log($(newgoods).children("span")[0])
                $(newgoods).children("figure").children("img")[0].src=goods_arr[i].src;
                $(newgoods).children("figure").children("figcaption").html(goods_arr[i].name);
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
                    var id=$(this).parent().parent().parent()[0].index;
                    var arr=JSON.parse(localStorage.car_info);
                    for(var i=0;i<arr.length;i++){
                        if(id==arr[i].id){
                            arr[i].number=$(this).next()[0].value;
                            arr[i].allprice="￥"+arr[i].number*arr[i].jifen;
                            break;
                        }
                    }
                    localStorage.car_info=JSON.stringify(arr);
                    _this.setPrice(this,$(this).next()[0].value);
                }  
                _this.setAllPrice();    
            })
            $(".up").click(function(){
                $(this).prev()[0].value++;
                var id=$(this).parent().parent().parent()[0].index;
                var arr=JSON.parse(localStorage.car_info);
                for(var i=0;i<arr.length;i++){
                    if(id==arr[i].id){
                        arr[i].number=$(this).prev()[0].value;
                        arr[i].allprice="￥"+arr[i].number*arr[i].jifen;
                        break;
                    }
                }
                localStorage.car_info=JSON.stringify(arr);
                _this.setPrice(this,$(this).prev()[0].value);
            })
            // 选择事件
            $(".rebtn").click(function(){
                $(this).prev()[0].click();
                if( $(this).prev()[0].checked==true){
                    $(this).children(".checkphto").stop();
                    $(this).children(".checkphto").fadeIn();
                    if($(this)[0]===$(".rebtnall")[0]){
                        // console.log($(this))
                        $(".btn1").each(function(){
                            if($(this).prev()[0].checked==false){
                                $(this).click();
                            }
                        })
                    }
                }
                else{
                    $(this).children(".checkphto").stop();
                    $(this).children(".checkphto").fadeOut();
                    if($(this)[0]===$(".rebtnall")[0]){
                        $(".btn1").each(function(){
                            if($(this).prev()[0].checked==true){
                                $(this).click();
                            }
                        })
                    }
                }
                var flag=0;
                for(var i=1;i<$(".check").length;i++){
                    if($(".check")[i].checked==false){
                        flag=1;
                    }
                }
                if(flag){
                    $(".rebtnall").prev()[0].checked=false;
                    $(".rebtnall").children(".checkphto").stop();
                     $(".rebtnall").children(".checkphto").fadeOut();
                }
                else{
                    $(".rebtnall").prev()[0].checked=true;
                    $(".rebtnall").children(".checkphto").stop();
                     $(".rebtnall").children(".checkphto").fadeIn();
                }
                if($(this)[0]!=$(".rebtnall")[0]){
                    var $td=$(this).parent().parent().parent().children().eq(-1);
                    if($(this).prev()[0].checked==true){
                        $td.addClass("price");
                    }
                    else{
                        $td.removeClass("price");
                    }
                }
                // $(".check")[0].checked=true;
                _this.setAllPrice();
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
// 加入购物车事件
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
                var id=$(this).parent()[0].index;
                var p=$(this).prev().prev().children("figcaption").html();
                var price=$(this).prev().html();
                var jifen=price.replace("￥","");
                var info={
                    id:id,
                    src:src,
                    p:p,
                    price:price,
                    jifen:jifen,
                    allprice:price,
                    number:1
                }
                var arr_info=JSON.parse(localStorage.car_info);
                var flag=1;
                for(var i=0;i<arr_info.length;i++){
                    if(arr_info[i].id===info.id){
                        flag=0;
                        arr_info[i].number++;
                        arr_info[i].allprice="￥"+arr_info[i].jifen*arr_info[i].number;
                    }
                }
                if(flag){
                    arr_info.push(info);
                }
                
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
                newtr.index=arr[i].id;
                $(newtr).children(".commodity_price").html(arr[i].price);
                $(newtr).children(".commodity_jifen").html(arr[i].jifen);
                $(newtr).children(".last_price").html(arr[i].allprice);
                $(newtr).children(".number_box").children().children("input")[0].value=arr[i].number;
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
            for(var i=0;i<arr.length;i++){
                if(id==arr[i].id){
                    break;
                }
            }
                 arr.splice(i,1);
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