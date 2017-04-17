<?php
	//通过PHP来获得地址的信息
	//根据地址的信息执行不同的逻辑
	
	//通过$_SERVER可以获得地址的部分信息
	//通过$_SERVER["PATH_INFO"]可以获得地址的部分信息
	//通过此信息可以调整输出的内容
	$pathinfo = $_SERVER["PATH_INFO"];
	//将字符串拆分成数组
	$pathinfo=substr($pathinfo, 1);
	//
	$route = explode("/", $pathinfo);
	// PHP 使用empty()函数可以判断某个变量是否为空
    // 为空则为true，否则false
	if(empty($pathinfo)){
		$path = "index/index";
	}else if(count($route)==1){ //判断数组长度是否为1
		$path = "index/".$route[0];
	}else{
		$path=$route[0]."/".$route[1];
	}

	include "./views/" .$path. ".html";

?>