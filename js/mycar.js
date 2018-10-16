var form_function=(function(){
    return {
        init:function(){
            this.event();
        },
        event:function(){
            var _this=this;
             // 数量加减
             $(".down").click(function(){
                 console.log("减");
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
                console.log("加");
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
            })
            // 全选事件
            $(".checkall").click(function(){
                for(var i=0;i<$(".check").length;i++){
                    $(".btn1")[i].click();
                }
            })
            $(".rebtn").click(function(tag){
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
                    $(".rebtnall").children(".checkphto").fadeOut();
                }
                else{
                    $(".checkall")[0].checked=true;
                    $(".rebtnall").children(".checkphto").fadeIn();
                }
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
        init:function(){
            this._table=$(".goods_form>table");
            this._tr=$(".car_column")[0].cloneNode(true);
            console.log(this._table,this._tr)
            this.event();
        },
        event:function(){
            var _this=this;
            $(".addin").click(function(){
                var src=$(this).prev().prev().children("img")[0].src;
                var p=$(this).prev().html();
                // $(_this._tr).children("commodity img")[0].src=src;
                console.log($(_this._tr).children())
                $(_this._tr).children("commodity p").html(p);
                _this._table.append(_this._tr);
            })
        },
    }
}());