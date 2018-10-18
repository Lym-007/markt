<?php 
 header("content-type:text/html;charset=utf-8");
  // 允许所有域名跨域
  header("Access-Control-Allow-Origin:*");

//  连接数据库
include "connect_db.php";

// 获取商品列表
$sql="select * from goods";
$conn=new db();
$tab=$conn->query($sql);
if($tab){
    echo json_encode($tab);
}

?>