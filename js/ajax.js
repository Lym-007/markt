function sendAjax(url,options){
    var _default={
        method:"get",
        data:null,
        success:null
    }
    for(var i in options){
        _default[i]=options[i];
    }
    if(_default.method.toUpperCase()==="GET"){
        var f=url.indexOf("?")>-1?"&":"?";
        url+=f+"_="+Date.now();
        for(var j in _default.data){
            url+="&"+j+"="+_default.data[j];
        }
        _default.data=null;
    }
    var xhr=new XMLHttpRequest();
    xhr.open(_default.method,url,true);
    _default.data=JSON.stringify(_default.data);
    xhr.send(_default.data);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var val=xhr.responseText;
            val=JSON.parse(val);
            if(typeof _default.success==="function"){
               _default.success(val);
            }
        }
    }
    return url;
}