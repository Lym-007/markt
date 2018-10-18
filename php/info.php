<?php 
 header("content-type:text/html;charset=utf-8");

//  连接数据库
include "connect_db.php";

// 获取商品列表
$sql="select * from goods";
$conn=new db();
$tab=$conn->Query($sql,2);
if($tab){
    echo json_encode($tab);
}

?>